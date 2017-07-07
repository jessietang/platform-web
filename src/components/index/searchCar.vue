<template lang="html">
    <div id="searchCar">
      <div class="searchContainer">
        <input type="text" class="searchBox" placeholder="请输入查询的车辆信息" v-model="searchKey"/>
        <div class="searchBtn">
          <img src="./img/magnify.png" alt="" id="searchBtn"/>
        </div>
      </div>
      <div id="searchMapPanel"></div>
    </div>
</template>
<script lang="babel">
    import axios from 'axios'
    import $ from 'n-zepto'
    export default {
      data () {
        return {
          searchKey: '',
        }
      },
      methods: {
        // 地图渲染
        getMap () {
          var map = new BMap.Map("searchMapPanel");    // 创建Map实例
          //map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
          //map.addControl(new BMap.NavigationControl());
          map.centerAndZoom("四川",12);       // 设置地图显示的城市 此项是必须设置的
          map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
          map.enablePinchToZoom(true);    //启用双指操作缩放
        }
      },
      mounted () {
        this.getMap()
        // 随机获取一些车
        /*let data = {}
        axios.get('', data).then(res => {
          if (res.data.code === 0) {
            let mapData = res.data.data
          }
        }).catch(error => {
          console.log(error)
        })*/
      }
    }
</script>
<style lang="scss" scoped="" type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';
  #searchCar {
    width: 100%;
    /*height: 100%;*/

    .searchContainer {
      @include pxrem(width, 590);
      @include pxrem(height, 67);
      @include pxrem(margin, 22 auto);
      position: relative;

      .searchBox {
        width: 100%;
        height: 100%;
        @include pxrem(border-radius,295);
        border: 1px solid #eee;
        background-color: #f9f9f9;
        text-align: center;
        @include pxrem(font-size, 27);
      }
      @include input-placeholder-color(#b5b5b5);

      .searchBtn {
        @include pxrem(width, 80);
        @include pxrem(padding, 0 10);
        @include pxrem(height, 36);
        position: absolute;
        right: 0;
        @include pxrem(top, 15);
        border-left: 1px solid #eee;

        img {
          @include pxrem(width, 60);
          @include pxrem(height, 36);
        }
      }
    }

    #searchMapPanel {
      position: relative;
      width: 100%;
      /*height: 100%;
      @include pxrem(padding-top, 190);
      @include pxrem(margin-bottom, 100);*/
      @include pxrem(height, 930);
      z-index: -1;
    }
  }
</style>
