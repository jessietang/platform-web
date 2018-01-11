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
          query: {},
          xData: [],
          bjData: [],
          dwData: []
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
          var _this = this;
          // 参数：接入平台id、用户id
          var postData = {
            platFormId: _this.query.platFormId,
            userId: _this.query.userId
          };
          console.log(postData);
          axios.post('api/Platform/QueryPlatformAlarmPlocCnt', postData).then(res => {
            // 返回数据：接入平台id, 小时， 定位数， 报警数
            /*var res = {
              "code": 0,
              "data": [
                {platFormId: 0, platHour: 0, posNum:11118, alarmNum: 1118},
                {platFormId: 1, platHour: 1, posNum:1421, alarmNum: 1231},
                {platFormId: 2, platHour: 2, posNum:1234, alarmNum: 1118},
                {platFormId: 3, platHour: 3, posNum:1532, alarmNum: 1231},
                {platFormId: 4, platHour: 4, posNum:1144, alarmNum: 1118},
                {platFormId: 5, platHour: 5, posNum:1268, alarmNum: 1231},
                {platFormId: 6, platHour: 6, posNum:1190, alarmNum: 1118},
                {platFormId: 7, platHour: 7, posNum:1288, alarmNum: 1231},
                {platFormId: 8, platHour: 8, posNum:2111, alarmNum: 1118},
                {platFormId: 9, platHour: 9, posNum:1632, alarmNum: 1231},
                {platFormId: 10, platHour: 10, posNum:1118, alarmNum: 1118}
              ]
            };*/
            var res = JSON.parse(res.data);
            if (res.code == 0) {
              if (res.data.length > 0) {
                var data = res.data;
                var xData = [], // 小时
                  dwData = [], // 报警
                  bjData = []; // 定位
                for (var i in data) {
                  xData.push(data[i].platHour);
                  dwData.push(data[i].posNum);
                  bjData.push(data[i].alarmNum);
                }
                _this.xData = xData; // 小时
                _this.dwData = dwData; // 定位
                _this.bjData = bjData; // 报警
                _this.chart = echarts.init(document.getElementById(id));
                _this.chart.setOption({
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
                    data: _this.xData,
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
                      data: _this.bjData,
                      symbol:'none'
                    },
                    {
                      name: '定位',
                      type: 'line',
                      smooth: true,
                      data: _this.dwData,
                      symbol: 'none'
                    }
                  ]
                });
              }
            } else {
              console.log(res.msg);
            }
          }).catch(error => {
            console.log(error);
          });
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
