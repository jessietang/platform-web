<template lang="html">
    <div id="spIndex">
      <div class="top">
        <div class="top-back" @click="goBack()">
          <img src="../../../static/img/back.png" alt=""/>
        </div>
        <div class="top-title">
          SP系统报表导航
        </div>
      </div>
      <!--<h2 class="module-title">SP系统报表导航</h2>-->
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-menu-item index="1" @click="vehicleInfoReport()">车辆基本信息报表</el-menu-item>
        <el-menu-item index="2" @click="companyCheckReport()">企业考核统计报表</el-menu-item>
        <el-menu-item index="3" @click="providerCheckReport()">服务商考核统计报表</el-menu-item>
        <el-submenu index="4">
            <template slot="title">六严禁报表</template>
            <el-menu-item index="1-1" @click="VehicleTogetherReport()">车辆汇总</el-menu-item>
            <el-menu-item index="1-2" @click="overSpeedReport()">超速</el-menu-item>
            <el-menu-item index="1-3" @click="abnormalReport()">2-5点运行</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
</template>
<script lang="babel">
    export default {
      data () {
        return {}
      },
      methods: {
        vehicleInfoReport () {
          this.$router.push({
            path: '/web/vehicleInfoReport'
          })
        },
        companyCheckReport () {
          this.$router.push({
            path: '/web/companyCheckReport'
          })
        },
        providerCheckReport () {
          this.$router.push({
            path: '/web/providerCheckReport'
          })
        },
        VehicleTogetherReport () {
          this.$router.push({
            path: '/web/VehicleTogetherReport'
          })
        },
        overSpeedReport () {
          this.$router.push({
            path: '/web/overSpeedReport'
          })
        },
        abnormalReport () {
          this.$router.push({
            path: '/web/abnormalReport'
          })
        },
      }
    }
</script>
<style lang="scss" type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';
  @import '../../assets/scss/base.scss';

  #spIndex {
    @include pxrem(font-size, 36);

    .module-title {
      @include pxrem(font-size, 40);
      text-align: center;
      @include pxrem(padding, 30 0 50 0);
    }

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
  }

  .el-menu-item, .el-submenu__title {
    text-align: center;
  }

  .el-menu {
    background-color: #fff;
    @include pxrem(font-size, 36);
  }
</style>
