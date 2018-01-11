importScripts("./Gov.js", "./WS.js");
importScripts.apply(this, Gov.LoadWSScript());

var _socket_state = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3
};

var _socket_state_name = [
  'connection',
  'open',
  'closing',
  'closed'
];
var _socket = null;
var _single = null;
var isReConn = false;
var isOnConn = false;
var pingAsync = null, clientClose = false;

//接收线程数据
onmessage = function (oEvent) {
  if (oEvent.data instanceof Object &&
    oEvent.data.hasOwnProperty("bk4e1h0") &&
    oEvent.data.hasOwnProperty("ktp3fm1")) {
    dispatchFun(oEvent.data.bk4e1h0, oEvent.data.ktp3fm1);
  } else {
    defaultFun(oEvent.data.ktp3fm1);
  }
};
//发送线程数据
sendMessage = function () {
  postMessage({
    "vo42t30": arguments[0],
    "rnb93qh": Array.prototype.slice.call(arguments, 1)
  });
}
//触发线程事件
triggerEvent = function () {
  postMessage({
    "vo42t30": "WSEvents",
    "rnb93qh": Array.prototype.slice.call(arguments, 0)
  });
}
//动态调用不同方法
var dispatchFun = function (fname, data) {
  if (!(typeof fname === 'string')) throw new TypeError('dispatchFun需要至少一个字符串参数');

  if (data) {
    (function (fn, args) {
      fn.apply(self, args);
    })(eval(fname), data);
  } else eval(fname + '()');
}

var dispatchBag = function (bagName, data) {
  console.info(bagName);
  var s = getBagStruct(bagName,data);
  sendBag(s, false);
}
var deepCopy = function (source) {
  var result = {};
  for (var key in source) {
    result[key] = typeof source[key] === 'object' ? deepCopy(source[key]) : source[key];
  }
  return result;
}
var bindDataToStruct = function (struct, data, bagName) {
  for (var item in data) {
    var funName = "set" + item.substring(0, 1).toUpperCase() + item.substring(1, item.length);

    if (data[item] instanceof Array) {
      var items = [];
      for (var n = 0; n < data[item].length; n++) {
        items[n] = deepCopy(new WSData.DataBag[bagName].item());
        bindDataToStruct(items[n], data[item][n]);
      }
      data[item] = items;
    }

    if (struct[funName] != null && data[item] != null) {
      struct[funName](data[item]);
    }
  }
}

var createContext = function (data) {
  var context = {};
  var userIndex = 0;
  function init() {
    context.userName = data.userName;
    context.userPwd = data.pwd;
    context.baseUrl = data.base_url;
    context.ip = Gov.getWSAddr().host;
    context.pro = Gov.getWSAddr().port;
    context.host = context.ip + ':' + context.pro + '/';
    context.encrypt = Gov.Encrypt.getWSInfo(context.userName, context.userPwd);
  }
  if (data != null) init();
  return {
    getUserName: function () {
      return context.userName;
    },
    getUserPwd: function () {
      return context.userPwd;
    },
    getHost: function () {
      return context.host;
    },
    getRand1: function () {
      return context.encrypt.rand1;
    },
    getRand2: function () {
      return context.encrypt.rand2;
    },
    getCtime: function () {
      return context.encrypt.ctime;
    },
    getToken: function () {
      return context.encrypt.token;
    },
    getLoginBag: function () {
      var dataBag = WSData.CreateDataBag(WSData.DataBag.Login);
      dataBag.setName(this.getUserName());
      dataBag.setSourceH(3);
      dataBag.setRand1(this.getRand1());
      dataBag.setRand2(this.getRand2());
      dataBag.setMapIndex(86000000);
      dataBag.setCtime(this.getCtime());
      dataBag.setToken(this.getToken());
      return dataBag;
    },
    setUserIndex: function (value) {
      userIndex = value;
    },
    getUserIndex: function () {
      return userIndex;
    }
  }
};

var CurContext = createContext(null);

//启动线程
var startup = function (data) {
  CurContext = createContext(data);
  wsConn({
    interval: 5,
    host: CurContext.getHost(),
    bag: CurContext.getLoginBag()
  }).start();
}

//初始化
var wsInit = function (wsAddr) {
  _socket = new WebSocket(wsAddr);

  _socket.binaryType = 'arraybuffer';
  _socket.onmessage = recvBag_Login;

  _socket.onerror = onerror;
  _socket.onclose = onclose;
}

function onerror(evt) {
  console.error("ws错误：" + new Date().toLocaleString());
}

function onclose(evt) {
  //isReConn = true;
  if (!clientClose) {
    wsReConn().start();
  }
  console.error("ws关闭：" + new Date().toLocaleString());
  wsClose();
}
// 连接
var wsConn = eval(Wind.compile('async', function (opt) {
  _single = new Single;
  // 初始化socket
  wsInit(opt.host);
  //_socket = new WebSocket(opt.host);

  //_socket.binaryType = 'arraybuffer';
  //_socket.onmessage = recvBag_Login;

  //_socket.onerror = onerror;
  //_socket.onclose = onclose;

  // 等待socket打开
  $await(Wind.Async.onEvent(_socket, 'open'));
  $await(wsLogin(opt.bag));

  var v = Wind.Async.onEvent(_single, 'complete');
  v.start();
  // 等待服务器返回数据
  //Gov.consoleInfo("等待服务器返回第一包数据", Gov.debugDict.login, reply);
  //reply('login message');
  //sendMessage('login message');
  $await(Wind.Async.onEvent(_socket, 'message'));
  //Gov.consoleInfo("第一包数据已经返回", Gov.debugDict.login, reply);

  // 等待登陆过程完成
  $await(v);
  console.info("修改回调函数")
  // 修改回调函数
  setWSRecvFun();

  // 下载单位信息
  //$await(download_data());

  // 等待发送推送模式
  //$await(send_push_mode());

  // 登录过程已经完成
  // 进入异步模式
  if (!pingAsync) {
    pingAsync = wsPing();//.start();
  }
  if (pingAsync.status == "ready" || pingAsync.status == "succeeded") {
    pingAsync.status = "ready";
    pingAsync.start();
  }
  clientClose = false;
}));
// 登录
var wsLogin = eval(Wind.compile('async', function (struct) {
  sendBag(struct, false);
}));
// 重连
var wsReConn = eval(Wind.compile('async', function () {
  // while (true) {
  $await(Wind.Async.sleep(1000 * 15));
  //    if (!isReConn) break;
  console.debug("开始重新连接：" + new Date().toLocaleString());
  wsConn({
    interval: 5,
    host: CurContext.getHost(),
    bag: CurContext.getLoginBag()
  }).start();
  // }
  return;
}));

var setWSRecvFun = function () {
  // 修改回调函数
  _socket.onmessage = recvBag;
}
//发送数据包
var sendBag = function (struct, isPrint) {
  var sw = new streamWriter();
  var data = struct.getData();
  sw.createBuffer(struct.getBufferLen());
  sw.writeBuffer(data.data, data.format);

  if (isPrint)
    printSendBagValue(sw, struct);

  _socket.send(sw.getBuffer());
}

var convertByteToStruct = function (byteData, bagName) {
  if (bagName == null) bagName = "Header";
  var obj = new WSData.DataBag[bagName].struct();
  var sr = new streamReader(byteData, obj.getFormat());
  obj.setData(sr.readToEnd());
  return obj;
}
//接收登录数据包
var recvBag_Login = function (eventObj) {
  console.info("登录完成");
  var byteData = eventObj.data;
  var head = convertByteToStruct(byteData);
  if ((head.getCommandH() & WSData.Command.CMD_ADMIN === 0)
    || head.getSubcmdH() !== 1) {
    console.info('非登录回包,丢弃: ' + head.serialize());
    return;
  }
  if (head.getResultH() !== 0) {
    var errorMsg = "其他,未知错误<br/>(指令：" + head.getCommandH() + "," + head.getSubcmdH() + ")";
    switch (head.getResultH()) {
      case -944:
        _auto_reconnection = false,
          console.info("重复登录系统,-944");
        errorMsg = "重复登录系统";
        // reply('agian login');
        break;
      case -940:
        errorMsg = "系统错误";
        console.info("系统错误");
        break;
      case -941:
        errorMsg = "用户验证失败";
        console.info("用户验证失败");
        break;
      case -943:
        errorMsg = "用户名或者密码不正确";
        console.info("用户名或者密码不正确");
        break;
      case -302:
        errorMsg = "非法软件登录";
        console.info("非法软件登录");
        break;
      case -942:
        errorMsg = "用户已无效";
        console.info("用户已无效");
        break;
      case -946:
        errorMsg = "连接的服务器不正确";
        console.info("连接的服务器不正确");
        break;
      default:
        console.info("其他,未知错误");
        break;
    }
    if (head.getResultH() != -944) {
      console.info('task_cars loginOut', "错误代码:" + head.getResultH() + "(" + errorMsg + ")!<br/>请重新登录，如登录不成功,<br/>请联系相关技术支持人员！");
      return false;
    }
    isReConn = false;
    // 提示用户登录失败返回错误码
    // 必要时终止worker
  }
  var obj = new WSData.DataBag.Login.response();
  var _reader = new streamReader(byteData, head.getFormat());
  _reader.reset();
  _reader.setFormat(obj.getFormat());
  var re = _reader.readToEnd();
  obj.setData(re);
  _single.single('complete');
  loginDone(obj);
}
//接收数据包
var checkRecvBag = function (header, reader) {
  // 作错误处理
  if (header.getResultH() === -940) {
    var msg = "其它，未知错误，请联系技术支持人员！<br/>(指令：" + header.getCommandH() + "," + header.getSubcmdH() + ")";
    switch (header.getSubcmdH()) {
      case WSData.Subcmd.SUBCMD_QUERY_LOCATING:
        triggerEvent("LOCATING_ERROR", {
          data: msg
        });
        console.info(msg);
        break;
    }
    return false;
  }
  return true;
}

var recvBag = function (eventObj) {
  var byteData = eventObj.data
  var head = convertByteToStruct(byteData);
  if (checkRecvBag(head))
    recvBagHandle(head, eventObj.data);
}

var getBagStruct = function (bagName,data) {
  var bag = WSData.DataBag[bagName];
  var s = new bag.struct();
  if (data != null) {
    bindDataToStruct(s, data, bagName);
  }
  s.setCommandH(bag.command);
  s.setSubcmdH(bag.subcmd);
  // s.setSourceH(CurContext.getUserIndex());
  return s;
}

//发送心跳包
var wsPing = eval(Wind.compile('async', function () {
  var sw = new streamWriter();
  var bagName = WSData.DataBag.Ping.toString();
  var ping = getBagStruct(bagName);

  var data = ping.getData();
  sw.createBuffer(ping.getBufferLen());
  sw.writeBuffer(data.data, data.format);

  while (_socket.readyState === 1) {
    // 每分钟分送一次心跳包
    $await(Wind.Async.sleep(1000 * 10));
    _socket.send(sw.getBuffer());
  }
}));

function printSendBagValue(streamWriter, _struct) {
  var ary = streamWriter.getBufferObj();
  var tmp = ary.getBytes(_struct.getBufferLen(), 0);
  reply('console.info', { msg: _struct.getData() });
  reply('console.info', { type: "debugger", msg: tmp });
  reply('console.info', { msg: ary.getBytes(_struct.getBufferLen(), 0) });
}

function printReceiveBagValue(streamWriter, _struct) {

}

var closeWebSocket = function () {
  clientClose = true;
  _socket.close();
}


