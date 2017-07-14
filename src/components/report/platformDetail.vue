<template lang="html">
    <div id="platformDetail">
      <div class="top">
        <div class="top-back" @click="goBack()">
          <img src="../../../static/img/back.png" alt=""/>
        </div>
        <div class="top-title">
          接入平台报警与定位详情
        </div>
      </div>

      <div id="platformPannel">

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

          query: {}
        }
      },
      created () {
        this.getQuery()
      },
      methods: {
        // 获取上个页面传过来的参数
        getQuery () {
          this.query = this.$route.query
        },
        goBack () {
          this.$router.go(-1);
        },
        drawLine (id) {
          this.chart = echarts.init(document.getElementById(id));
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
          alert(this.query.test); // 上个页面传过来的值
          this.chart.setOption({
            tooltip: {
              trigger: 'axis',

            },
            legend: {
              data: [{ name: '定位', icon: 'rectangle',textStyle:{color:'#1296db'}  },
                { name: '报警', icon: 'rectangle', textStyle: { color: '#1296db' } }],
              show:true
            },
            calculable: true,
            color: ['#c2304e', '#8EFEFF'],
            grid: {
              x: '10%',
              x2: '5%',
              y:'10%'
            },
            xAxis: [{
              name: '时间',
              type: 'category',
              boundaryGap: false,
              data: [0,1,2,3,4,5,6,7,8,9,10],
              nameTextStyle: {
                color: '#000'
              },
              nameLocation:'start',
              splitLine: {
                lineStyle: {
                  color: '#6F7983'
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#6F7983'
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#000'
                }
              }
            }],
            yAxis: [{
              name:'数据量',
              type: 'value',
              nameTextStyle: {
                color:'#000'
              },
              axisLabel: {
                show:false
              },
              splitLine: {
                lineStyle: {
                  color: '#6F7983'
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#6F7983'
                }
              }
            }],
            series: [
              {
                name: '报警',
                type: 'line',
                smooth: true,
                data: [1118, 1231, 215, 4143, 9442, 15303, 1903, 9289, 9995,145022,1111,11102],
                symbol:'none'
              },
              {
                name: '定位',
                type: 'line',
                smooth: true,
                data: [111118, 12321, 24315, 41344, 9255, 16603, 19340, 93289, 9949,1022,21221],
                symbol: 'none'
              }
            ]
          })
        }
      },
      mounted () {
        var _this = this;
        this.$nextTick(function(){
          this.drawLine('platformPannel');
        })
      }
    }
</script>
<style lang="scss" scoped="" type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';
  @import '../../assets/scss/base.scss';

  #platformDetail {
    width: 100%;
    height: 100%;

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
    #platformPannel {
      width: 96%;
      margin: auto;
      @include pxrem(margin-top, 100);
      @include pxrem(height, 700);
    }

  }
</style>
