(function ($) {
  var defaults = {
    async: true,
    timeout: 0,
    data: {},
    type: 'GET',
    isJSONResult: false,
    userData: {},
    container: null,
    isDialog: false,
    success: function (data) {

    },
    error: function (jqXHR, textStatus, errorThrown) {
      Gov.consoleInfo("error:" + textStatus, Gov.debugDict.ajax);
    }
  };
  /*
   config:{
   isConvertParam:ture
   }
   */
  Gov.Ajax = function (config) {
    var options = $.extend({}, defaults, config);
    if (options.isDialog) {
      Gov.Controls.ObjectArtDialog.load();
    }
    options.url = Gov.getOrigin() + options.url;
    if (options.isConvertParam === true) {
      options.data = Gov.Ajax.ConvertParam(options.data);
    }
    options.success = function (data) {
      try {
        if (data != null && data != "null") {
          data = $.parseJSON(data);
          if (data.traceInfo != null) {
            console.info(data.traceInfo);
            data = config.isJSONResult ? $.parseJSON(data.retVal) : data.retVal;
          }
        }
      } catch (ex) {
        //data = Gov.Permission.SetPermByDom(data);
      };
      config.success(data);
      if (options.isDialog) {
        Gov.Controls.ObjectArtDialog.close();
      }
    }
    options.error = function (obj, msg) {
      if (config.error == null) {
        //alert("发生错误请联系管理员！");
        if (obj.responseText != null) {
          console.error(obj.responseText);
        }
        else {
          console.error(obj.statusText);
        }
      }
      else {
        config.error(obj, msg);
      }
      if (options.isDialog) {
        Gov.Controls.ObjectArtDialog.close();
      }
    }
    return $.ajax(options);
  }
  Gov.Ajax.ConvertParam = function (paramObj) {
    var ajaxData = [];
    for (var item in paramObj) {
      if (item.toLowerCase() == "model") {
        ajaxData.push({ name: item, value: JSON.stringify(paramObj[item]) });
      }
      else {
        ajaxData.push({ name: item, value: paramObj[item] });
      }
    }
    return ajaxData;
  }
})(jQuery);
