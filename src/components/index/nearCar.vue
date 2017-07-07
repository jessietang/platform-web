<template lang="html">
    <div id="nearCar">
      <div class="searchBox">
        <input type="text" class="search-input" placeholder="搜车牌号、运管机构"/>
        <div class="searchBtn">
          <img src="./img/magnify.png" alt="" id="searchBtn"/>
        </div>
      </div>
      <div id="nearMapPannel"></div>

      <!--popup start-->
      <div class="popUp" :class="{'popUpShow': isOpenPopUp}">
        <!--做一块空白区域来绑定点击事件，关闭popup-->
        <div class="popKongBai" @click="closePopUp"></div>
        <div class="popBody">
          <!--header start-->
          <div class="popUpHeader">
            <div class="leftHeader">
              <div class="navHeader">
                <img src="./img/magnify.png" alt=""/>
                <p class="carType">货车</p>
              </div>
              <div class="navDetail">
                <span class="plateNum">川A4444</span>
                <span class="carColor">黄</span>
              </div>
            </div>

            <div class="rightHeader">
              <div class="carCircle carPosition" :class="{'activeCircle': $route.path === '/index/nearCar/carPosition'}">
                <router-link to="/index/nearCar/carPosition">
                  <p class="text">定位</p>
                </router-link>
              </div>
              <div class="carCircle carTrail" :class="{'activeCircle': $route.path === '/index/nearCar/carTrail'}">
                <router-link to="/index/nearCar/carTrail">
                  <p class="text">轨迹</p>
                </router-link>
              </div>
            </div>
          </div><!--header end-->

          <!--content-->
          <div class="popUpContent">
            <router-view></router-view>
          </div>
        </div>
      </div><!--popup end-->
    </div>
</template>
<script lang="babel">
  import $ from 'n-zepto'
  import axios from 'axios'

    export default {
      data () {
        return {
          isOpenPopUp: false, // popup默认关闭 点击页面上的某一个点才显示popup
        }
      },
      created () {

      },
      methods: {
        getMap () {
          var map = new BMap.Map("nearMapPannel");    // 创建Map实例
          //map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
          //map.addControl(new BMap.NavigationControl());
          map.centerAndZoom("四川",12);       // 设置地图显示的城市 此项是必须设置的
          map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
          map.enablePinchToZoom(true);    //启用双指操作缩放

          /*axios.get('http://xapi.hcxdi.com/truck/coupon/countRecommendedDownloadRecord', {}).then(res => {
            let rest = res.data.data
            alert(rest);
          }).catch(error => {
            console.log(error)
          })*/

        },
        closePopUp () {
          this.isOpenPopUp = false //
          alert(this.isOpenPopUp);
        }
      },
      mounted () {
        this.getMap()
      }
    }
</script>
<style lang="scss" scoped="" type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';
  #nearCar {
    width: 100%;
    height: 100%;

    .searchBox {
      position: absolute;
      z-index: 10;
      @include pxrem(width, 650);
      @include pxrem(height, 100);
      @include pxrem(top, 40);
      @include pxrem(left, 50);
      @include pxrem(margin, 0 auto);

      .search-input {
        width: 100%;
        height: 100%;
        @include pxrem(border-radius, 10);
        border: 1px solid #eee;
        background-color: #fff;
        @include pxrem(font-size, 34);
        @include pxrem(padding-left, 20);
      }
      @include input-placeholder-color(#808080);

      .searchBtn {
        @include pxrem(width, 100);
        @include pxrem(padding, 0 20);
        @include pxrem(height, 60);
        position: absolute;
        right: 0;
        @include pxrem(top, 20);
        border-left: 1px solid #eee;

        img {
          @include pxrem(width, 60);
          @include pxrem(height, 60);
        }
      }
    }
    .popUp {
      display: none;
      position: fixed;
      width: 100%;
      height: calc(100% - 1.33333rem);
      background: rgba(250,250,250,.5);
      top: 0;
      left: 0;
      z-index: 1001;

      .popKongBai {
        width: 100%;
        height: calc(100% - 5.33333rem);
        position: absolute;
        top: 0;
        left: 0;
      }

      .popBody {
        width: 100%;
        @include pxrem(height, 400);
        @include pxrem(padding, 10 30);
        position: absolute;
        left: 0;
        @include pxrem(bottom, 0);
        background-color: #fff;
        border-bottom: 1px solid #e3e3e3;

        .popUpHeader {
          @extend %flex-left;
          @include pxrem(height, 100);
          border-bottom: 1px solid #eee;

          .leftHeader {
            width: 60%;
            @extend %flex-left;

            .navHeader {
              img {
                @include pxrem(width, 30);
                @include pxrem(height, 30);
              }
              .carType {
                text-align: left;
                @include pxrem(font-size, 20);
              }
            }

            .navDetail {
              width: 80%;
              @include pxrem(font-size,40);
              .plateNum {
                display: inline-block;
                width: 60%;
                text-align: center;
              }
            }

          }

          .rightHeader {
            width: 40%;
            @extend %flex-left;

            .carCircle {
              @include pxrem(width, 80);
              @include pxrem(height, 80);
              @include pxrem(border-radius,40);
              background-color: #e3e3e3;

              a {
                display: block;
                @include pxrem(width, 80);
                @include pxrem(height, 80);
                @include pxrem(border-radius,40);
                color: #fff;
                position: relative;

                .text {
                  width: 100%;
                  position: absolute;
                  @include pxrem(top, 40);
                  @include pxrem(left, 0);
                  text-align: center;
                  @include pxrem(font-size, 22);
                }
              }
            }
            .carPosition {
              @include pxrem(margin-left, 50);
              a {
                background: url('./img/nearActive.png') no-repeat;
                @include pxrem(background-position, 25 8);
                @include pxrem(background-size, 30 30);
              }
            }
            .carTrail {
              @include pxrem(margin-left, 30);
              a {
                background: url('./img/nearActive.png') no-repeat;
                @include pxrem(background-position, 25 8);
                @include pxrem(background-size, 30 30);
              }
            }
            .carPosition.activeCircle {
              a {
                background-color: blue;
                background: url('./img/nearActive.png') no-repeat;
                @include pxrem(background-position, 25 8);
                @include pxrem(background-size, 30 30);
              }
            }
            .carTrail.activeCircle {
              a {
                background-color: blue;
                background: url('./img/nearActive.png') no-repeat;
                @include pxrem(background-position, 25 8);
                @include pxrem(background-size, 30 30);
              }
            }
          }
        }

        .popUpContent {
          @include pxrem(padding, 20 0);
        }
      }


    }
    .popUpShow {
      display: block;
    }
  }

  #nearMapPannel {
    position: relative;
    width: 100%;
    height: 100%;
    /*@include pxrem(padding-top, 190);
    @include pxrem(margin-bottom, 100);
    @include pxrem(height, 930);*/
    z-index: -1;
  }
</style>
