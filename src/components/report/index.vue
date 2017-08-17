<template lang="html">
    <div id="reportIndex">
      <!--<p class="title">图形化报表</p>-->
      <ul class="tab clearfix">
        <li class="tab-list" :class="{'activeTab': $route.path === '/web/report/platformSupervise'}">
          <router-link to="/web/report/platformSupervise">接入平台监管</router-link>
        </li>
        <li class="tab-list" :class="{'activeTab': $route.path === '/web/report/onlineStatus'}">
          <router-link to="/web/report/onlineStatus">在线情况</router-link>
        </li>
        <li class="tab-list" :class="{'activeTab': $route.path === '/web/report/alarmInspector'}">
          <router-link to="/web/report/alarmInspector">报警督办统计</router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
</template>
<script lang="babel">
    export default {
      data () {
        return {

        }
      }
    }
</script>
<style lang="scss" scoped="" type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';
  @import '../../assets/scss/base.scss';

  #reportIndex {
    width: 100%;
    height: 100%;
  }
</style>
