<template lang="html">
    <div id="moduleIndex">
      <div class="modularBox clearfix">
        <div class="block">
          <el-carousel trigger="click" :autoplay="false">
            <el-carousel-item>
              <div class="modularList" @click="goServerSupervise()">
                <img src="./img/serverSupervise.png" />
                <span>服务器监控</span>
              </div>
              <div class="modularList" @click="goSp()">
                <img src="./img/modular2.png" alt="sp系统"/>
                <span>SP系统</span>
              </div>
              <div class="modularList">
                <img src="./img/modular4.png" />
                <span>统计分析</span>
              </div>
              <div class="modularList" @click="goProviderCheck()">
                <img src="./img/providerCheck.png" />
                <span>服务商考核</span>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="modularList">
                <img src="./img/serverSupervise.png" alt=""/>
                <span>服务器监控</span>
              </div>
              <div class="modularList">
                <img src="./img/serverSupervise.png" alt=""/>
                <span>服务器监控</span>
              </div>
              <div class="modularList">
                <img src="./img/serverSupervise.png" alt=""/>
                <span>服务器监控</span>
              </div>
              <div class="modularList">
                <img src="./img/serverSupervise.png" alt=""/>
                <span>服务器监控</span>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>

      </div>

      <div class="modularBottom">
        <div class="modularEchartBox">
          <div class="zx-zg">
            <div class="zx">
              <p class="text">在线平台数</p>
              <p class="num">{{zxNum}}</p>
            </div>
            <div class="zg">
              <p class="text">在岗平台数</p>
              <p class="num">{{zgNum}}</p>
            </div>
          </div>
          <!--平台总数-->
          <div class="allNum">
            平台总数：<span class="platformAll">{{platformAll}}</span>
          </div>
        </div>
      </div>
    </div>
</template>
<script lang="babel">
    import {mapState} from 'vuex'
    import axios from 'axios'
    export default {
      data () {
        return {
          zxNum: 0, // 在线平台数
          zgNum: 0, // 在岗平台数
          platformAll: 0, // 平台总数
          userInfo: JSON.parse(localStorage.getItem('platformUserInfo')) || this.$store.state.userInfo
        }
      },
      computed: {

      },
      methods: {
        // 获取页面要展示的数据
        initData () {
          var _this = this;
          // 参数： userId
          var postData = {
            userId: _this.userInfo.userId
          };
          axios.post('api/Industry/QueryIndustryCount',postData).then(res => {
            /*var res = {
              "code": 0,
              "data": [
                {zxNum: 110, zgNum: 119, platformAll: 3456}
              ]
            };*/
            var res = JSON.parse(res.data);
            if (res.code == 0) {
              if (res.data.length > 0) {
                var data = res.data[0];
                var zxNum = data.zxNum,
                  zgNum = data.zgNum,
                  platformAll = data.platformAll;
                _this.zxNum = zxNum;
                _this.zgNum = zgNum;
                _this.platformAll = platformAll;
              } else {
                alert('获取数据失败！');
                _this.zxNum = 0;
                _this.zgNum = 0;
                _this.platformAll = 0;
              }
            } else {
              console.log(res.msg);
            }
          }).catch(error => {
            console.log(error);
          });
        },
        // sp系统模块
        goSp () {
          this.$router.push({
            path: '/web/spSystem'
          });
        },
        // 服务器监控模块
        goServerSupervise  () {
          this.$router.push({
            path: '/web/serverSupervise'
          });
        },
        // 服务商考核数据
        goProviderCheck () {
          this.$router.push({
            path: '/web/providerCheck'
          })
        }

      },
      mounted () {
        this.$nextTick(function(){
          this.initData();
        })
      }
    }
</script>
<style lang="scss" type="text/css">
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

      .block {
        width: 100%;
        @include pxrem(height,400);

        .el-carousel, .el-carousel__container, .el-carousel__item {
          width: 100%;
          @include pxrem(height,400);
        }

        .el-carousel__container > button {
          display: none;
        }

        .el-carousel__button {
          background-color: #0a72a9;
        }
      }

      .modularList {
        float: left;
        width: 50%;
        @include pxrem(height,200);
        @include pxrem(line-height,200);

        img {
          @include pxrem(width,67);
          @include pxrem(height,67);
          vertical-align: middle;
          @include pxrem(margin-left, 50);
          @include pxrem(margin-right, 20);
        }

        span {
          @include pxrem(font-size, 30);
          color: #1296db;
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
        color: #21a0fa;

        .zx-zg {
          width: 100%;
          @include pxrem(height, 300);
          @extend %flex-center;

          .zx {
            border-right: 1px solid #eee;
          }
          .zx, .zg {
            width: 50%;
            height: 100%;
            text-align: center;

            .text {
              @include pxrem(font-size, 30);
              @include pxrem(height, 100);
              @include pxrem(line-height, 100);
            }
            .num {
              @include pxrem(font-size, 50);
              @include pxrem(height, 200);
              @include pxrem(line-height, 200);
              font-weight: bold;
            }
          }
        }

        .allNum {
          width: 100%;
          @include pxrem(height, 168);
          @include pxrem(line-height, 168);
          border-top: 1px solid #eee;
          @include pxrem(font-size, 30);
          text-align: center;
        }
      }
    }
  }
</style>
