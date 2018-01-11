/// <reference path="Gov.js" />


+function (ns) {
  ns.Session = {
    addItem: function (key, val) {
      sessionStorage[key] = val;
    },
    getItem: function (key) {
      return sessionStorage[key];
    }
  };
}(Gov);

+function (ns) {
  function setUNConn(userInfo) {
    $("#index").removeClass("onws");
    $("#index").attr("title", userInfo + ",推送服务未连接成功。");
  }
  function setConn(userInfo) {
    $("#index").addClass("onws");
    $("#index").attr("title", userInfo + ",推送服务连接成功。");
  }

  ns.User = {
    setUserId: function (val) {
      Gov.Session.addItem("userId", val);
    },
    getUserId: function () {
      return Gov.Session.getItem("userId");
    },
    setUnit: function (val) {
      Gov.Session.addItem("unit", val);
    },
    setZone: function (val) {
      Gov.Session.addItem("zone", val);
    },
    setZoneName: function (val) {
      Gov.Session.addItem("zoneName", val);
    },
    setUnitName: function (val) {
      Gov.Session.addItem("unitName", val);
    },
    getUnit: function () {
      return Gov.Session.getItem("unit");
    },
    getZone: function () {
      return Gov.Session.getItem("zone");
    },
    getZoneName: function () {
      return Gov.Session.getItem("zoneName");
    },
    getUnitName: function () {
      return Gov.Session.getItem("unitName");
    },
    setName: function (val) {
      Gov.Session.addItem("name", val);
    },
    getName: function () {
      var obj = Gov.Session.getItem("name");
      if (obj == null) {
        return false;
      }
      return obj;
    },
    setPwd: function (val) {
      Gov.Session.addItem("Pwd", val);
    },
    getPwd: function () {
      return Gov.Session.getItem("Pwd");
    },
    setRight: function (val) {
      Gov.Session.addItem("right", val);
    },
    getRight: function () {
      return Gov.Session.getItem("right");
    },
    loginOut: function () {

    },
    connBreak: function () {
      //Gov.Controls.ObjectArtDialog.msg("服务未连接成功，此功能无法使用", null, 5000);
      console.log("服务未连接成功，此功能无法使用");
    },
    setWSConn: function (evt) {
      var userInfo = "当前登录人员：" + Gov.User.getName();
      if (evt.isConn) {
        setConn(userInfo);
        rLoginOffline();
      }
      else {
        setUNConn(userInfo);
      }
    },
    signOut: function () {
      Gov.Ajax({
        url: '/Account/SignOut',
        dataType: 'text',
        async: false,
        success: function (data) {
          Gov.Thread.WS.CloseWebSocket();
          window.location.reload();
        },
        error: function (obj) {
          console.info(obj.responseText);
        }
      });
    }
  };
}(Gov);
//注册退出下线
function rLoginOffline() {
  window.Gov.Thread.WS.on({
    bag: "LoginOffline",
    reply: function (data) {
      Gov.User.setWSConn({ isConn: false });
      Gov.Thread.WS.CloseWebSocket();
      /*Gov.Controls.ObjectArtDialog.confirm("你的帐号已在别处登录，你已被迫下线，是否重新上线？", function () {
        Gov.Thread.WS.StartUp({
          data: {
            userName: Gov.User.getName(),
            pwd: Gov.User.getPwd()
          },
          events: {
            "onconnChange": Gov.User.setWSConn,
            "ondone": function () {
              console.info("Websocket建立连接完成");
              Gov.User.setWSConn({ isConn: true });
              //
              Gov.Controls.Pages["home-main"].loginRequestPush();
            },
            "onclose": function () {
              console.info("Websocket断开");
            }
          }
        });
      }, function () {
        //Gov.User.signOut();
        $.cookie("HGOV", null, { path: '/' });
        window.location.replace("/Account/Login");
      }, "下线通知");*/
      var reLogin = window.confirm("你的帐号已在别处登录，你已被迫下线，是否重新上线？");
      if(reLogin){
        Gov.Thread.WS.StartUp({
          data: {
            userName: Gov.User.getName(),
            pwd: Gov.User.getPwd()
          },
          events: {
            "onconnChange": Gov.User.setWSConn,
            "ondone": function () {
              console.info("Websocket建立连接完成");
              Gov.User.setWSConn({ isConn: true });

              //Gov.Controls.Pages["home-main"].loginRequestPush();
              if (!Gov.getWSThread().getWsState()) return;
              var obj = new Gov.WS.Struct.Info_Publish_Request();
              var wsObj = obj.getWSObject();
              wsObj.sourceH = sessionStorage.userId;
              Gov.getWSThread().sendMessage({
                bag: obj.toString(),
                data: wsObj,
                reply: function (data) {

                }
              });
            },
            "onclose": function () {
              console.info("Websocket断开");
            }
          }
        });
      } else {
        window.location.replace("/#/login");
      }

    }
  });
}
