<template lang="html">
    <div id="carTrail">
      <div class="term">
        <ul class="time">
          <div class="block">
            <span class="bluePoint col-xs-hidden"></span>
            <span class="demonstration ">开始时间</span>
            <el-date-picker
              v-model="startTime"
              type="datetime"
              placeholder="选择开始时间"
              align="right"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </div>

          <div class="block">
            <span class="orangePoint col-xs-hidden"></span>
            <span class="demonstration ">结束时间</span>
            <el-date-picker
              v-model="endTime"
              type="datetime"
              placeholder="选择结束时间"
              align="right"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
        </ul>
        <div class="search">
          <div class="resetTime" @click="copyTime()">
            <img src="./img/copy.png" alt=""/>
          </div>
          <div class="searchTrail" @click="searchHistoryTrail()">搜索</div>
        </div>
      </div>

      <!--tips-->
      <div class="tips" v-if="tipShow">{{tips}}</div>
    </div>
</template>
<script lang="babel">
  import {mapState} from 'vuex'
    export default {
      data () {
        return {
          pickerOptions1: {
            shortcuts: [
              {
                text: '今天',
                onClick (picker) {
                  picker.$emit('pick', new Date());
                }
              },
              {
                text: '昨天',
                onClick (picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24);
                  picker.$emit('pick', date);
                }
              },
              {
                text: '一周前',
                  onClick (picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', date);
                }
              }
            ]
          },
          isShow: true,
          startTime: new Date(), // 开始时间 默认时间为当前时间
          endTime: new Date(), // 结束时间 默认时间为当前时间
          tips: '',
          tipShow: false
        }
      },
      created () {
        console.log(this.startTime);
      },
      computed: {
        ...mapState([
          'carDetail',
          'userInfo'
        ])
      },
      methods: {
        // 把第一个input框时间copy到第二个框
        copyTime () {
          this.endTime = this.startTime;
        },
        searchHistoryTrail () {
          var _this = this;
          if (_this.startTime !== '' && _this.endTime !== '') {
            if (_this.startTime.getTime() > _this.endTime.getTime()) {
              _this.tipShow = true;
              _this.tips = '开始日期不能晚于结束日期！';
              setTimeout(function(){
                _this.tipShow = false;
              }, 1000);
            } else if (_this.endTime.getTime() - _this.startTime.getTime() > 2 * 24 * 3600 * 1000) {
              _this.tipShow = true;
              _this.tips = '前后日期相差大于两天！';
              setTimeout(function(){
                _this.tipShow = false;
              }, 1000);
            }else {
              // 发请求
              var sd = _this.formatDate(_this.startTime); // 开始日期
              var st = _this.formateTime(_this.startTime); // 开始时间
              console.log(sd);
              console.log(st);
              var ed = _this.formatDate(_this.endTime); // 结束日期
              var et = _this.formateTime(_this.endTime); // 开始时间
              console.log(ed);
              console.log(et);

              // 参数：车辆ID、开始日期、开始时间、结束日期、结束时间、用户ID
              var postData = {
                carId: _this.carDetail.carId,
                userId: _this.userInfo.userId,
                startDate: sd,
                startTime: st,
                endDate: ed,
                endTime: et
              };
              axios.get('', postData).then(res => {
                var res = {
                  "code": 0,
                  "data": [
                    {
                      lng: 114.00100,
                      lat: 22.550000,
                      location: '成都市双流县航空港1',
                      direction: 23, // 这里的方向是个数值
                      speedCvt: "60",
                      limitSpeed: "40",
                      gpsDateCvt: "2017-7-13 13:53:12",
                      receiveDate: "2017-7-13 13:53:30"
                    },
                    {
                      lng: 114.00130,
                      lat: 22.550000,
                      location: '成都市双流县航空港2',
                      direction: 41,
                      speedCvt: "60",
                      limitSpeed: "40",
                      gpsDateCvt: "2017-7-13 14:10:12",
                      receiveDate: "2017-7-13 14:10:30"
                    },
                    {
                      lng: 114.00160,
                      lat: 22.550000,
                      location: '成都市双流县航空港3',
                      direction: 16,
                      speedCvt: "60",
                      limitSpeed: "40",
                      gpsDateCvt: "2017-7-13 15:20:12",
                      receiveDate: "2017-7-13 15:20:30"
                    },
                    {
                      lng: 114.00510,
                      lat: 22.550000,
                      location: '成都市双流县航空港4',
                      direction: 32,
                      speedCvt: "60",
                      limitSpeed: "40",
                      gpsDateCvt: "2017-7-13 16:53:12",
                      receiveDate: "2017-7-13 16:53:30"
                    },
                    {
                      lng: 114.00537,
                      lat: 22.549500,
                      location: '成都市双流县航空港5',
                      direction: 61,
                      speedCvt: "60",
                      limitSpeed: "40",
                      gpsDateCvt: "2017-7-13 17:34:12",
                      receiveDate: "2017-7-13 13:34:30"
                    },
                    {
                      lng: 114.00507,
                      lat: 22.548400,
                      location: '成都市双流县航空港6',
                      direction: 18,
                      speedCvt: "60",
                      limitSpeed: "40",
                      gpsDateCvt: "2017-7-13 17:34:12",
                      receiveDate: "2017-7-13 13:34:30"
                    },
                    {
                      lng: 114.00557,
                      lat: 22.545000,
                      location: '成都市双流县航空港7',
                      direction: '54',
                      speedCvt: "60",
                      limitSpeed: "40",
                      gpsDateCvt: "2017-7-13 17:34:12",
                      receiveDate: "2017-7-13 13:34:30"
                    },
                    {
                      lng: 114.00867,
                      lat: 22.556000,
                      location: '成都市双流县航空港8',
                      direction: 23,
                      speedCvt: "60",
                      limitSpeed: "40",
                      gpsDateCvt: "2017-7-13 17:34:12",
                      receiveDate: "2017-7-13 13:34:30"
                    },
                    {
                      lng: 114.00067,
                      lat: 22.556000,
                      location: '成都市双流县航空港9',
                      direction: 832,
                      speedCvt: "60",
                      limitSpeed: "40",
                      gpsDateCvt: "2017-7-13 17:34:12",
                      receiveDate: "2017-7-13 13:34:30"
                    },
                    {
                      lng: 114.00000,
                      lat: 22.548000,
                      location: '成都市双流县航空港10',
                      direction: 22,
                      speedCvt: "60",
                      limitSpeed: "40",
                      gpsDateCvt: "2017-7-13 17:34:12",
                      receiveDate: "2017-7-13 13:34:30"
                    }
                  ]
                };
                if (res.code == 0) {
                  if (res.data.length > 0) { // 有数据，有历史轨迹
                    var trackData = res.data;
                    _this.isShow = false;
                    _this.$emit('drawTrack', trackData, _this.isShow); // 触发父组件的自定义事件
                  } else { // 无数据，无历史轨迹
                    _this.tipShow = true;
                    _this.tips = '无历史轨迹数据！';
                    setTimeout(function(){
                      _this.tipShow = false;
                    }, 1000);
                  }
                } else {
                  console.log(res.msg);
                }
              }).catch(error => {
                console.log(error);
              });
            }
          } else {
            _this.tipShow = true;
            _this.tips = '请先选择时间！';
            setTimeout(function(){
              _this.tipShow = false;
            }, 1000);
          }

        },
        formatDate (time) {
          var y = time.getFullYear();
          var m = time.getMonth() + 1;
          var d = time.getDate();
          if (m < 10) {
            m = '0' + m;
          }
          if (d < 10) {
            d = '0' + d;
          }
          return y + '' + m + '' + d;
        },
        formateTime (time) {
          var h = time.getHours();
          var m = time.getMinutes();
          var s = time.getSeconds();
          var allS = h * 3600 + m * 60 + s;
          return allS;
        }
      }
    }
</script>
<style lang="scss" type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';

  #carTrail {
    @include pxrem(margin-top, 50);
  }

  .term {
    @extend %flex-center;

    .time {
      width: 70%;
    }

    .search {
      width: 30%;
      @extend %flex-center;

      .resetTime {
        @include pxrem(width, 50);
        @include pxrem(height, 50);

        img {
          @include pxrem(width, 50);
          @include pxrem(height, 50);
        }
      }

      .searchTrail {
        @include pxrem(width, 120);
        @include pxrem(height, 50);
        text-align: center;
        @include pxrem(line-height, 50);
        @include pxrem(font-size,30);
      }
    }

  }
  .block {
    @include pxrem(padding, 10 0);
    border-bottom: 1px dashed #eee;

    .bluePoint {
      display: inline-block;
      @include pxrem(width, 16);
      @include pxrem(height, 16);
      @include pxrem(margin-right, 5);
      @include pxrem(border-radius, 8);
      background-color: blue;
    }

    .orangePoint {
      display: inline-block;
      @include pxrem(width, 16);
      @include pxrem(height, 16);
      @include pxrem(margin-right, 5);
      @include pxrem(border-radius, 8);
      background-color: orange;
    }

  }

  .tips {
    position: absolute;
    z-index: 10000;
    top: -40%;
    left: 50%;
    @include pxrem(margin-left, -200);
    @include pxrem(width,440);
    @include pxrem(padding, 30 0);
    background-color: rgba(0, 0, 0, 0.6);
    @include pxrem(border-radius, 10);
    text-align: center;
    color: #fff;
    @include pxrem(font-size,26);
  }

  .demonstration {
    @include pxrem(margin-right, 20);
    @include pxrem(font-size, 26);
  }

  .el-picker-panel__sidebar {
    position: absolute!important;
    left: 0!important;
    top: 330px!important;
    width: 100%!important;
    height: 35px!important;

    .el-picker-panel__shortcut {
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 1000;
      width: 50px;
    }

    .el-picker-panel__shortcut:nth-child(2) {
      left: 50px;

    }

    .el-picker-panel__shortcut:nth-child(3) {
      left: 100px;
      width: 80px;
    }
  }

  .el-picker-panel [slot=sidebar]+.el-picker-panel__body, .el-picker-panel__sidebar+.el-picker-panel__body {
    margin-left: 0!important;
  }

  @media screen and (max-width: 440px) {
    .col-xs-hidden {
      display: none!important;
    }

    .el-date-picker.has-sidebar.has-time {
      min-width: 324px;
    }
  }

  @media screen and (max-width: 400px) {
    #carTrail {
      @include pxrem(margin-top, 0);
    }

    .el-date-editor.el-input.el-date-editor--datetime {
      @include pxrem(margin-top, 10);
    }

    .block {
      @include pxrem(padding, 5 0);
    }
  }


</style>
