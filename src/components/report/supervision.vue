<template lang="html">
  <div id="supervision">
    <!--图表渲染-->
    <div id="supervisionReport"></div>
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
        titleText: '报警督办统计', // 这个值记得修改
        opinion: ['超速','凌晨2-5点违规运行','持续半小时无数据上传','连续超过4小时运行车辆'],
        opinionData: [
          {value:335, name:'超速'},
          {value:310, name:'凌晨2-5点违规运行'},
          {value:234, name:'持续半小时无数据上传'},
          {value:135, name:'连续超过4小时运行车辆'}
        ]
      }
    },
    computed: {

    },
    methods: {
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
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient : 'horizontal',
            x : 'center',
            data:this.opinion
          },
          calculable : false,
          series : [
            {
              name: this.titleText,
              type:'pie',
              selectedMode: 'single',
              center:	['50%', '55%'],
              radius : [0, 70],

              // for funnel
              x: '20%',
              width: '40%',
              funnelAlign: 'right',
              max: 1548,

              itemStyle : {
                normal : {
                  label : {
                    position : 'inner'
                  },
                  labelLine : {
                    show : false
                  }
                }
              },
              data: this.opinionData.slice(0,3)
            },
            {
              name: this.titleText,
              type:'pie',
              center:	['50%', '55%'],
              radius : [90, 130],

              // for funnel
              x: '60%',
              width: '35%',
              funnelAlign: 'left',
              max: 1048,
              data:this.opinionData
            }
          ]
        })
      }

    },
    mounted () {
      this.$nextTick(function(){
        this.drawPie('supervisionReport')
      })
    }
  }
</script>
<style lang="scss" scoped="" type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';
  @import '../../assets/scss/base.scss';

  #supervision {
    width: 100%;
    height: auto;
  }

  #supervisionReport {
    width: 98%;
    margin: auto;
    /*height: calc(100% - 1.46666rem);*/
    @include pxrem(height,800);
    @include pxrem(margin-top,80);
    /*height: 100%;*/
  }

</style>
