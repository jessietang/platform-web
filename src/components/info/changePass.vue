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
    export default {
      data () {
        return {
          oldPass: '',
          newPass: '',
          surePass: '',
          tips: '',
          tipShow: false
        }
      },
      computed: {
        ...mapState([
          'userInfo'
        ])
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
                oldPass: _this.oldPass,
                newPass: _this.newPass,
                userId: _this.userInfo.userId
              };
              // 1.旧密码不对
              /*tips = '您的旧密码不对，请重新填写！';
              _this.showTips(tips);*/

              // 2.修改失败，未知情况
              tips = '您的旧密码不对，请重新填写！';
              _this.showTips(tips);

              // 3.修改成功
              tips = '密码已修改成功！';
              _this.showTips(tips);
              // 输入框置空
              _this.oldPass = '';
              _this.newPass = '';
              _this.surePass = '';

            }
          } else {
            tips = '输入框未全部填完，请填写！';
            _this.showTips(tips);
          }
        }
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
