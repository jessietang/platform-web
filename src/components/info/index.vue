<template lang="html">
    <div id="info">
      <div class="topInfo">
        <div class="defaultPhoto">
          <img src="./img/defaultPhoto.png" alt=""/>
        </div>
        <p class="nameText">{{username}}</p>
      </div>

      <div class="centerFun">
        <ul class="funs">
          <li class="fun-list" @click="goChangePass()"><img src="./img/pass.png" alt=""/>修改密码<span class="el-icon-arrow-right"></span></li>
          <li class="fun-list"><img src="./img/release.png" alt=""/>当前版本<span class="el-icon-arrow-right"></span><span class="now-release">1.0.0</span></li>
        </ul>
      </div>

      <div class="log-out" @click="showExitPopup()">注销登录</div>

      <!--注销登录确认popup-->
      <div class="mask" v-if="isExitShow">
        <div class="log-out-popup">
          <div class="popup-title">提示</div>
          <div class="popup-content">
            您确定要退出系统吗？
          </div>
          <div class="popup-btn">
            <div class="exit-btn exitSure" @click="exitSure()">确认</div>
            <div class="exit-btn exitCancel" @click="exitCancel()">取消</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script lang="babel">
    export default {
      data () {
        return {
          isExitShow: false,
          userInfo: JSON.parse(localStorage.getItem('platformUserInfo')) || this.$store.state.userInfo
        }
      },
      methods: {
        goChangePass () {
          this.$router.push({
            path: '/changePass'
          })
        },
        // 注销登录
        showExitPopup () {
          var _this = this;
          _this.isExitShow = true;
        },
        exitSure () {
          var _this = this;
          // 清除登录状态
          localStorage.setItem('platformLoginState', false);
          _this.isExitShow = false;
          // 跳转到首页
          _this.$router.push({
            path: '/login'
          })
        },
        exitCancel () {
          var _this = this;
          _this.isExitShow = false;
        }

      }
    }
</script>
<style lang="scss" scoped="" type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';

  #info {
    width: 100%;
    height: 100%;

    .topInfo {
      width: 100%;
      @include pxrem(height, 400);
      background-color: #eee;
      @include pxrem(padding-top, 80);

      .defaultPhoto {
        @include pxrem(width, 128);
        @include pxrem(height, 128);
        margin: auto;

        img {
          @include pxrem(width, 128);
          @include pxrem(height, 128);
        }
      }

      .nameText {
        width: 100%;
        @include pxrem(height, 80);
        @include pxrem(line-height, 80);
        text-align: center;
        @include pxrem(font-size, 26);
      }
    }

    .centerFun {
      width: 100%;
      height: auto;

      .funs {
        .fun-list {
          width: 100%;
          @include pxrem(height, 100);
          @include pxrem(line-height, 100);
          border: 1px solid #eee;
          @include pxrem(font-size, 26);
          @include pxrem(padding-left, 10);

          img {
            @include pxrem(width, 40);
            @include pxrem(height, 40);
            @include pxrem(margin-top, 30);
            @include pxrem(margin-right, 10);
          }

          span {
            float: right;
            display: block;
            @include pxrem(height, 100);
            @include pxrem(line-height, 100);
            @include pxrem(margin-right, 10);
          }
        }
      }
    }

    .log-out {
      width: 80%;
      @include pxrem(margin, 100 auto);
      @include pxrem(height, 100);
      @include pxrem(line-height, 100);
      text-align: center;
      color: #fff;
      background-color: #ad1616;
      @include pxrem(border-radius,10);
      @include pxrem(font-size, 30);
      @include pxrem(letter-spacing, 6);
    }

    .mask {
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.1);
      position: fixed;
      top: 0;
      left: 0;

      .log-out-popup {
        @include pxrem(width, 600);
        @include pxrem(height, 280);
        position: absolute;
        left: 50%;
        top: 50%;
        @include pxrem(margin-top, -140);
        @include pxrem(margin-left, -300);
        background-color: #fff;
        @include pxrem(font-size, 26);
        @include pxrem(border-radius, 10);
        .popup-title {
          @include pxrem(font-size, 30);
          @include pxrem(height,100);
          @include pxrem(line-height,100);
          text-align: center;
        }
        .popup-content {
          @include pxrem(height,100);
          @include pxrem(line-height,100);
          text-align: center;
        }
        .popup-btn {
          border-top: 1px solid #eee;
          @include pxrem(height,80);

          .exit-btn {
            @include pxrem(width, 300);
            text-align: center;
            @include pxrem(height,80);
            @include pxrem(line-height,80);
            float: left;
          }

          .exitSure {
            border-right: 1px solid #eee;
            @include pxrem(border-radius, 0 0 0 10);
          }

          .exitCancel {
            background-color: #333;
            color: #fff;
            @include pxrem(border-radius, 0 0 10 0);
          }
        }
      }
    }
  }
</style>
