<template lang="html">
    <div id="alarmCar">
      <div class="searchBox">
        <input type="text" class="search-input" placeholder="搜车牌号" v-model="platNum"/>
        <div class="searchBtn">
          <img src="./img/magnify.png" alt="" id="searchBtn" @click="searchPlat()"/>
        </div>
      </div>
      <div id="alarmMapPanel"></div>

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
          platNum: '', // 搜索的车牌号关键词
          myPoint: {
            lng: 0, // 纬度
            lat: 0 // 经度
          },
          tips: '请至少输入四位要查询的车牌号！',
          tipShow: false,
          map: null,
          opts: {
            width : 600,     // 信息窗口宽度
            //height: 500,     // 信息窗口高度
            title : "信息窗口" , // 信息窗口标题
            enableMessage:true//设置允许信息窗发送短息
          }
        }
      },
      computed: {
        ...mapState([
          'userInfo'
        ]),
      },
      methods: {
        getMyPosition () {
          var _this = this; // 单独保存this
          this.map = new BMap.Map("alarmMapPanel");    // 创建Map实例
          //map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
          //map.addControl(new BMap.NavigationControl());
          //map.centerAndZoom("四川",12);       // 设置地图显示的城市 此项是必须设置的
          this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
          this.map.enablePinchToZoom(true);    //启用双指操作缩放

          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
              // Icon类表示覆盖物所使用的图标
              var myIcon = new BMap.Icon('./static/img/local.png',new BMap.Size(137,62));
              // Marker类表示地图上一个图像标注
              var marker = new BMap.Marker(r.point,{icon:myIcon});
              //添加一个覆盖物
              _this.map.addOverlay(marker);
              //map.panTo(r.point,16);
              _this.map.centerAndZoom(r.point, 16);
              console.log('您的位置：'+r.point.lng+','+r.point.lat);
              // 保存我的位置信息
              _this.myPoint.lng = r.point.lng;
              _this.myPoint.lat = r.point.lat;
              console.log(_this.myPoint);
              // 获取附近的报警的车的信息并标记在地图上
              _this.getAlarmPoint();
            }
            else {
              alert('failed'+this.getStatus());
            }
          },{enableHighAccuracy: true});
        },
        // 获取附近报警车辆
        getAlarmPoint () {
          var _this = this;
          // 参数：经度纬度、用户id
          var postData = {
            lng: _this.myPoint.lng,
            lat:  _this.myPoint.lat,
            userId: _this.userInfo.userId
          };

          /*axios.post('', postData).then(res => {
           if (res.code == 0) {

           }
           }).catch(error => {
           console.log(error);
           });*/
          // 收到点的位置信息并标记出来
          var nearData = [
            {
              carNum: "湘AE3333",
              option: {
                lng: _this.myPoint.lng + Math.random() / 100,
                lat: _this.myPoint.lat - Math.random() / 1000,
                zIndex: 100,
                UnitName: "网阔信息111", // 所属企业
                PlatformName: "成都网阔信息技术股份有限公司", // 接入平台
                Location: "四川省成都市都江堰市都江堰市徐渡小学西南319米",
                SpeedCvt: "60",
                LimitSpeed: "40",
                alarmType: "超速",
                GPSDateCvt: "2017-6-20",
                carType: '危险品1',
                carColor: '黄',
                carPlat: '川A5434'
              }
            },
            {
              carNum: "湘AE3333",
              option: {
                lng: _this.myPoint.lng + Math.random() / 100,
                lat: _this.myPoint.lat - Math.random() / 1000,
                zIndex: 100,
                UnitName: "网阔信息222", // 所属企业
                PlatformName: "成都网阔信息技术股份有限公司", // 接入平台
                Location: "四川省成都市都江堰市都江堰市徐渡小学西南319米",
                SpeedCvt: "60",
                LimitSpeed: "40",
                alarmType: "2-5点运行报警",
                GPSDateCvt: "2017-6-20",
                carType: '危险品2',
                carColor: '黄',
                carPlat: '川A5434'
              }
            }
          ];

          for (var i in nearData) {
            var option = nearData[i].option;
            console.log(option);
            var myIcon = new BMap.Icon("./static/img/alarmCar.png", new BMap.Size(24,24));// 搜索到的车辆定位图标
            var marker = new BMap.Marker(new BMap.Point(option.lng,option.lat),{icon:myIcon});// 创建标注
            _this.map.addOverlay(marker);
            var html = '<div class="map-info-win"><table>' +
              "<tr><td>所属企业：</td><td>" + option.UnitName + '</td></tr>' +
              "<tr><td>所属接入平台：</td><td>" + option.PlatformName + '</td></tr>' +
              '<tr><td>地址：</td><td>' + option.Location + '</td></tr>' +
              "<tr><td>速度/限速值：</td><td>" + option.SpeedCvt + "/" + option.LimitSpeed + ' km/h</td></tr>' +
              '<tr><td>报警类型：</td><td>' + option.alarmType + '</td></tr>' +
              '<tr><td>报警时间：</td><td>' + option.GPSDateCvt + '</td></tr>' +
              "</table></div>";
            _this.addClickHandler(html,marker,new BMap.Point(option.lng,option.lat));
          }
        },
        addClickHandler (content,marker,point) {
          var _this = this;
          marker.addEventListener("click",function(){
            var infoWindow = new BMap.InfoWindow(content, _this.opts);  // 创建信息窗口对象
            _this.map.openInfoWindow(infoWindow,point); //开启信息窗口
          });
        },
        // 精准搜索报警车辆
        searchPlat () {
          var _this = this;
          var keyWords = this.platNum;
          if (keyWords.length < 4) {
            this.tips = '请至少输入四位要查询的车牌号！';
            this.tipShow = true;
            setTimeout(function(){
              _this.tipShow = false;
            }, 1000);
          } else {
            // 参数: 车牌号、用户id
            let postData = {
              keyWords: keyWords,
              userId: _this.userInfo.userId
            };
            // 1. 有结果 准确搜索
            // 拿到搜到的点的信息(注意，可能有多个,这里暂时只做一个的),例如
            var data = {
              carNum: "湘AE3333",
              option: {
                lng: 104.07946,
                lat: 30.50325,
                zIndex: 100,
                UnitName: "网阔信息", // 所属企业
                PlatformName: "成都网阔信息技术股份有限公司", // 接入平台
                Location: "四川省成都市都江堰市都江堰市徐渡小学西南319米",
                SpeedCvt: "60",
                LimitSpeed: "40",
                alarmType: "2-5点运行报警",
                GPSDateCvt: "2017-6-20",
                carType: '危险品',
                carColor: '橙',
                carPlat: '川A5434',
                corporation: '成都王阔信息技术股份有限公司'
              }
            };
            var option = data.option;
            var myIcon = new BMap.Icon("./static/img/resultCar.png", new BMap.Size(22,33));// 搜索到的车辆定位图标
            var marker = new BMap.Marker(new BMap.Point(option.lng,option.lat),{icon:myIcon});// 创建标注
            _this.map.addOverlay(marker);
            _this.map.centerAndZoom(new BMap.Point(option.lng,option.lat), 16);
            var carDetailObj = {
              carId: option.carId,
              carType: option.carType,
              carPlat: option.carPlat,
              carColor: option.carColor,
              unitName: option.UnitName,
              platformName: option.PlatformName,
              location: option.Location,
              corporation: option.corporation
            };
            var html = '<div class="map-info-win"><table>' +
              "<tr><td>所属企业：</td><td>" + option.UnitName + '</td></tr>' +
              "<tr><td>所属接入平台：</td><td>" + option.PlatformName + '</td></tr>' +
              '<tr><td>地址：</td><td>' + option.Location + '</td></tr>' +
              "<tr><td>速度/限速值：</td><td>" + option.SpeedCvt + "/" + option.LimitSpeed + ' km/h</td></tr>' +
              '<tr><td>报警类型：</td><td>' + option.alarmType + '</td></tr>' +
              '<tr><td>报警时间：</td><td>' + option.GPSDateCvt + '</td></tr>' +
              "</table></div>";
            // 查询到的结果直接在页面上通过infoWindow显示出来
            var infoWindow = new BMap.InfoWindow(html, _this.opts);  // 创建信息窗口对象
            _this.map.openInfoWindow(infoWindow,new BMap.Point(option.lng,option.lat)); //开启信息窗口

            _this.addClickHandler(html,marker,new BMap.Point(option.lng,option.lat));

            // 2.无结果
            /*this.tips = '未查询到相关结果！';
             this.tipShow = true;
             setTimeout(function(){
             _this.tipShow = false;
             }, 1000);*/

            /*axios.post('', postData).then(res => {

             // 1. 有结果 准确搜索
             // 拿到搜到的点的信息(注意，可能有多个,这里暂时只做一个的),例如
             var data = {
             carNum: "湘AE3333",
             option: {
             lng: 104.07946,
             lat: 30.50325,
             zIndex: 100,
             UnitName: "网阔信息", // 所属企业
             PlatformName: "成都网阔信息技术股份有限公司", // 接入平台
             Location: "四川省成都市都江堰市都江堰市徐渡小学西南319米",
             SpeedCvt: "60",
             LimitSpeed: "40",
             alarmType: "2-5点运行报警",
             GPSDateCvt: "2017-6-20",
             carType: '危险品',
             carColor: '橙',
             carPlat: '川A5434'
             }
             };
             var option = data.option;
             var myIcon = new BMap.Icon("./static/img/resultCar.png", new BMap.Size(22,33));// 搜索到的车辆定位图标
             var marker = new BMap.Marker(new BMap.Point(option.lng,option.lat),{icon:myIcon});// 创建标注
             _this.map.addOverlay(marker);
             _this.map.centerAndZoom(new BMap.Point(option.lng,option.lat), 16);
             var carDetailObj = {
             carId: option.carId,
             carType: option.carType,
             carPlat: option.carPlat,
             carColor: option.carColor,
             unitName: option.UnitName,
             platformName: option.PlatformName,
             location: option.Location
             };
             var html = '<div class="map-info-win"><table>' +
             "<tr><td>所属企业：</td><td>" + option.UnitName + '</td></tr>' +
             "<tr><td>所属接入平台：</td><td>" + option.PlatformName + '</td></tr>' +
             '<tr><td>地址：</td><td>' + option.Location + '</td></tr>' +
             "<tr><td>速度/限速值：</td><td>" + option.SpeedCvt + "/" + option.LimitSpeed + ' km/h</td></tr>' +
             '<tr><td>报警类型：</td><td>' + option.alarmType + '</td></tr>' +
             '<tr><td>报警时间：</td><td>' + option.GPSDateCvt + '</td></tr>' +
             "</table></div>";
             // 查询到的结果直接在页面上通过infoWindow显示出来
             var infoWindow = new BMap.InfoWindow(html);  // 创建信息窗口对象
             _this.map.openInfoWindow(infoWindow,new BMap.Point(option.lng,option.lat)); //开启信息窗口

             _this.addClickHandler(html,marker,new BMap.Point(option.lng,option.lat));

             // 2.无结果
             this.tips = '未查询到相关结果！';
             this.tipShow = true;
             setTimeout(function(){
             _this.tipShow = false;
             }, 1000);
             }).catch(error => {
             console.log(error);
             });*/
          }
        }
      },
      mounted () {
        var _this = this;
        this.$nextTick(function(){
          _this.getMyPosition();
        });
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

    .tips {
      position: absolute;
      z-index: 10000;
      top: 35%;
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
