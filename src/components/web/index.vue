<template lang="html">
    <div id="web">
      <transition name="fade">
        <router-view></router-view>
      </transition>
      <navBar></navBar>
    </div>
</template>
<script lang="babel">
  import navBar from '../navBar/navBar'
  // 以下是Websocket，登录之后才引入，登录前不引人
  import '../../../static/js/ws/Gov.js'
  import '../../../static/js/ws/Class.js'
  import '../../../static/js/ws/WS.js'
  import '../../../static/js/ws/Thread.js'
  import '../../../static/js/ws/WSThread.js'
  import '../../../static/js/ws/HbeatCore.js'
  import '../../../static/js/ws/HbeatThread.js'
  import '../../../static/js/User.js'
  +function startWs() {
    Gov.Thread.WS.StartUp({
      data: {
        userName: Gov.User.getName(),
        pwd: Gov.User.getPwd()
      },
      events: {
        "onconnChange": Gov.User.setWSConn,
        "ondone": function (evtObj) {
          console.info("Websocket建立连接完成");
          //loginRequestPush();
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
  }();
  export default {
    name: 'web',
    components: {
      navBar
    }
  }
</script>
<style lang="scss" scoped="" type="text/css">

  #web {
    width: 100%;
    height: calc(100% - 1.333333rem);
  }
</style>
