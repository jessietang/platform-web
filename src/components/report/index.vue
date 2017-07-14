<template lang="html">
    <div id="reportIndex">
      <!--<p class="title">图形化报表</p>-->
      <ul class="tab clearfix">
        <li class="tab-list" :class="{'activeTab': $route.path === '/web/report/analysis'}">
          <router-link to="/web/report/analysis">接入平台监管</router-link>
        </li>
        <li class="tab-list" :class="{'activeTab': $route.path === '/web/report/sixStrictBan'}">
          <router-link to="/web/report/sixStrictBan">在线情况</router-link>
        </li>
        <li class="tab-list" :class="{'activeTab': $route.path === '/web/report/supervision'}">
          <router-link to="/web/report/supervision">报警督办统计</router-link>
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
