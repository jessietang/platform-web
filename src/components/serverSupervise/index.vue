<template lang="html">
  <div id="serverSupervise">
    <div class="top">
      <div class="top-back" @click="goBack()">
        <img src="../../../static/img/back.png" alt=""/>
      </div>
      <div class="top-title">
        服务器监控
      </div>
    </div>
    <div class="superviseDetail">
      <ul class="detailBox">
        <li class="server-title">服务器名称</li><li class="server-title">运行状态</li>
        <li class="server-content">交通部链路</li><li class="server-status" :class="{'abnormal-status': statusAbnormal.jtb}">{{serverStatus.jtb}}</li>
        <li class="server-content">政府监管平台服务</li><li class="server-status" :class="{'abnormal-status': statusAbnormal.zfjg}">{{serverStatus.zfjg}}</li>
        <li class="server-content">服务商数据传输</li><li class="server-status" :class="{'abnormal-status': statusAbnormal.fws}">{{serverStatus.fws}}</li>
      </ul>
    </div>
  </div>
</template>
<script lang="babel">
  import echarts from 'echarts'
  import axios from 'axios'
  export default {
    data () {
      return {
        serverStatus: {
          jtb: '正常',
          zfjg: '正常',
          fws: '正常'
        },
        statusAbnormal: {
          jtb: false,
          zfjg: false,
          fws: false
        }
      }
    },
    created () {
      var _this = this;
      Gov.getWSThread().on({
        bag: "YunWei_Minitor",
        reply: function (data) {
          var ret = data.data.response.content;
          console.log(ret);
          var dataList = ret.split(';');
          var keyArr = [],
            valueArr = [];
          for (var i = 0; i < dataList.length; i++) {
            var dataL = dataList[i].split(':');
            keyArr.push(dataL[0]);
            valueArr.push(dataL[1]);
          }
          // 政府监管平台服务:正常;交通部链路:正常;服务商数据传输:正常;
          // 政府监管平台
          _this.serverStatus.zfjg = valueArr[0];
          if (valueArr[0] === '正常') {
            _this.statusAbnormal.zfjg = false;
          } else {
            _this.statusAbnormal.zfjg = true;;
          }
          // 交通部链路
          valueArr[1] = '异常';
          _this.serverStatus.jtb = valueArr[1];
          if (valueArr[1] === '正常') {
            _this.statusAbnormal.jtb = false;
          } else {
            _this.statusAbnormal.jtb = true;;
          }
          // 服务商数据传输
          _this.serverStatus.fws = valueArr[2];
          if (valueArr[2] === '正常') {
            _this.statusAbnormal.fws = false;
          } else {
            _this.statusAbnormal.fws = true;;
          }
        }
      });
    },
    methods: {
      goBack () {
        this.$router.go(-1);
      },
    }
  }
</script>
<style lang="scss" scoped="" type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';
  @import '../../assets/scss/base.scss';

  #serverSupervise {
    .top {
      width: 100%;
      @include pxrem(height, 80);
      @extend %flex-left;
        .top-back {
        @include pxrem(width, 64);
        @include pxrem(height, 64);
        @include pxrem(margin, 8 0 8 2);
        img {
          @include pxrem(width, 64);
          @include pxrem(height, 64);
        }
      }
      .top-title {
        width: 100%;
        @include pxrem(height, 80);
        @include pxrem(line-height, 80);
        @include pxrem(font-size, 36);
        text-align: center;
        color: #1296db;
      }
    }
    .superviseDetail {
      @include pxrem(margin,150 auto 0 auto);
      width: 98%;
      .detailBox {
        list-style: none;
        width: 100%;
        height: auto;
        border-top: 1px solid #eee;
        li {
          float: left;
          text-align: center;
          @include pxrem(height, 80);
          @include pxrem(line-height, 80);
          border-bottom: 1px solid #eee;
          color: #fff;
          background-color: #1296db;
        }
        li:nth-child(2n+1) {
          width: 50%;
          border-right: 1px solid #eee;
        }
        li:nth-child(2n) {
          width: 50%;
        }
        li.server-title {
          @include pxrem(font-size, 36);
        }
        li.server-content, li.server-status {
          @include pxrem(font-size, 30);
        }
        li.server-status.abnormal-status {
          color: red;
        }
      }
    }
  }
</style>
