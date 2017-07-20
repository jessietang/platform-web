<template lang="html">
    <div id="zxDetail">
      <div class="top">
        <div class="top-back" @click="goBack()">
          <img src="../../../static/img/back.png" alt=""/>
        </div>
        <div class="top-title">
          累计入网详情
        </div>
      </div>
      <!--图表展示-->
      <div id="zxPannel"></div>
    </div>
</template>
<script lang="babel">
  import echarts from 'echarts'
  import axios from 'axios'
    export default {
      data () {
        return {
          chart: null,
          zxData: [], // 在线数
          rwData: [], // 入网数
          zsData: [], // 车辆总数
          xData: [],
          // 上个页面传递过来的值
          query: {}
        }
      },
      created () {
        this.getQuery();
      },
      methods: {
        getQuery () {
          this.query = this.$route.query;
          console.log(this.query);
        },
        goBack () {
          /*this.$router.push({
            path: '/web/report/sixStrictBan'
          })*/
          this.$router.go(-1);
        },
        drawBar (id) {
          var _this = this;
          _this.chart = echarts.init(document.getElementById(id));
          var dataId = _this.query.dataId;
          var nowSelect = _this.query.nowSelect;
          var userId = _this.query.userId;
          // 参数：选择项id, 展示方式、用户id
          var postData = {
            dataId: dataId,
            nowSelect: nowSelect,
            userId: userId
          };
          axios.get('',postData).then(res => {
            // 返回数据：选择项id、车辆类型、在线数、入网数、车辆总数
            var res = {
              "code": 0,
              "data": [
                {zId: 0, carType: '三类以上班线客车',zxNum: 200, rwNum: 90, zsNum: 300},
                {zId: 0, carType: '旅游包车',zxNum: 100, rwNum: 80, zsNum: 200},
                {zId: 0, carType: '危险品运输车',zxNum: 102, rwNum: 70, zsNum: 300},
                {zId: 0, carType: '重型货运运输车',zxNum: 123, rwNum: 98, zsNum: 900}
              ]
            };
            if (res.code == 0) {
              if (res.data.length > 0) { // 有数据
                var data = res.data;
                var xData = [],
                  zxData = [],
                  rwData = [],
                  zsData = [];
                for (var i in data) {
                  xData.push(data[i].carType);
                  zxData.push(data[i].zxNum);
                  rwData.push(data[i].rwNum);
                  zsData.push(data[i].zsNum);
                }
                _this.xData = xData;
                _this.zxData = zxData;
                _this.rwData = rwData;
                _this.zsData = zsData;
                _this.chart.setOption({
                  tooltip : {
                    trigger: 'axis'
                  },
                  legend: {
                    data: ['在线数','入网数', '车辆总数']
                  },
                  calculable : true,
                  xAxis : [
                    {
                      type : 'category',
                      axisLabel: { // 旋转横坐标label
                        show: true,
                        interval: '0',  // 标签显示挑选间隔，默认为'auto'，可选为：'auto'（自动隐藏显示不下的） | 0（全部显示） |{number}（用户指定选择间隔）
                        rotate: 45
                      },
                      data: _this.xData
                    }
                  ],
                  yAxis : [
                    {
                      type : 'value'
                    }
                  ],
                  series : [
                    {
                      name:'在线数',
                      type:'bar',
                      data: _this.zxData
                    },
                    {
                      name:'入网数',
                      type:'bar',
                      data: _this.rwData
                    },
                    {
                      name:'车辆总数',
                      type:'bar',
                      data: _this.zsData
                    }
                  ]
                });
              } else {
                console.log('获取数据失败！');
              }
            } else {
              console.log(res.msg);
            }
          }).catch(error => {

          });
        }
      },
      mounted () {
        this.$nextTick(function(){
          this.drawBar('zxPannel')
        });
      }
    }
</script>
<style lang="scss" scoped="" type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';
  @import '../../assets/scss/base.scss';
  #zxDetail {
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

    #zxPannel {
      margin: auto;
      @include pxrem(margin-top,100);
      width: 96%;
      @include pxrem(height, 600);
    }
  }
</style>
