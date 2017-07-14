<template lang="html">
    <ul id="carPosition">
      <li class="company-list">公司：<span class="company">{{carDetail.unitName}}</span></li>
      <li class="platform-list">接入平台：<span class="platform">{{carDetail.platformName}}</span></li>
      <li class="newest-position-list">最新定位位置：<span class="newest-position">{{carDetail.location}}</span></li>
    </ul>
</template>
<script lang="babel">
    import {mapState} from 'vuex'
    export default {
      data () {
        return {

        }
      },
      created () {
        console.log(this.carDetail);
      },
      computed: {
        ...mapState([
          'carDetail'
        ])
      },
      methods: {

      }
    }
</script>
<style lang="scss" scoped="" type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';

  #carPosition {
    @include pxrem(font-size,26);

    li {
      @include pxrem(padding, 15 0);
      color: #3e3d3d;
      span {
        color: #666;
      }
    }


  }
</style>
