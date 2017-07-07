<template lang="html">
    <div id="carTrail">
      <div class="term">
        <ul class="time">
          <div class="block">
            <span class="bluePoint col-xs-hidden"></span>
            <span class="demonstration col-xs-hidden">开始时间</span>
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
            <span class="demonstration col-xs-hidden">结束时间</span>
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
          <div class="resetTime" @click="resetTime()">
            <img src="./img/magnify.png" alt=""/>
          </div>
          <div class="searchTrail">搜索</div>
        </div>
      </div>
    </div>
</template>
<script lang="babel">
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
          startTime: '', // 开始时间
          endTime: '' // 结束时间
        }
      },
      methods: {
        resetTime () {
          this.startTime = '';
          this.endTime = '';
        }
      }
    }
</script>
<style lang="scss" type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';

  @media screen and (max-width: 440px) {
    .col-xs-hidden {
      display: none!important;
    }

    .el-date-picker.has-sidebar.has-time {
      min-width: 324px;
    }
  }

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
      @include pxrem(margin-right, 15);
      @include pxrem(border-radius, 8);
      background-color: blue;
    }

    .orangePoint {
      display: inline-block;
      @include pxrem(width, 16);
      @include pxrem(height, 16);
      @include pxrem(margin-right, 15);
      @include pxrem(border-radius, 8);
      background-color: orange;
    }

  }

  .demonstration {
    @include pxrem(margin-right, 20);
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
    }

    .el-picker-panel__shortcut:nth-child(2) {
      left: 50px;
    }

    .el-picker-panel__shortcut:nth-child(3) {
      left: 100px;
    }
  }

  .el-picker-panel [slot=sidebar]+.el-picker-panel__body, .el-picker-panel__sidebar+.el-picker-panel__body {
    margin-left: 0!important;
  }


</style>
