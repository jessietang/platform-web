/// <reference path="../Gov.js" />
//禁止debugger调试。
//import { HtmlWorker } from './HtmlWorker'
Gov.Thread = Gov.Thread || {};
Gov.Thread.WS = Gov.Thread.WS || {};
+function (ns) {
  var eventList = {
    "ondone": { name: "ondone", fun: null },
    "onconnChange": { name: "onconnChange", fun: null },
    "onclose": { name: "onclose", fun: null }
  }
  var listener = {};
  //创建WebSocket副线程，WSThread是主线程
  var thread = new HtmlWorker(Gov.getAbsolutePath("./static/js/ws/WebSocket.js"));
  var wsState = {
    conn: 1,
    unconn: 0
  }
  var curState = wsState.unconn;

  ns.getWS = function () {
    return parent.Gov.Thread == null ? null : parent.Gov.Thread.WS;
  }

  ns.sendMessage = function (option) {
    //if (curState == wsState.unconn) {
    //    console.error("WS未链接");
    //    return false;
    //}
    addEvent(option);
    thread.sendQuery('dispatchBag', option.bag, option.data);
  }
  ns.getWSEnable = function () {

  }
  ns.getWsState = function (isMsg) {
    if (!isMsg && !curState) {
      Gov.User.connBreak();
    }
    return curState;
  }
  ns.on = addEvent;
  function setWSState(val) {
    if (curState != val) {
      curState = val;
      triggerEvent(eventList.onconnChange, null);
    }
  }
  function WSEvents(evtName, data) {
    if (evtName == eventList.ondone.name) {
      setWSState(wsState.conn);
    }
    if (evtName == eventList.onclose.name) {
      setWSState(wsState.unconn);
    }
    if ("WSReply" == evtName) {
      evtName = data.structName;
    }
    triggerEvent(eventList[evtName], data);
  }
  function triggerEvent(evt, data) {
    if (!evt) return;
    if (evt.fun != null) {
      evt.fun({
        isConn: curState == 1 ? true : false,
        data: data
      });
    }
  }
  function addEvent(option) {
    if (option.reply != null) {
      eventList[option.bag] = { name: option.bag, fun: option.reply };
    }
  }
  ns.StartUp = function (option) {
    for (var name in option.events) {
      if (eventList[name] != null) {
        eventList[name].fun = option.events[name];
      }
    }
    thread.addListener("WSEvents", WSEvents);
    thread.startup(option.data);
  }
  ns.State = wsState;

  ns.CloseWebSocket = function () {
    thread.closeWebSocket();
  }
}(Gov.Thread.WS);
