做websocket服务需要改到的几个文件：
1.WSData.js: 定义命令
SUBCMD_YUNWEI_Minitor: 322          // 服务监控

2.WS.js: 定义结构体（定义内容的长度、类型等等）
// 服务监控
  struct.YUNWEI_Minitor = function () {
    this.content = {
      value: 0,
      type: nType.String.name,
      length: 400,
      isEncode: true
    };
  };

3.WebSocketPartial.js: 利用子命令和结构体，定义事件名称
// 服务监控
    case WSData.Subcmd.SUBCMD_YUNWEI_Minitor:
      struct = new WSData.Struct.YUNWEI_Minitor();
      data = getResponseData(struct, head, reader);
      //console.log(data)
      eventName = "YunWei_Minitor";
      break;

4.然后在js里面这样使用：
Gov.getWSThread().on({
          bag: "YunWei_Minitor",
          reply: function (data) {
            var ret = data.data.response.content;
            console.log(ret);
          }
        });
