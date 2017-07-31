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
          },
          //密码
          hexcase: 1,
          b64pad: '',
          chrsz: 8,
          mode: 32
        }
      },
    /*
    * var hexcase = 1;
     var b64pad = "";
     var chrsz = 8;
     var mode = 32;
    * */
      created () {
        this.getLocalUsernameAndPass();
      },
      methods: {
        // 密码加密
        md5 (A) {
          return this.hex_md5(A)
        },
        hex_md5(A) {
          var _this = this;
          return _this.binl2hex(_this.core_md5(_this.str2binl(A), A.length * _this.chrsz))
        },
        str_md5(A) {
          var _this = this;
          return _this.binl2str(_this.core_md5(_this.str2binl(A), A.length * _this.chrsz))
        },
        hex_hmac_md5(A, B) {
          var _this = this;
          return _this.binl2hex(_this.core_hmac_md5(A, B))
        },
        b64_hmac_md5(A, B) {
          var _this = this;
          return _this.binl2b64(_this.core_hmac_md5(A, B))
        },
        str_hmac_md5(A, B) {
          var _this = this;
          return _this.binl2str(_this.core_hmac_md5(A, B))
        },
        core_md5(K, F) {
          var _this = this;
          K[F >> 5] |= 128 << ((F) % 32);
          K[(((F + 64) >>> 9) << 4) + 14] = F;
          var J = 1732584193;
          var I = -271733879;
          var H = -1732584194;
          var G = 271733878;
          for (var C = 0; C < K.length; C += 16) {
            var E = J;
            var D = I;
            var B = H;
            var A = G;
            J = _this.md5_ff(J, I, H, G, K[C + 0], 7, -680876936);
            G = _this.md5_ff(G, J, I, H, K[C + 1], 12, -389564586);
            H = _this.md5_ff(H, G, J, I, K[C + 2], 17, 606105819);
            I = _this.md5_ff(I, H, G, J, K[C + 3], 22, -1044525330);
            J = _this.md5_ff(J, I, H, G, K[C + 4], 7, -176418897);
            G = _this.md5_ff(G, J, I, H, K[C + 5], 12, 1200080426);
            H = _this.md5_ff(H, G, J, I, K[C + 6], 17, -1473231341);
            I = _this.md5_ff(I, H, G, J, K[C + 7], 22, -45705983);
            J = _this.md5_ff(J, I, H, G, K[C + 8], 7, 1770035416);
            G = _this.md5_ff(G, J, I, H, K[C + 9], 12, -1958414417);
            H = _this.md5_ff(H, G, J, I, K[C + 10], 17, -42063);
            I = _this.md5_ff(I, H, G, J, K[C + 11], 22, -1990404162);
            J = _this.md5_ff(J, I, H, G, K[C + 12], 7, 1804603682);
            G = _this.md5_ff(G, J, I, H, K[C + 13], 12, -40341101);
            H = _this.md5_ff(H, G, J, I, K[C + 14], 17, -1502002290);
            I = _this.md5_ff(I, H, G, J, K[C + 15], 22, 1236535329);
            J = _this.md5_gg(J, I, H, G, K[C + 1], 5, -165796510);
            G = _this.md5_gg(G, J, I, H, K[C + 6], 9, -1069501632);
            H = _this.md5_gg(H, G, J, I, K[C + 11], 14, 643717713);
            I = _this.md5_gg(I, H, G, J, K[C + 0], 20, -373897302);
            J = _this.md5_gg(J, I, H, G, K[C + 5], 5, -701558691);
            G = _this.md5_gg(G, J, I, H, K[C + 10], 9, 38016083);
            H = _this.md5_gg(H, G, J, I, K[C + 15], 14, -660478335);
            I = _this.md5_gg(I, H, G, J, K[C + 4], 20, -405537848);
            J = _this.md5_gg(J, I, H, G, K[C + 9], 5, 568446438);
            G = _this.md5_gg(G, J, I, H, K[C + 14], 9, -1019803690);
            H = _this.md5_gg(H, G, J, I, K[C + 3], 14, -187363961);
            I = _this.md5_gg(I, H, G, J, K[C + 8], 20, 1163531501);
            J = _this.md5_gg(J, I, H, G, K[C + 13], 5, -1444681467);
            G = _this.md5_gg(G, J, I, H, K[C + 2], 9, -51403784);
            H = _this.md5_gg(H, G, J, I, K[C + 7], 14, 1735328473);
            I = _this.md5_gg(I, H, G, J, K[C + 12], 20, -1926607734);
            J = _this.md5_hh(J, I, H, G, K[C + 5], 4, -378558);
            G = _this.md5_hh(G, J, I, H, K[C + 8], 11, -2022574463);
            H = _this.md5_hh(H, G, J, I, K[C + 11], 16, 1839030562);
            I = _this.md5_hh(I, H, G, J, K[C + 14], 23, -35309556);
            J = _this.md5_hh(J, I, H, G, K[C + 1], 4, -1530992060);
            G = _this.md5_hh(G, J, I, H, K[C + 4], 11, 1272893353);
            H = _this.md5_hh(H, G, J, I, K[C + 7], 16, -155497632);
            I = _this.md5_hh(I, H, G, J, K[C + 10], 23, -1094730640);
            J = _this.md5_hh(J, I, H, G, K[C + 13], 4, 681279174);
            G = _this.md5_hh(G, J, I, H, K[C + 0], 11, -358537222);
            H = _this.md5_hh(H, G, J, I, K[C + 3], 16, -722521979);
            I = _this.md5_hh(I, H, G, J, K[C + 6], 23, 76029189);
            J = _this.md5_hh(J, I, H, G, K[C + 9], 4, -640364487);
            G = _this.md5_hh(G, J, I, H, K[C + 12], 11, -421815835);
            H = _this.md5_hh(H, G, J, I, K[C + 15], 16, 530742520);
            I = _this.md5_hh(I, H, G, J, K[C + 2], 23, -995338651);
            J = _this.md5_ii(J, I, H, G, K[C + 0], 6, -198630844);
            G = _this.md5_ii(G, J, I, H, K[C + 7], 10, 1126891415);
            H = _this.md5_ii(H, G, J, I, K[C + 14], 15, -1416354905);
            I = _this.md5_ii(I, H, G, J, K[C + 5], 21, -57434055);
            J = _this.md5_ii(J, I, H, G, K[C + 12], 6, 1700485571);
            G = _this.md5_ii(G, J, I, H, K[C + 3], 10, -1894986606);
            H = _this.md5_ii(H, G, J, I, K[C + 10], 15, -1051523);
            I = _this.md5_ii(I, H, G, J, K[C + 1], 21, -2054922799);
            J = _this.md5_ii(J, I, H, G, K[C + 8], 6, 1873313359);
            G = _this.md5_ii(G, J, I, H, K[C + 15], 10, -30611744);
            H = _this.md5_ii(H, G, J, I, K[C + 6], 15, -1560198380);
            I = _this.md5_ii(I, H, G, J, K[C + 13], 21, 1309151649);
            J = _this.md5_ii(J, I, H, G, K[C + 4], 6, -145523070);
            G = _this.md5_ii(G, J, I, H, K[C + 11], 10, -1120210379);
            H = _this.md5_ii(H, G, J, I, K[C + 2], 15, 718787259);
            I = _this.md5_ii(I, H, G, J, K[C + 9], 21, -343485551);
            J = _this.safe_add(J, E);
            I = _this.safe_add(I, D);
            H = _this.safe_add(H, B);
            G = _this.safe_add(G, A)
          }
          if (_this.mode == 16) {
            return Array(I, H)
          } else {
            return Array(J, I, H, G)
          }
        },
        md5_cmn(F, C, B, A, E, D) {
          var _this = this;
          return _this.safe_add(_this.bit_rol(_this.safe_add(_this.safe_add(C, F), _this.safe_add(A, D)), E), B)
        },
        md5_ff(C, B, G, F, A, E, D) {
          var _this = this;
          return _this.md5_cmn((B & G) | ((~B) & F), C, B, A, E, D)
        },
        md5_gg(C, B, G, F, A, E, D) {
          var _this = this;
          return _this.md5_cmn((B & F) | (G & (~F)), C, B, A, E, D)
        },
        md5_hh(C, B, G, F, A, E, D) {
          var _this = this;
          return _this.md5_cmn(B ^ G ^ F, C, B, A, E, D)
        },
        md5_ii(C, B, G, F, A, E, D) {
          var _this = this;
          return _this.md5_cmn(G ^ (B | (~F)), C, B, A, E, D)
        },
        core_hmac_md5(C, F) {
          var _this = this;
          var E = _this.str2binl(C);
          if (E.length > 16) {
            E = _this.core_md5(E, C.length * _this.chrsz)
          }
          var A = Array(16),
            D = Array(16);
          for (var B = 0; B < 16; B++) {
            A[B] = E[B] ^ 909522486;
            D[B] = E[B] ^ 1549556828
          }
          var G = _this.core_md5(A.concat(_this.str2binl(F)), 512 + F.length * _this.chrsz);
          return _this.core_md5(D.concat(G), 512 + 128)
        },
        safe_add(A, D) {
          var _this = this;
          var C = (A & 65535) + (D & 65535);
          var B = (A >> 16) + (D >> 16) + (C >> 16);
          return (B << 16) | (C & 65535)
        },
        bit_rol(A, B) {
          var _this = this;
          return (A << B) | (A >>> (32 - B))
        },
        str2binl(D) {
          var _this = this;
          var C = Array();
          var A = (1 << _this.chrsz) - 1;
          for (var B = 0; B < D.length * _this.chrsz; B += _this.chrsz) {
            C[B >> 5] |= (D.charCodeAt(B / _this.chrsz) & A) << (B % 32)
          }
          return C
        },
        binl2str(C) {
          var _this = this;
          var D = "";
          var A = (1 << _this.chrsz) - 1;
          for (var B = 0; B < C.length * 32; B += _this.chrsz) {
            D += String.fromCharCode((C[B >> 5] >>> (B % 32)) & A)
          }
          return D
        },
        binl2hex(C) {
          var _this = this;
          var B = _this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
          var D = "";
          for (var A = 0; A < C.length * 4; A++) {
            D += B.charAt((C[A >> 2] >> ((A % 4) * 8 + 4)) & 15) + B.charAt((C[A >> 2] >> ((A % 4) * 8)) & 15)
          }
          return D
        },
        binl2b64 (D) {
          var _this = this;
          var C = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
          var F = "";
          for (var B = 0; B < D.length * 4; B += 3) {
            var E = (((D[B >> 2] >> 8 * (B % 4)) & 255) << 16) | (((D[B + 1 >> 2] >> 8 * ((B + 1) % 4)) & 255) << 8) | ((D[B + 2 >> 2] >> 8 * ((B + 2) % 4)) & 255);
            for (var A = 0; A < 4; A++) {
              if (B * 8 + A * 6 > D.length * 32) {
                F += _this.b64pad
              } else {
                F += C.charAt((E >> 6 * (3 - A)) & 63)
              }
            }
          }
          return F
        },
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
              _this.password = _this.md5(password);
            }
            // 参数： 用户名、密码
            let postData = {
              username: username,
              password: _this.password
            };
            console.log(postData);
            axios.post('/api/Account/Login',postData).then(res => {
              /*var res = {
                "code": 0,
                "data": [{"userId": "123", "zoneId": "1111"}]
              };*/
              var res = JSON.parse(res.data);
              if (res.code == 0) {
                if (res.data.length > 0) { // 验证通过
                  var data = res.data;
                  localStorage.setItem('platformUserName', username);
                  sessionStorage.setItem('platformPassword', password);
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

                  //重定向到首页
                  _this.$router.push({
                    path: '/web/index/nearCar'
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
