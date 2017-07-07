<template lang="html">
    <div id="alarmCar">
      <div class="searchBox">
        <input type="text" class="search-input" placeholder="搜车牌号、运管机构"/>
        <div class="searchBtn">
          <img src="./img/magnify.png" alt="" id="searchBtn"/>
        </div>
      </div>
      <div id="alarmMapPanel"></div>
    </div>
</template>
<script lang="babel">
  import axios from 'axios'
  import $ from 'n-zepto'
    export default {
      data () {
        return {

        }
      },
      methods: {
        getAlarmCar () {
          /*先渲染地图*/
          var map = new BMap.Map("alarmMapPanel");    // 创建Map实例
          //map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
          //map.addControl(new BMap.NavigationControl());
          map.centerAndZoom("成都",12);       // 设置地图显示的城市 此项是必须设置的
          map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
          map.enablePinchToZoom(true);    //启用双指操作缩放


          /*请求接口获取数据 并标记*/
          /*var paramData = {}
          axios.get('', paramData).then(res => {
            if (res.data.code == 0) { //
              let alarmData = res.data.data
              // 然后根据数据在地图上用marker进行标记,点击某个点要显示他的详细信息（这个详细信息是后台返回数据里面有的吧？？？）
              // 标记完成后，选取第一个点作为地图的中心点
              // map.centerAndZoom(r.point, 16);
            }
          }).catch(error => {
            console.log(error);
          })*/
        }
      },
      mounted () {
        this.getAlarmCar()
      }
    }
</script>
<style lang="scss" scoped="" type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';
  #alarmCar {
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
  }

  #alarmMapPanel {
    position: relative;
    width: 100%;
    height: 100%;
   /* @include pxrem(padding-top, 190);
    @include pxrem(margin-bottom, 100);
    @include pxrem(height, 930);*/
    z-index: -1;
  }
</style>
