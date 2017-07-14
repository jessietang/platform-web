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
          zxData: [200,100,102,123], // 在线数
          rwData: [90,80,70,98], // 入网数
          zsData: [300,200,400,900], // 车辆总数
          // 上个页面传递过来的值
          query: {}
        }
      },
      created () {
        this.getQuery();
      },
      methods: {
        getQuery () {
          this.query = this.$route.query
        },
        goBack () {
          /*this.$router.push({
            path: '/web/report/sixStrictBan'
          })*/
          this.$router.go(-1);
        },
        drawBar (id) {
          this.chart = echarts.init(document.getElementById(id));
          var dataId = this.query.dataId;
          alert('接收到的值：'+dataId);
          /*axios.get('',{}).then(res => {
            if (res.code == 0) {
              // do sth,
            }
          }).catch(error => {

          })*/
          this.chart.setOption({
            tooltip : {
              trigger: 'axis'
            },
            legend: {
              data:['在线数','入网数', '车辆总数']
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
                data : ['三类以上班线客车','旅游包车','危险品运输车','重型货运运输车']
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
                data: this.zxData
              },
              {
                name:'入网数',
                type:'bar',
                data:this.rwData
              },
              {
                name:'车辆总数',
                type:'bar',
                data:this.zsData
              }
            ]
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
      @include pxrem(margin-top, 100);
      width: 96%;
      @include pxrem(height, 1000);
    }
  }
</style>
