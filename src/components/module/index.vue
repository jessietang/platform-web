<template lang="html">
    <div id="moduleIndex">
      <!--<p class="title">模块化管理</p>-->
      <div class="modularBox clearfix">
        <div class="modularList"><img src="./img/modular1.png" alt=""/></div>
        <div class="modularList"><img src="./img/modular2.png" alt=""/></div>
        <div class="modularList"><img src="./img/modular3.png" alt=""/></div>
        <div class="modularList"><img src="./img/modular4.png" alt=""/></div>
      </div>

      <div class="modularBottom">
        <div class="modularEchartBox">
          <div id="modularReport"></div>
        </div>
      </div>
    </div>
</template>
<script lang="babel">
    import echarts from 'echarts'
    import axios from 'axios'
    export default {
      data () {
        return {
          chart: null,
          opinion: ['正常在线平台数','断线平台数','从链路短线数'],
          opinionData: [
            {value:21, name:'正常在线平台数'},
            {value:4, name:'断线平台数'},
            {value:2, name:'从链路短线数'}
          ],
          platFormNum: 27 // 接入平台总数
        }
      },
      methods: {
        // 图表绘制
        drawPie (id) {
          this.chart = echarts.init(document.getElementById(id))
          /*let data = {
           userId: 192,
           dataType: 'json'
           }
           // 这里发请求得到data
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
              text: "接入平台总数: " + this.platFormNum,
              x: 'center',
              y: '50%',
              offsetCenter:['50%', '50%'],
              textStyle: {
                color: '#000',
                fontSize: 10,
                fontWeight: 'lighter'
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'horizontal',
              x: 'left',
              data: this.opinion
            },
            series: [
              {
                name:'接入平台链接情况',
                type:'pie',
                center:	['50%', '50%'],
                radius: ['45%', '65%'],
                data: this.opinionData,
              }
            ]
          })
        }
      },
      mounted () {
        this.$nextTick(function(){
          this.drawPie('modularReport')
        })
      }
    }
</script>
<style lang="scss" scoped="" type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';
  @import '../../assets/scss/base.scss';

  #moduleIndex {
    width: 100%;
    height: 100%;

    .modularBox {
      width: 100%;
      @include pxrem(height,400);
      border: 1px solid #eee;

      .modularList {
        float: left;
        width: 50%;
        @include pxrem(height,200);
        @include pxrem(line-height,200);
        text-align: center;

        img {
          @include pxrem(width,67);
          @include pxrem(height,67);
          vertical-align: middle;
        }
      }

      .modularList:nth-child(1), .modularList:nth-child(2) {
        border-bottom: 1px solid #e3e3e3;
      }

      .modularList:nth-child(1), .modularList:nth-child(3) {
        border-right: 1px solid #e3e3e3;
      }
    }

    .modularBottom {
      width: 100%;
      @include pxrem(height,901);
      background: url('./img/modularBg.png') top center no-repeat;
      @include pxrem(background-size, 750 901);
      position: relative;

      .modularEchartBox {
        position: absolute;
        left: 50%;
        top: 0;
        @include pxrem(width,660);
        @include pxrem(border-radius,10);
        @include pxrem(height,468);
        @include pxrem(margin, 150 auto 86 -330);
        background: rgba(255,255,255,.5);

        #modularReport {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
