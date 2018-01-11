/// <reference path="../Gov.js" />
//禁止debugger调试。
import { HtmlWorker } from './HtmlWorker'
var testUrl = "";
Gov.Thread = Gov.Thread || {};
Gov.Thread.Base = function (url) {
  var thread = {};
  var eventList = {};
  var core = new HtmlWorker(Gov.getAbsolutePath(url));

  thread.sendMessage = function (option) {
    if (!thread.override_SendMessage_Pre()) return false;
    thread.on(option);
    core.sendQuery('dispatchBag', option.bag, option.data);
  }
  thread.override_SendMessage_Pre = function () {
    return true;
  }

  thread.on = function (events) {
    for (var name in events) {
      eventList[name] = events[name];
    }
  }

  thread.startUp = function (option) {
    for (var name in option.events) {
      if (eventList[name] != null) {
        eventList[name].fun = option.events[name];
      }
    }
    core.addListener("triggerEvent", fire);
    core.startup(option.data);
  }

  thread.state = null;

  thread.fire = function (evtName, data) {
    var fun = eventList[evtName];
    if (fun != null) {
      fun({
        isConn: curState == 1 ? true : false,
        data: data
      });
    }
  }

  return thread;
};

Gov.Thread.WS = function () {
  var wsT = Gov.Thread.Base("./static/js/ws/WebSocket.js");//
  var isConn = false;

  wsT.on({
    "ondone": function () {
      setWSConn(true);
    },
    "onclose": function () {
      setWSConn(false);
    }
  });

  wsT.getWS = function () {
    return parent.Gov.Thread == null ? null : parent.Gov.Thread.WS;
  }
  wsT.getWsState = function () {
    return true;
  }
  wsT.override_SendMessage_Pre = function () {
    if (!curState) {
      Gov.User.connBreak();
      return false;
    }
    return true;
  }
  function setWSConn(val) {
    if (isConn != val) {
      isConn = val;
      wsT.fire(eventList.onconnChange, null);
    }
  }
  return wsT;
}();
