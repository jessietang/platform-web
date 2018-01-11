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
          <input type="text" class="username" placeholder="请输入用户名" v-model="username"/>
        </div>
        <div class="input-box pw-box">
          <img src="./img/pw.png" alt="" class="login-input-icon"/>
          <input type="password" class="pw" placeholder="请输入密码" v-model="password"/>
        </div>
        <a class="login-btn" id="button" name="button" @click="doLogin()">登 &nbsp;&nbsp; 录</a>
      </div>

      <div class="errorTip" v-if="isError">{{errorTip}}</div>
    </div>
</template>
<script lang="babel">
  import { md5 } from '../../assets/js/common/index'
    export default {
      data () {
        return {
          username: '',
          password: '',
          errorTip: '',
          isError: false,
          // 用户信息
          userInfo: {
            userId: 0, // 用户id
            zoneId: 0 // 区域id
          }
        }
      },
      created () {
        this.getLocalUsernameAndPass();
      },
      methods: {
        // 从本地localStorage读取username
        getLocalUsernameAndPass () {
          this.username = '' || localStorage.getItem('platformUserName');
          this.password = '' || sessionStorage.getItem('platformPassword');
        },
        // 处理登录
        doLogin () {
          var _this = this;
          var username = _this.username;
          var password = _this.password;
          if (username !== '' && password !== '') {
            if (password && password.length < 32) {
              _this.password = md5(password);
            }
            // 参数： 用户名、密码
            let postData = {
              username: username,
              password: _this.password
            };
            console.log(postData);
            axios.post('api/Account/Login',postData).then(res => {
              /*var res = {
                "code": 0,
                "data": [{"userId": "123", "zoneId": "1111"}]
              };*/
              var res = JSON.parse(res.data);
              if (res.code == 0) {
                if (res.data.length > 0) { // 验证通过
                  var data = res.data;
                  localStorage.setItem('platformUserName', username);
                  sessionStorage.setItem('platformPassword', _this.password);
                  console.log(localStorage.getItem('platformUserName'));
                  // 拿到userId,zoneId 保存在store里面
                  var userId = data[0].userId;
                  var zoneId = data[0].zoneId;
                  _this.userInfo.userId = userId;
                  _this.userInfo.zoneId = zoneId;
                  var userInfo = _this.userInfo;
                  // localStorage.setItem() 不会自动将Json对象转成字符串形式
                  // 如果：localStorage.setItem('platformUserInfo', userInfo);
                  // 就有：localStorage.getItem('platformUserInfo'); // [object Object]
                  // 注意这里localStorage保存json对象的方式
                  localStorage.setItem('platformUserInfo', JSON.stringify(userInfo));
                  console.log(JSON.parse(localStorage.getItem('platformUserInfo')));

                  // 保存登录状态
                  localStorage.setItem('platformLoginState', true);

                  sessionStorage.name = username;
                  sessionStorage.Pwd = _this.password;
                  sessionStorage.userId = userId;
                  sessionStorage.zoneId = zoneId;

                  //重定向到首页
                  _this.$router.push({
                    path: '/web/index'
                  });
                } else { // 验证不通过
                  _this.errorTip = '用户名或密码错误！';
                  _this.isError = true;
                  setTimeout(function(){
                    _this.isError = false;
                  },1000);
                }
              } else {
                console.log(res.msg);
              }
            }).catch(error => {
                console.log(error);
            });
          } else {
            _this.errorTip = '用户名或密码不能为空！';
            _this.isError = true;
            setTimeout(function(){
              _this.isError = false;
            },1000);
          }
        }
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
        border: 1px solid #e3e3e3;

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
        @include input-placeholder-color(#333);

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

    .errorTip {
      @include pxrem(width,340);
      @include pxrem(padding, 10 0);
      background-color: rgba(0, 0, 0, .2);
      @include pxrem(border-radius, 10);
      text-align: center;
      @include pxrem(margin, 100 auto);
      color: darkred;
    }


  }
</style>
