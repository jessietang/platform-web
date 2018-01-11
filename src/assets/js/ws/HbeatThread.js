import { HtmlWorker } from './HtmlWorker'
Gov.Thread.HB = Gov.Thread.HB || {};
+function (ns) {
  var eventList = {
    "onRefreshUser": {
      name: "onRefreshUser",
      fun: null,
    }
  }
  var listener = {};
  var thread = new HtmlWorker(Gov.getAbsolutePath("./static/js/ws/HbeatCore.js"));
  var wsState = {
    conn: 1,
    unconn: 0
  }
  var curState = wsState.unconn;

  ns.getWS = function () {
    return parent.Gov.Thread == null ? null : parent.Gov.Thread.HB;
  }
  ns.sendMessage = function (option) {
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
  ns.ReStart = function () {
    thread.sendQuery("restart");
  }
  ns.Pause = function () {
    thread.sendQuery("pause");
  }
  ns.on = addEvent;
  function setWSState(val) {
    if (curState != val) {
      curState = val;
      triggerEvent(eventList.onconnChange, null);
    }
  }
  function WSEvents(evtName, data) {
    if ("WSReply" == evtName) {
      evtName = data.structName;
    }
    triggerEvent(eventList[evtName], data);
  }
  function triggerEvent(evt, data) {
    if (evt.fun != null) {
      evt.fun(data);
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
}(Gov.Thread.HB);
