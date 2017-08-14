<template lang="html">
  <div id="supervision">
    <!--图表渲染-->
    <div id="supervisionReport"></div>
    <loadingComp v-if="isLoadingShow" v-bind:loadingTip="loadingTip"></loadingComp>
  </div>
</template>
<script lang="babel">
  import echarts from 'echarts'
  import axios from 'axios'
  import {mapState} from 'vuex'
  import loadingComp from '../loadingComp/index'
  export default {
    components: {
      loadingComp
    },
    data () {
      return {
        userInfo: JSON.parse(localStorage.getItem('platformUserInfo')) || this.$store.state.userInfo,
        isLoadingShow: false,
        loadingTip: '', // 加载的提示文字
        chart: null,
        innerText: '应督办数',
        outText: '已督办数',
        opinion: ['超速','凌晨2-5点违规运行','持续半小时无数据上传','连续超过4小时运行车辆'],
        // 应督办数
        yingData: [],
        // 已督办数
        yiData: []
      }
    },
    computed: {

    },
    methods: {
      ajaxLoader (tip) {
        var _this = this;
        _this.isLoadingShow = true;
        _this.loadingTip = tip;
      },
      ajaxComplete () {
        var _this = this;
        _this.isLoadingShow = false;
      },
      drawPie (id) {
        var _this = this;
        _this.chart = echarts.init(document.getElementById(id));
        _this.chart.setOption({
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{c} ({d}%)"
          },
          legend: {
            orient : 'horizontal',
            x : 'center',
            data:this.opinion
          },
          calculable : false,
          color: ['#7d0808','orange','#2f2626','#214663'],
          series : [
            {
              name: _this.innerText,
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
              data: _this.yingData
            },
            {
              name: _this.outText,
              type:'pie',
              center:	['50%', '55%'],
              radius : [90, 130],

              // for funnel
              x: '60%',
              width: '35%',
              funnelAlign: 'left',
              max: 1048,
              data: _this.yiData
            }
          ]
        });
      },
      getDataShow () {
        var _this = this;
        // 参数：用户id
        var postData = {
          userId: _this.userInfo.userId
        };
        var alarmSupervisionData = sessionStorage.getItem('alarmSupervisionData') && JSON.parse(JSON.parse(sessionStorage.getItem('alarmSupervisionData'))).data[0];
        console.log(alarmSupervisionData);
        if (alarmSupervisionData) {
          var data = alarmSupervisionData;
          // 超速
          var yingC = data.yingC,
            yiC = data.yiC,
          // 凌晨2-5点违规运行
            yingLc = data.yingLc,
            yiLc = data.yiLc,
          // 持续半小时无数据上传
            yingCx = data.yingCx,
            yiCx = data.yiCx,
          // 连续超过4小时运行车辆
            yingLx = data.yingLx,
            yiLx = data.yiLx;
          _this.yingData = [
            {value: yingC, name: yingC},
            {value: yingLc, name: yingLc},
            {value: yingCx, name: yingCx},
            {value: yingLx, name: yingLx}
          ];
          _this.yiData = [
            {value: yiC, name:'超速'},
            {value: yiLc, name:'凌晨2-5点违规运行'},
            {value: yiCx, name:'持续半小时无数据上传'},
            {value: yiLx, name:'连续超过4小时运行车辆'}
          ];
          _this.drawPie('supervisionReport');
        } else {
          _this.ajaxLoader('数据正在加载中,请稍候！');
          axios.post('/api/Supervise/QueryAlarmSupervisionCount', postData).then(res => {
            _this.ajaxComplete();
            /*var res = {
             "code": 0,
             "data": [
             {yingC: 500, yiC: 335, yingLc: 400, yiLc: 310, yingCx: 300, yiCx: 234, yingLx: 150, yiLx: 135}
             ]
             };*/
            sessionStorage.setItem('alarmSupervisionData', JSON.stringify(res.data)); // 进行数据缓存
            var res = JSON.parse(res.data);
            if (res.code == 0) {
              if (res.data.length > 0) { // 有数据
                var data = res.data[0];
                // 超速
                var yingC = data.yingC,
                  yiC = data.yiC,
                // 凌晨2-5点违规运行
                  yingLc = data.yingLc,
                  yiLc = data.yiLc,
                // 持续半小时无数据上传
                  yingCx = data.yingCx,
                  yiCx = data.yiCx,
                // 连续超过4小时运行车辆
                  yingLx = data.yingLx,
                  yiLx = data.yiLx;
                _this.yingData = [
                  {value: yingC, name: yingC},
                  {value: yingLc, name: yingLc},
                  {value: yingCx, name: yingCx},
                  {value: yingLx, name: yingLx}
                ];
                _this.yiData = [
                  {value: yiC, name:'超速'},
                  {value: yiLc, name:'凌晨2-5点违规运行'},
                  {value: yiCx, name:'持续半小时无数据上传'},
                  {value: yiLx, name:'连续超过4小时运行车辆'}
                ];
                _this.drawPie('supervisionReport')
              }
            } else {
              console.log(res.msg);
            }
          }).catch(error => {
            console.log(error);
          });
        }
      }

    },
    mounted () {
      this.$nextTick(function(){
        this.getDataShow();
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
