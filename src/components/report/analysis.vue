<template>
    <div id="analysis">
      <!--图表渲染-->
      <ul id="analysisReport">
        <li class="link-list" v-for="(item, index) in linkData"
            :class="{'tt-type': (item.zhuType === 0 && item.congType === 0), 'tf-type': ((item.zhuType === 0 && item.congType === 1) || (item.zhuType === 1 && item.congType === 0)), 'ff-type': (item.zhuType === 1 && item.congType === 1)}"
          @click="goDetail(item.platFormId)">
          <div class="platform-link-left"></div>
          <div class="platform-link-arrow"></div>
          <label class="platfrom-content-link-name">{{item.platName}}</label>
          <div class="lianlu-types">
            <div class="zhu">
              <img :src="getZhuType(item.zhuType)" alt=""/>
            </div>
            <div class="space"></div>
            <!--<span class="zhulinalu">{{getZhuType(item.zhuType)}}</span>-->
            <div class="cong">
              <img :src="getCongType(item.congType)" alt=""/>
            </div>
            <!--<span class="conglianlu">{{getCongType(item.congType)}}</span>-->
          </div>
        </li>
      </ul>
    </div>
</template>
<script lang="babel">
    import echarts from 'echarts'
    import axios from 'axios'
    import {mapState} from 'vuex'
    export default {
      data () {
        return {
          linkData: []
        }
      },
      created () {

      },
      computed: {
        ...mapState([
          'userInfo'
        ])
      },
      methods: {
        getZhuType (zhuType) {
          if (zhuType === 0) { // 通
            return './static/img/linkTong.png'
          } else {
            return './static/img/linkDuan.png'
          }
          return './static/img/linkTong.png'
        },
        getCongType (congType) {
          if (congType === 0) {
            return './static/img/linkTong.png'
          } else {
            return './static/img/linkDuan.png'
          }
          return './static/img/linkTong.png'
        },
        goDetail (platFormId) {
          var _this = this;
          _this.$router.push({
            path: '/platformDetail',
            query: {
              platFormId: platFormId,
              userId: _this.userInfo.userId
            }
          })
        },
        initData () {
          var _this = this;
          // 参数：userId
          var postData = {
            userId: _this.userInfo.userId
          };
          axios.post('/api/Platform/QueryPlatformSupervise', postData).then(res => {
            // 返回数据：接入平台id, 接入平台，主链路通断情况、从链路通断情况
            /*var res = {
              "code": 0,
              "data": [
                {
                  platFormId: 0,
                  zhuType: 0, // 连接
                  congType: 0, // 连接
                  platName: '安达通卫星定位服务平台'
                },
                {
                  platFormId: 1,
                  zhuType: 0, // 连接
                  congType: 1, // 断开
                  platName: '神州导航智慧北斗道路运输监控平台'
                },
                {
                  platFormId: 2,
                  zhuType: 1, // 断开
                  congType: 1, // 断开
                  platName: '四川安吉北斗卫星定位监控平台'
                }
              ]
            };*/
            var res = JSON.parse(res.data);
            if (res.code == 0) {
              if (res.data.length > 0) { // 有数据
                var receiveLinkData = res.data;
                // 按照断开在前连接在后排序后再展示
                var linkData = [];
                var dd = [], // 都断
                  dl = [], // 一个断一个连
                  ll = []; // 都连
                for (var i in receiveLinkData) {
                  if (receiveLinkData[i].zhuType === 1 && receiveLinkData[i].congType === 1) {
                    dd.push(receiveLinkData[i]);
                  } else if ((receiveLinkData[i].zhuType === 1 && receiveLinkData[i].congType === 0) || (receiveLinkData[i].zhuType === 0 && receiveLinkData[i].congType === 1)) {
                    dl.push(receiveLinkData[i]);
                  } else if (receiveLinkData[i].zhuType === 0 && receiveLinkData[i].congType === 0) {
                    ll.push(receiveLinkData[i]);
                  }
                }
                linkData = [].concat(dd, dl, ll);
                _this.linkData = linkData;
              } else {
                console.log('暂无数据');
              }
            } else {
              console.log(res.msg);
            }
          }).catch(error => {
            console.log(error);
          });
        }
      },
      mounted () {
        var _this = this;
        this.$nextTick(function(){
          _this.initData();
        });
      }
    }
</script>
<style lang="scss" scoped="" type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';
  @import '../../assets/scss/base.scss';

  #analysis {
    width: 100%;
    height: 100%;
    /*height: calc(100% - 1.46666rem);*/
  }

  #analysisReport {
    width: 95%;
    @include pxrem(margin, auto);
    height: 100%;

    .link-list {
      width: 100%;
      @include pxrem(height, 80);
      @include pxrem(margin-top, 20);
      position: relative;
      background-color: #eee;

      .platform-link-left {
        @include pxrem(width, 20);
        height: 100%;
        float: left;
      }

      .platform-link-arrow {
        position: absolute;
        @include pxrem(left, 20);
        @include pxrem(top, 30);
        border: 6px solid transparent;
        border-left-color: #002546;
      }

      .platfrom-content-link-name {
        float: left;
        @include pxrem(margin, 20 0 0 20);
        @include pxrem(font-size, 26);
      }

      .lianlu-types {
        float: right;
        @include pxrem(font-size, 20);
        @include pxrem(margin, 20 5 20 0);
        @extend %flex-left;

        .zhu, .cong {
          @include pxrem(width, 40);
          @include pxrem(height, 40);

          img {
            @include pxrem(width, 40);
            @include pxrem(height, 40);
          }
        }
        .space {
          width: 1px;
          @include pxrem(height, 40);
          border: 1px solid #b9aeae;
          @include pxrem(margin, 0 8 0 8);
        }
      }
    }

    /*主通从通*/
    .tt-type {
      .platform-link-left {
        background-color: #3dbeef;
      }

      .platform-link-arrow {
        border-left-color:#3dbeef
      }
    }

    /*主通从断*/
    .tf-type {
      .platform-link-left {
        background-color: #0056c0;
      }

      .platform-link-arrow {
        border-left-color: #0056c0;
      }
    }

    /*主断从断*/
    .ff-type {
      .platform-link-left {
        background-color: #fc5928;
      }

      .platform-link-arrow {
        border-left-color: #fc5928;
      }
    }
  }
</style>
