<template lang="html">
    <div id="index">
      <!--<p class="title">地图操作</p>-->
      <div class="nearCar" :class="{'tabActive': $route.path.indexOf('/nearCar')}">
        <router-link to="/index/nearCar">
          <p class="text">附近</p>
        </router-link>
      </div>
      <div class="alarmCar" :class="{'tabActive': $route.path.indexOf('/alarmCar')}">
        <router-link to="/index/alarmCar">
          <p class="text">报警</p>
        </router-link>
      </div>

      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
</template>
<script lang="babel">
  export default {
    name: 'index',
    data () {
      return {

      }
    }
  }
</script>
<style lang="scss" scoped="" type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';
  @import '../../assets/scss/base.scss';

  #index {
    width: 100%;
    height: 100%;
    position: fixed; /*这里固定就不会随着滚动条滚动了*/

    .nearCar, .alarmCar {
      @include pxrem(width, 80);
      @include pxrem(height, 80);
      position: absolute;
      z-index: 1000;
      @include pxrem(right, 30);
      background-color: #fff;
      @include pxrem(border-radius, 5);

      a {
        display: block;
        width: 100%;
        height: 100%;

        .text {
          width: 100%;
          position: absolute;
          @include pxrem(top, 45);
          @include pxrem(left, 0);
          text-align: center;
          @include pxrem(font-size, 22);
        }
      }
    }

    .nearCar {
      @include pxrem(top, 200);

      a {
        background: url('./img/magnify.png') no-repeat;
        @include pxrem(background-position, 20 8);
        @include pxrem(background-size, 40 40);
      }
    }

    .alarmCar {
      @include pxrem(top, 310);

      a {
        background: url('./img/magnify.png') no-repeat;
        @include pxrem(background-position, 20 8);
        @include pxrem(background-size, 40 40);
      }
    }

    /*active*/
    .nearCar.tabActive {
      a {
        background: url('./img/nearActive.png') no-repeat;
        @include pxrem(background-position, 20 8);
        @include pxrem(background-size, 40 40);
      }
    }

    .alarmCar.tabActive {
      a {
        background: url('./img/magnify.png') no-repeat;
        @include pxrem(background-position, 20 8);
        @include pxrem(background-size, 40 40);
      }
    }

  }


</style>
