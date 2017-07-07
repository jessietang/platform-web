<template lang="html">
  <div id="sixStrictBan">
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
    <div id="banReport"></div>
  </div>
</template>
<script lang="babel">
  import echarts from 'echarts'
  import axios from 'axios'
  import $ from 'n-zepto'
  export default {
    data () {
      return {
        chart: null,
        titleText: '超速',
        opinion: ['怀化市','益阳市','张家界市','常德市','岳阳市','邵阳市','衡阳市','湘潭市','株洲市','长沙市','湖南省'],
        opinionData: [
          {value: 2, name: '怀化市'},
          {value: 1, name: '益阳市'},
          {value: 3, name: '常德市'},
          {value: 5, name: '岳阳市'},
          {value: 7, name: '邵阳市'},
          {value: 2, name: '衡阳市'},
          {value: 4, name: '湘潭市'},
          {value: 2, name: '株洲市'},
          {value: 5, name: '长沙市'}
        ],
        key1: 1, // 第一个下拉列表默认选中值
        key2: 1, // 第一个下拉列表默认选中值
        active1: false, // 控制第一个下拉列表开关
        active2: false, // 控制第二个下拉列表开关
        // 下拉内容1
        dataIndicator: [
          {key: 1, name: '地区汇总'},
          {key: 2, name: '接入平台汇总'},
          {key: 3, name: '企业汇总'},
          {key: 4, name: '车辆汇总'}
        ],
        // 下拉内容2
        showWay: [
          {key: 1, name: '超速'},
          {key: 2, name: '凌晨2-5点违规运行'},
          {key: 3, name: '持续半小时无数据上传'},
          {key: 4, name: '连续超过4小时运行车辆'}
        ]
      }
    },
    computed: {
      getTypeName1 () {
        var self = this
        return self.getType1(self.key1) || '地区汇总'
      },
      getTypeName2 () {
        var self = this
        return self.getType2(self.key2) || '超速'
      }
    },
    methods: {
      getType1 (type) {
        let str = ''
        switch(type){
          case 1:
            str = '地区汇总'
            break;
          case 2:
            str = '接入平台汇总'
            break;
          case 3:
            str = '企业汇总'
            break;
          case 4:
            str = '车辆汇总'
            break;
        }
        return str
      },
      getType2 (type) {
        let str = ''
        switch(type){
          case 1:
            str = '超速'
            break;
          case 2:
            str = '凌晨2-5点违规运行'
            break;
          case 3:
            str = '持续半小时无数据上传'
            break;
          case 4:
            str = '连续超过4小时运行车辆'
            break;
        }
        return str
      },
      doSelect1 (key) {
        this.key1 = key
        this.active1 = false
      },
      doSelect2 (key) {
        this.key2 = key
        this.active2 = false
      },
      // 图表绘制
      drawPie (id) {
        this.chart = echarts.init(document.getElementById(id))
        /*let data = {
         userId: 192,
         dataType: 'json'
         }
         axios.get('/activity/findTop100UserPrizes', data).then(res => {
         if (res.data.code === 0) {
         let opinionData = res.data.data
         this.opinionData = opinionData
         }
         }).catch(error => {
         console.log(error)
         })*/
        this.chart.setOption({
          title: {
            text: this.titleText,
            x: 'center',
            y: '50%',
            offsetCenter:['50%', '5%'],
            textStyle: {
              color: '#000',
              fontSize: 12,
              fontWeight: 'lighter'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          series: [
            {
              name: this.titleText,
              type:'pie',
              center:	['50%', '50%'],
              radius: ['40%', '60%'],
              data: this.opinionData
            }
          ]
        })
      }

    },
    mounted () {
      this.$nextTick(function(){
        this.drawPie('banReport')
      })
    }
  }
</script>
<style lang="scss" scoped="" type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';
  @import '../../assets/scss/base.scss';

  #sixStrictBan {
    width: 100%;
    height: auto;

    .filterIndicator {
      width: 100%;
      @include pxrem(height, 84);
      border-bottom: 1px solid #e3e3e3;

      .filter-list {
        width: 49.99%;
        float: left;
        @include pxrem(height, 40);
        @include pxrem(line-height, 40);
        @include pxrem(margin-top, 22);
        @include pxrem(font-size, 28);
        text-align: center;
        position: relative;

        img {
        @include pxrem(width, 16);
        @include pxrem(height, 10);
          vertical-align: middle;
        }

        .singleList {
          display: none;
          z-index: 100;
          width: 100%;
          position: absolute;
          left: 0;
          @include pxrem(top, 62);
          text-align: center;
          border: 1px solid #eee;
          border-top: none;
          background-color: #fff;

          li {
            width: 100%;
            @include pxrem(height, 60);
            @include pxrem(line-height, 60);
            @include pxrem(font-size, 26);
            border-bottom: 1px solid #eee;
          }

          li:last-child {
            border-bottom: none;
          }
        }
      }

      .filter-list.open {
        img {
          transform: rotate(180deg);
        }

        .singleList {
          display: block;
        }
      }

      .filter-list:nth-child(1) {
        border-right: 1px solid #eee;
      }
    }
  }

  #banReport {
    width: 100%;
    @include pxrem(height,700);
    /*height: 100%;*/
    background-color: red;
  }

</style>
