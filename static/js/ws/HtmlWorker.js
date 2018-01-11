/**
 * 构建一个交互式的worker系统
 */
(function (exports) {
  /**
   *
   */
  function HtmlWorker(sURL, fDefListener, fOnError) {
    var oInstance = this,
      oWorker = new Worker(sURL),
      oListeners = {};

    this.defaultListener = fDefListener || function () { };

    oWorker.onmessage = function (oEvent) {
      if (oEvent.data instanceof Object &&
        oEvent.data.hasOwnProperty("vo42t30") &&
        oEvent.data.hasOwnProperty("rnb93qh")) {
        oListeners[oEvent.data.vo42t30].apply(oInstance, oEvent.data.rnb93qh);
      } else {
        this.defaultListener.call(oInstance, oEvent.data);
      }
    };

    if (fOnError) { oWorker.onerror = fOnError; }

    this.sendQuery = function () {
      if (arguments.length < 1) { throw new TypeError("queryWorker.sendQuery - 参数不够"); return; }

      oWorker.postMessage({
        "bk4e1h0": arguments[0],
        "ktp3fm1": Array.prototype.slice.call(arguments, 1)
      });
    };

    this.postMessage = function (vMsg) {
      Worker.prototype.postMessage.call(oWorker, vMsg);
    };

    this.terminate = function () {
      Worker.prototype.terminate.call(oWorker);
    };

    this.addListener = function (sName, fListener) {
      oListeners[sName] = fListener;
    };

    this.removeListener = function (sName) {
      delete oListeners[sName];
    };

    this.startup = function () {
      this.sendQuery("startup", arguments[0]);
    }

    this.closeWebSocket = function () {
      this.sendQuery("closeWebSocket");
    }
  };
  exports.HtmlWorker = HtmlWorker;

})(this);
