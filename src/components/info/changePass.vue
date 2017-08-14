<template lang="html">
    <div id="changePass">
      <div class="top">
        <div class="top-back" @click="goBack()">
          <img src="../../../static/img/back.png" alt=""/>
        </div>
        <div class="top-title">
          修改密码
        </div>
      </div>

      <ul class="content">
        <li class="input-box">
          <label for="">旧密码：</label>
          <input type="password" v-model="oldPass"/>
        </li>
        <li class="input-box">
          <label for="">新密码：</label>
          <input type="password" v-model="newPass"/>
        </li>
        <li class="input-box">
          <label for="">确认密码：</label>
          <input type="password" v-model="surePass"/>
        </li>
      </ul>

      <div class="btnContent">
        <div class="btn saveBtn" @click="saveChange()">保存</div>
        <div class="btn cancelBtn" @click="cancelChange()">取消</div>
      </div>

      <!--tips-->
      <div class="tips" v-if="tipShow">{{tips}}</div>

    </div>
</template>
<script lang="babel">
  import {mapState} from 'vuex'
  import axios from 'axios'
    export default {
      data () {
        return {
          userInfo: JSON.parse(localStorage.getItem('platformUserInfo')) || this.$store.state.userInfo,
          oldPass: '',
          newPass: '',
          surePass: '',
          tips: '',
          tipShow: false,
          //密码
          hexcase: 1,
          b64pad: '',
          chrsz: 8,
          mode: 32
        }
      },
      computed: {

      },
      methods: {
        // 返回上一页
        goBack () {
          this.$router.go(-1);
        },
        // 取消修改
        cancelChange () {
          this.oldPass = '';
          this.newPass = '';
          this.surePass = '';
        },
        showTips (tips) {
          var _this = this;
          _this.tips = tips;
          _this.tipShow = true;
          setTimeout(function(){
            _this.tipShow = false;
          }, 1000);
        },
        // 保存修改
        saveChange () {
          var _this = this;
          var tips = '';
          if (_this.oldPass !== '' && _this.newPass !== '' && _this.surePass !== '') {
            if (_this.newPass === _this.oldPass) {
              tips = '新密码不能与旧密码一样，请重填！';
              _this.showTips(tips);
            } else if (_this.newPass !== _this.surePass) {
              tips = '请确认新密码！';
              _this.showTips(tips);
            } else {
              // 发请求去修改密码
              // 参数：填写的旧密码 新密码 用户id
              var postData = {
                oldPass: _this.md5(_this.oldPass),
                newPass: _this.md5(_this.newPass),
                userId: _this.userInfo.userId
              };
              /*var res = {
                "code": 0,
                "data": [
                  {"cState": 101, "tips": "密码已修改成功！", newPass: '123abcABC'}
                ]
              };*/
              /*var res = {
                "code": 0,
                "data": [
                  {"cState": 102, "tips": "您的旧密码不对，请重新填写！", newPass: '123'}
                ]
              };*/
              axios.post('/api/Account/UpdateUserLoginPass', postData).then(res => {
                var res = JSON.parse(res.data);
                if (res.code == 0) {
                  if (res.data[0].cState == 101) { // 修改成功
                    // 修改成功
                    tips = (res && res.data[0] && res.data[0].tips) || '密码已修改成功！';
                    _this.showTips(tips);
                    // 输入框置空
                    _this.oldPass = '';
                    _this.newPass = '';
                    _this.surePass = '';
                  } else if (res.data[0].cState == 102) { // 修改失败，旧密码不对
                    // 旧密码不对
                    tips = (res && res.data[0] && res.data[0].tips) || '您的旧密码不对，请重新填写！';
                    _this.showTips(tips);
                  }
                } else { // 未知
                  tips = '未知情况，修改失败！';
                  _this.showTips(tips);
                }
              }).catch(error => {
                console.log(error);
              });
            }
          } else {
            tips = '输入框未全部填完，请填写！';
            _this.showTips(tips);
          }
        },
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
      }
    }
</script>
<style lang="scss" scoped="" type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';

  #changePass {
    .top {
      width: 100%;
      @include pxrem(height, 80);
      @extend %flex-left;
      border-bottom: 1px solid #eee;
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

    .content {
      @include pxrem(width, 600);
      height: auto;
      @include pxrem(margin, 150 auto);

      .input-box {
        width: 100%;
        @include pxrem(height, 80);
        @include pxrem(line-height, 80);
        @include pxrem(font-size, 26);
        @include pxrem(margin-top, 30);

        label {
          display: inline-block;
          @include pxrem(width, 150);
          @include pxrem(height, 80);
          @include pxrem(line-height, 80);
          text-align: right;
        }

        input {
          display: inline-block;
          @include pxrem(width, 400);
          @include pxrem(height, 60);
          @include pxrem(margin-top, 10);
          @include pxrem(margin-left, 20);
          border: 1px solid #ccc;
          @include pxrem(border-radius, 8);
        }
      }
    }

    .btnContent {
      @include pxrem(width, 500);
      @include pxrem(height, 80);
      @include pxrem(margin, 100 auto);

      .btn {
        @include pxrem(width, 200);
        @include pxrem(height, 80);
        @include pxrem(line-height, 80);
        text-align: center;
        @include pxrem(border-radius, 10);
        @include pxrem(font-size, 26);
      }

      .saveBtn {
        float: left;
        background-color: #1296db;
        color: #fff;
      }
      .cancelBtn {
        float: right;
        background-color: #ccc;
      }
    }

    .tips {
      position: absolute;
      z-index: 10000;
      top: 70%;
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
  }
</style>
