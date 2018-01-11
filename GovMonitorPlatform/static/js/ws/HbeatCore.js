
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

var xmlhttp = null;
try {
  xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
}
catch (_e) {
  try {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  catch (_E) {
  }
}
if (!xmlhttp && typeof (XMLHttpRequest) != 'undefined') {
  try {
    xmlhttp = new XMLHttpRequest();
  }
  catch (e) {
    xmlhttp = false;
  }
}
var handle = null;
//启动线程
var startup = function (data) {
  //CurContext = createContext(data);
  RefreshUser();
  loop();
}
var loop = function () {
  handle = setInterval('RefreshUser()', 15000);
}
var pause = function () {
  clearInterval(handle);
}
var restart = function () {
  startup();
}
function RefreshUser() {
  xmlhttp.open("POST", "/Handlers/Hbeat.ashx?nType=1", false);
  //xmlhttp.open("POST", "/HeartBeat", false);
  xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xmlhttp.setRequestHeader("Accept", "*/*");
  xmlhttp.setRequestHeader("Content-Type", "text/html; charset=utf-8");
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4) {
      OnComplete(xmlhttp.responseText);
    }
  }
  xmlhttp.send(null);
}
function OnComplete(result) {
  triggerEvent("onRefreshUser", result);
}
