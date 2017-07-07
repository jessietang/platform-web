<template lang="html">
    <div id="navBar">
      <ul class="navBar">
        <router-link to="/web/index/nearCar">
          <li class="navBarList" :class="{'activeRouter': $route.path.indexOf('/index') !== -1}"></li>
        </router-link>
        <router-link to="/web/report/analysis">
          <li class="navBarList" :class="{'activeRouter': $route.path.indexOf('/report') !== -1}"></li>
        </router-link>
        <router-link to="/web/module">
          <li class="navBarList" :class="{'activeRouter': $route.path.indexOf('/module') !== -1}"></li>
        </router-link>
        <router-link to="/web/info">
          <li class="navBarList" :class="{'activeRouter': $route.path.indexOf('/info') !== -1}"></li>
        </router-link>
      </ul>
    </div>
</template>
<script>
  export default {
    name: 'navBar',
    data () {
      return {

      }
    }
  }
</script>

<style lang="scss" scoped="" type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';
  #navBar {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;

    .navBar {
      width: 100%;
      @include pxrem(height, 100);
      @extend %flex-center;

      a {
        width: 25%;
        height: 100%;
        .navBarList {
          width: 100%;
          height: 100%;
        }
      }

      a:nth-child(1) .navBarList {
        background: url('./img/router1.png') no-repeat center center;
        @include pxrem(background-size, 50 50);
       }

      a:nth-child(2) .navBarList {
        background: url('./img/router2.png') no-repeat center center;
        @include pxrem(background-size, 50 50);
       }

      a:nth-child(3) .navBarList {
        background: url('./img/router3.png') no-repeat center center;
        @include pxrem(background-size, 50 50);
       }

      a:nth-child(4) .navBarList {
        background: url('./img/router4.png') no-repeat center center;
        @include pxrem(background-size, 50 50);
      }

      a:nth-child(1) .navBarList.activeRouter {
         background: url('./img/routerActive1.png') no-repeat center center;
       @include pxrem(background-size, 50 50);
       }

      a:nth-child(2) .navBarList.activeRouter {
         background: url('./img/routerActive2.png') no-repeat center center;
       @include pxrem(background-size, 50 50);
       }

      a:nth-child(3) .navBarList.activeRouter {
         background: url('./img/routerActive3.png') no-repeat center center;
       @include pxrem(background-size, 50 50);
       }

      a:nth-child(4) .navBarList.activeRouter {
        background: url('./img/routerActive3.png') no-repeat center center;
        @include pxrem(background-size, 50 50);
      }
    }
  }


</style>
