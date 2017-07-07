<template>
    <div id="analysis">
      <!--帅选下拉列表-->
      <ul class="filterIndicator">
        <li class="filter-list" :class="{'open': active1}">
          <span class="showKey showKey1" @click="active1 = !active1">{{getTypeName1}}</span>
          <img src="./img/selectIcon.png" alt=""/>
          <ul class="singleList dataIndicator">
            <li v-for="obj in dataIndicator" @click="doSelect1(obj.key)">{{obj.name}}</li>
          </ul>
        </li>
        <li class="filter-list" :class="{'open': active2}">
          <span class="showKey showKey2" @click="active2 = !active2">{{getTypeName2}}</span>
          <img src="./img/selectIcon.png" alt=""/>
          <ul class="singleList showWay">
            <li v-for="obj in showWay" @click="doSelect2(obj.key)">{{obj.name}}</li>
          </ul>
        </li>
      </ul>
      <!--图表渲染-->
      <div id="analysisReport"></div>
    </div>
</template>
<script lang="babel">
    import echarts from 'echarts'
    import axios from 'axios'
    import $ from 'n-zepto'
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

  #analysis {
    width: 100%;
    height: 100%;


  }

  #analysisReport {
    width: 100%;
    height: 100%;
    background-color: red;
  }
</style>
