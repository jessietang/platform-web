<template lang="html">
    <div id="login">
      <div class="logo">
        <img src="./img/logo.png" alt=""/>
      </div>
      <p class="system-title">
        四川省道路运输车辆卫星定位系统省级监管平台
      </p>
      <div class="form-box">
        <div class="input-box username-box">
          <img src="./img/name.png" alt="" class="login-input-icon"/>
          <input type="text" class="username" placeholder="请输入用户名"/>
        </div>
        <div class="input-box pw-box">
          <img src="./img/pw.png" alt="" class="login-input-icon"/>
          <input type="password" class="pw" placeholder="请输入密码"/>
        </div>
        <a class="login-btn" id="button" name="button">登 &nbsp;&nbsp; 录</a>
      </div>
    </div>
</template>
<script lang="babel">
    export default {
        data ()
    {
        return {}
    }
    }
</script>
<style lang="scss" scoped="" type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';
  @import '../../assets/scss/base.scss';
  #login {
    width: 100%;
    height: 100%;
    @include pxrem(padding-top, 50);
    .logo {
      @include pxrem(width, 139);
      @include pxrem(height, 155);
      @include pxrem(margin, 0 auto 0 auto);

      img {
        @include pxrem(width, 139);
        @include pxrem(height, 155);
      }
    }

    .system-title {
      @include pxrem(width, 600);
      @include pxrem(margin, 0 auto);
      @include pxrem(padding, 30 0);
      @include pxrem(font-size, 40);
      text-align: center;
    }

    .form-box {
      @include pxrem(width, 580);
      margin: auto;
      @include pxrem(margin-top, 60);

      .input-box {
        position: relative;
        width: 100%;
        @include pxrem(height, 110);
        @include pxrem(height, 80);
        @include pxrem(margin, 50 auto);
        background-color: #eee;
        @include pxrem(border-radius, 10);

        .login-input-icon {
          position: absolute;
          @include pxrem(width, 28);
          @include pxrem(height, 30);
          @include pxrem(top, 25);
          @include pxrem(left, 10);
        }

        input {
          @include pxrem(width, 520);
          height: 100%;
          position: absolute;
          top: 0;
          right: 0;
          background-color: #eee;
          @include pxrem(border-radius, 0 10 10 0);
          @include pxrem(font-size, 26);
        }

      }

      .login-btn {
        @include pxrem(margin-top, 60);
        display: block;
        width: 100%;
        @include pxrem(height, 80);
        @include pxrem(line-height, 80);
        text-align: center;
        @include pxrem(font-size, 30);
        background-color: #1D9BF2;
        @include pxrem(border-radius, 10);
        color: #fff;
      }


    }


  }
</style>
