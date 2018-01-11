/// <reference path="JQuery/jquery-1.8.2.js" />
(function ($, lib) {
  $.Gov = $.Gov == null ? {} : $.Gov;
  var enModel = {
    Debug: "debug",
    Release: "release"
  };
  var ws = {
    //车辆导出查询功能
    //server: {
    //    host:"ws://10.50.75.107",
    //    port:"1818"
    //},
    server: {
      host: 'ws://125.71.30.136',
      port: '10064'
    },
    //local: {
    //    host: 'ws://10.50.40.204',
    //    port: '9997'
    //},
    local: {
      host: 'ws://10.50.75.109',
      port: '1919'
    },
    test: {
      host: 'ws://10.50.75.105',
      port: '1818'
    },


  };
  var _debugDict = {
    "none": "",
    "MTree": "监控树形:"
  };
  var curDictItems = [
    _debugDict.MTree,
    _debugDict.none
  ];
  var gConfig = {
    login: "login",
    jquery: "jquery",
    base:"base",
    jqueryPlus:"jqueryPlus"
  }
  var curWS = ws.server;
  var curModel = enModel.Release;
  var version = "20151228";

  $.Gov.gConfig = gConfig;
  $.Gov.getWSAddr = function () {
    return curWS;
  }
  $.Gov.debugDict = _debugDict;
  $.Gov.getIsDebug = function () {
    return curModel == enModel.Debug ? true : false;
  };
  $.Gov.consoleInfo = function (obj, dictName, reply) {
    try {
      if (model == enModel.Release) return false;
      //判断浏览器支持WebWork里调用Console
      var a = console;
    }
    catch (e) {
      if (reply != null)
        reply('console.info', { msg: obj, type: Gov.getIsDebug() ? "debugger" : "" });
      return false;
    }
    dictName = dictName == null ? _debugDict.none : dictName;
    for (var i = 0; i < curDictItems.length; i++) {
      if (curDictItems[i] == dictName) {
        if (typeof obj == "object" || typeof obj == "function") {
          console.info(dictName);
          console.info(obj);
        }
        else {
          console.info(dictName + obj);
        }
      }
    }
  };
  $.Gov.getOrigin = function () {
    var origin = $.location ? $.location.origin : "";
    if (origin == null || origin == "") {
      var curWwwPath = window.document.location.href;

      //获取主机地址之后的目录如：/Tmall/index.jsp
      var pathName = window.document.location.pathname;
      var pos = curWwwPath.indexOf(pathName);

      //获取主机地址，如： http://localhost:8080
      var localhostPaht = curWwwPath.substring(0, pos);
      origin = localhostPaht;
    }
    return origin;
  };
  $.Gov.getAbsolutePath = function (url) {
    console.log(this.getOrigin()+ "/" + url)
    return this.getOrigin() + "/" + url;
  };
  $.Gov.getMinH = function () {
    return 737;
  }
  $.Gov.getMinW = function () {
    return 1000;
  }
  $.Gov.getViewH = function () {
    return document.documentElement.clientHeight;
  }
  $.Gov.getViewW = function () {
    return document.documentElement.clientWidth;
  }
  $.Gov.$ = lib;
  $.Gov.getWSThread = function () {
    var thread = null;
    var parentObj = window;
    for (var i = 0; i < 5; i++) {
      if (thread == null ) {
        thread = parentObj.Gov.Thread ? parentObj.Gov.Thread.WS : null;
      }
      else {
        break;
      }
      parentObj = parent.window;
    }
    return thread;
  }
  $.Gov.getDomById = function (id) {
    return lib("#" + id);
  }
  /*$.Gov.LoadScript = function (config, prior) {
    if (curModel == enModel.Debug || prior == true) {
      Gov.$.ajax({
        url: Gov.getOrigin() + "/Scripts/GConfig.js",
        dataType: "json",
        cache: true,
        async: false,
        success: function (data) {
          var ary = data[config].src;
          for (var i = 0; i < ary.length; i++) {
            Gov.$.ajax({
              url: Gov.getOrigin() + "/" + ary[i],
              dataType: "script",
              cache: false,
              async: false,
            });
          }
        }
      });
    }
    else {
      Gov.$.ajax({
        url: Gov.getOrigin() +  "/Release/" + config + ".min.js?_v=" + version,
        dataType: "script",
        cache: true,
        async: false,
      });
    }
  }
  $.Gov.LoadWSScript = function () {
    var path = [
      '/Scripts/Base/Encrypt.js',
      '/Release/wind.min.js',
      //'/Release/stream.min.js',
      '/Release/Concat/stream.js',
      '/Scripts/Thread/WSData.js',
      '/Scripts/Thread/WebSocketPartial.js'
    ];
    return path;
  }*/
})(function () {
  var $;
  try {
    $ = window;
  }
  catch (e) {
    $ = this;
  }
  return $;
}(), function () {
  try{
    return jQuery;
  }
  catch (e) {
    return null;
  }
}());
