<template lang="html">
    <div id="nearCar">
      <div class="searchBox">
        <input type="text" class="search-input" placeholder="搜车牌号" v-model="platNum"/>
        <div class="searchBtn">
          <img src="./img/magnify.png" alt="" id="searchBtn" @click="searchPlat()"/>
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
                <img src="./img/dangerCar.png" alt=""/>
                <p class="carType">{{carDetail.carType}}</p>
              </div>
              <div class="navDetail">
                <span class="plateNum">{{carDetail.carPlat}}</span>
                <span class="carColor">{{carDetail.carColor}}</span>
              </div>
            </div>

            <div class="rightHeader">
              <div class="carCircle carPosition" :class="{'activeCircle': $route.path === '/web/index/nearCar/carPosition'}">
                <router-link :to="{path: '/web/index/nearCar/carPosition'}">
                </router-link>
              </div>
              <div class="carCircle carTrail" :class="{'activeCircle': $route.path === '/web/index/nearCar/carTrail'}">
                <router-link to="/web/index/nearCar/carTrail">
                </router-link>
              </div>
            </div>
          </div><!--header end-->

          <!--content-->
          <div class="popUpContent">
            <!--v-on:drawTrack 父组件自定义事件 注意是@drawTrack="drawTrack" 而不是 @drawTrack="drawTrack(data)"-->
            <router-view @drawTrack="drawTrack"></router-view>
          </div>
        </div>
      </div><!--popup end-->

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
          platNum: '', // 搜索车牌号关键字
          isOpenPopUp: false, // popup默认关闭 点击页面上的某一个点才显示popup
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
      created () {
        console.log(this.userInfo);
      },
      computed: {
        ...mapState([
          'userInfo',
          'carDetail'
        ]),
      },
      methods: {
        // 获取我的位置并在地图上标记出来
        getMyPosition () {
          var _this = this; // 单独保存this
          this.map = new BMap.Map("nearMapPannel");    // 创建Map实例
          //map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
          //map.addControl(new BMap.NavigationControl());
          //map.centerAndZoom("四川",12);       // 设置地图显示的城市 此项是必须设置的
          this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
          this.map.enablePinchToZoom(true);    //启用双指操作缩放

          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
              // Icon类表示覆盖物所使用的图标
              var myIcon = new BMap.Icon('../../../static/img/local.png',new BMap.Size(137,62));
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
              // 获取附近的车的信息并标记在地图上
              _this.getNearPosition();
            }
            else {
              alert('failed'+this.getStatus());
            }
          },{enableHighAccuracy: true});
        },
        // 获取附近的车
        getNearPosition () {
          var _this = this;
          // 参数：我的lng、lat, userId
          var postData = {
            lng: _this.myPoint.lng,
            lat: _this.myPoint.lat,
            userId:_this.userInfo.userId
          };
          console.log(postData);

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
                carId: 1,
                zIndex: 100,
                UnitName: "网阔信息1111", // 所属企业
                PlatformName: "成都网阔信息技术股份有限公司", // 接入平台
                Location: "四川省成都市都江堰市都江堰市徐渡小学西南319米",
                SpeedCvt: "60",
                LimitSpeed: "40",
                alarmType: "超速",
                GPSDateCvt: "2017-6-20",
                carType: '危险品1',
                carColor: '黄',
                carPlat: '川A5434',
                corporation: '成都王阔信息技术股份有限公司'
              }
            },
            {
              carNum: "湘AE3333",
              option: {
                lng: _this.myPoint.lng + Math.random() / 100,
                lat: _this.myPoint.lat - Math.random() / 1000,
                carId: 2,
                zIndex: 100,
                UnitName: "网阔信息2222", // 所属企业
                PlatformName: "成都网阔信息技术股份有限公司", // 接入平台
                Location: "四川省成都市都江堰市都江堰市徐渡小学西南319米",
                SpeedCvt: "60",
                LimitSpeed: "40",
                alarmType: "2-5点运行报警",
                GPSDateCvt: "2017-6-20",
                carType: '危险品2',
                carColor: '红',
                carPlat: '川A1234',
                corporation: '成都王阔信息技术股份有限公司'
              }
            }
          ];

          for (let i in nearData) {
            var option = nearData[i].option;
            console.log(option);
            var myIcon = new BMap.Icon("../../../static/img/nearCar.png", new BMap.Size(36,36));// 搜索到的车辆定位图标
            let marker = new BMap.Marker(new BMap.Point(option.lng,option.lat),{icon:myIcon});// 创建标注
            _this.map.addOverlay(marker);

            // 开始是下面这样写的，然后就一直取到的是循环结束后的最后一个值的信息，找了好久，
            // 最开始以为是闭包导致的，但是同时也在想，carPosition.vue里面也是类似的写法，那边可以，这里却不行。
            // 后来想通了，下面这种写法的话，相当于carDetailObj是个全局变量了，页面上会在循环的时候就改变值，以至于循环结束之后，
            // 拿到的是最后一个值，页面上渲染的也总是最后一个值。
            /*_this.carDetailObj.carId = option.carId;
            _this.carDetailObj.carType = option.carType;
            _this.carDetailObj.carColor = option.carColor;
            _this.carDetailObj.carPlat = option.carPlat;
            _this.carDetailObj.unitName = option.UnitName;
            _this.carDetailObj.platformName = option.PlatformName;
            _this.carDetailObj.location = option.Location;*/
            //let carDetailObj = _this.carDetailObj;

            // 正确写法
            // carDetailObj作为局部变量
            var carDetailObj = {
              carId: option.carId,
              carType: option.carType,
              carPlat: option.carPlat,
              carColor: option.carColor,
              unitName: option.UnitName,
              platformName: option.PlatformName,
              location: option.Location,
              corporation: option.corporation
            }
            console.log(carDetailObj);
            _this.addClickHandler(marker, carDetailObj);
          }

        },
        addClickHandler (marker, carDetailObj) {
          var _this = this;
          marker.addEventListener("click",function(){
            _this.$router.push({
              path: '/web/index/nearCar/carPosition'
            });
            _this.isOpenPopUp = true;
            // 把车的详细信息保存到store里面,而不是通过query传递，这样防止在切换定位和轨迹的时候丢失数据
            _this.$store.dispatch('saveCarInfo', carDetailObj);
          });
        },
        // 精确搜索（一个值）
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
            // 参数：车牌号 、用户id
            let postData = {
              keyWords: keyWords,
              userId: _this.userInfo.userId
            };
            // 1. 有结果
            // 拿到搜到的点的信息(注意，可能有多个,这里暂时只做一个的),例如
            var data = {
              carNum: "湘AE3333",
              option: {
                lng: _this.myPoint.lng + Math.random() / 100,
                lat: _this.myPoint.lat - Math.random() / 1000,
                carId: 3,
                zIndex: 100,
                UnitName: "网阔信息3333", // 所属企业
                PlatformName: "成都网阔信息技术股份有限公司", // 接入平台
                Location: "四川省成都市都江堰市都江堰市徐渡小学西南319米",
                SpeedCvt: "60",
                LimitSpeed: "40",
                alarmType: "超速",
                GPSDateCvt: "2017-6-20",
                carType: '危险品3',
                carColor: '绿',
                carPlat: '川A0000',
                corporation: '成都王阔信息技术股份有限公司'
              }
            };
            var option = data.option;
            var myIcon = new BMap.Icon("../../../static/img/resultCar.png", new BMap.Size(22,33));// 搜索到的车辆定位图标
            var marker = new BMap.Marker(new BMap.Point(option.lng,option.lat),{icon:myIcon});// 创建标注
            _this.map.addOverlay(marker);
            _this.map.centerAndZoom(new BMap.Point(option.lng,option.lat), 16);
            // carDetailObj作为局部变量
            var carDetailObj = {
              carId: option.carId,
              carType: option.carType,
              carPlat: option.carPlat,
              carColor: option.carColor,
              unitName: option.UnitName,
              platformName: option.PlatformName,
              location: option.Location,
              corporation: option.corporation // 所属营运商
            };
            // 搜到结果后就展开车辆的详细信息
            _this.isOpenPopUp = true;
            // 把车的详细信息保存到store里面,而不是通过query传递，这样防止在切换定位和轨迹的时候丢失数据
            _this.$store.dispatch('saveCarInfo', carDetailObj);
            _this.$router.push({
              path: '/web/index/nearCar/carPosition'
            });
            _this.addClickHandler(marker, carDetailObj);

            // 2.无结果
            /*this.tips = '未查询到相关结果！';
            this.tipShow = true;
            setTimeout(function(){
              _this.tipShow = false;
            }, 1000);*/

            /*axios.post('', postData).then(res => {
               let postData = {
               keyWords: keyWords
               };
               // 1. 有结果
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
                   GPSDateCvt: "2017-6-20",
                   carType: '危险品',
                   carColor: '黄',
                   carPlat: '川A5434'
                 }
               };
               var option = data.option;
               var myIcon = new BMap.Icon("../../../static/img/resultCar.png", new BMap.Size(22,33));// 搜索到的车辆定位图标
               var marker = new BMap.Marker(new BMap.Point(option.lng,option.lat),{icon:myIcon});// 创建标注
               _this.map.addOverlay(marker);
               _this.map.centerAndZoom(new BMap.Point(option.lng,option.lat), 16);
               _this.carDetailObj.carType = option.carType;
               _this.carDetailObj.carColor = option.carColor;
               _this.carDetailObj.carPlat = option.carPlat;
               _this.carDetailObj.unitName = option.UnitName;
               _this.carDetailObj.platformName = option.PlatformName;
               _this.carDetailObj.location = option.Location;
               _this.isOpenPopUp = true;
               // 把车的详细信息保存到store里面,而不是通过query传递，这样防止在切换定位和轨迹的时候丢失数据
               _this.$store.dispatch('saveCarInfo', _this.carDetailObj);
               _this.$router.push({
               path: '/web/index/nearCar/carPosition'
               })
               _this.addClickHandler(marker);

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
        },
        // 画历史轨迹图
        drawTrack (data, isShow) {
          var _this = this;
          _this.isOpenPopUp = isShow;
          console.log(data);
          var centerPoint;
          var car;   //汽车图标
          var label; //信息标签
          var timer;     //定时器
          var index = 0; //记录播放到第几个point
          var len = data.length;
          var points = [];
          for(var i in data){
            points.push(new BMap.Point(data[i].lng, data[i].lat))
          }

          /*{
            lng: 114.00250,
              lat: 22.550340,
            location: '成都市双流县航空港',
            direction: '正北方向',
            SpeedCvt: "60",
            LimitSpeed: "40",
            GPSDateCvt: "2017-7-13 13:53:12",
            receiveDate: "2017-7-13 13:53:30"
          }*/
          //通过DrivingRoute获取一条路线的point
          // DrivingRoute获取驾车路线规划方案
          var driving = new BMap.DrivingRoute(_this.map); // 当参数为地图实例时，检索位置由地图当前的中心点确定
          // driving.search(points[0], points[len-1]); //发起检索（起点，终点）
          driving.search(points[0], points[points.length-1]); //发起检索（起点，终点）
          // 设置检索结束后的回调函数
          driving.setSearchCompleteCallback(function() {
            //得到路线上的所有point
            //driving.getResults() 返回最近一次检索的结果，返回值DrivingRouteResult
            //DrivingRouteResult方法： getPlan(i:Number)返回索引指定的方案，索引0表示第一条方案 返回值RoutePlan
            //RoutePlanl类(表示一条驾车或步行出行方案)
            // RoutePlanl类 方法：getRoute(i: Number)返回值Route类型 返回方案中索引指定的线路
            // Route类的getPath()方法，返回路线的地理坐标点数组 返回值类型Array<Point>
            //points = driving.getResults().getPlan(0).getRoute(0).getPath();
            console.log(points);
            //画面移动到起点和终点的中间
            centerPoint = new BMap.Point((points[0].lng + points[points.length - 1].lng) / 2, (points[0].lat + points[points.length - 1].lat) / 2);
            _this.map.panTo(centerPoint);
            //连接所有点
            // Polyline使用浏览器的矢量制图工具（如果可用）在地图上绘制折线的地图叠加层
            _this.map.addOverlay(new BMap.Polyline(points, {strokeColor: "black", strokeWeight: 5, strokeOpacity: 1}));

            //显示小车子
            // Label此类表示地图上的文本标注
            label = new BMap.Label("", {offset: new BMap.Size(10, -30)});
            var myIcon = new BMap.Icon("../../../static/img/nearCar.png", new BMap.Size(36,36));// 搜索到的车辆定位图标
            car = new BMap.Marker(points[0], {icon: myIcon}); // 创建Marker实例
            car.setLabel(label); // 为标注添加文本标注
            _this.map.addOverlay(car);

            // 播放
            play();
            function play() {
              var point = points[index];
              console.log(index);
              if(index > 0) {
                _this.map.addOverlay(new BMap.Polyline([points[index - 1], point], {strokeColor: "#83c2ec", strokeWeight: 1, strokeOpacity: 1}));
              }
              // 点标记跟踪
              if (index > -1 && index < points.length){
                var html = '<div class="map-info-win"><table>' +
                  "<tr><td>所属企业：</td><td>" + _this.carDetail.unitName + '</td></tr>' +
                  "<tr><td>所属营运商：</td><td>" + _this.carDetail.corporation + '</td></tr>' +
                  "<tr><td>速度/限速值：</td><td>" + data[index].SpeedCvt + "/" + data[index].LimitSpeed + ' km/h</td></tr>' +
                  "<tr><td>车辆类型：</td><td>" + _this.carDetail.carType + '</td></tr>' +
                  "<tr><td>接入平台：</td><td>" + _this.carDetail.platformName + '</td></tr>' +
                  '<tr><td>地址：</td><td>' + data[index].location + '</td></tr>' +
                  '<tr><td>定位时间：</td><td>' + data[index].GPSDateCvt + '</td></tr>' +
                  '<tr><td>接收时间：</td><td>' + data[index].receiveDate + '</td></tr>' +
                  "</table></div>";
                var myIcon2 = new BMap.Icon("../../../static/img/bullet.png", new BMap.Size(12,12));// 搜索到的车辆定位图标
                var marker = new BMap.Marker(points[index], {icon: myIcon2}); // 创建Marker实例
                _this.map.addOverlay(marker);
                // 给轨迹上的每一个点绑定点击开启信息窗口的事件
                marker.addEventListener("click",function(){
                  console.log(point);
                  var infoWindow = new BMap.InfoWindow(html, _this.opts);  // 创建信息窗口对象
                  _this.map.openInfoWindow(infoWindow, point); //开启信息窗口
                });
              }
              //label.setContent("经度: " + point.lng + "<br>纬度: " + point.lat);
              car.setPosition(point); // 设置标注的地理坐标
              index++;
              // 画面跟随
              // _this.map.panTo(point);
              // alert(points.length);
              if(index < points.length) {
                console.log('index:'+index);
                timer = window.setTimeout(play, 100); // 在函数内部通过setTimeout再次调用函数本身，达到setInterval类似的的效果
              } else {
                _this.map.panTo(point);
              }
            }

          });
        },
        closePopUp () {
          this.isOpenPopUp = false //
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
        -webkit-box-shadow: 0 0 0 #eee,
        0 0 0 #eee,
        0 -1px 3px #bbb5b5, /*上*/
        0 0 0 #eee;
        -moz-box-shadow: 0 0 0 #eee,
        0 0 0 #eee,
        0 -1px 3px #bbb5b5, /*上*/
        0 0 0 #eee;
        box-shadow: 0 0 0 #eee,
        0 0 0 #eee,
        0 -1px 3px #bbb5b5, /*上*/
        0 0 0 #eee;

        .popUpHeader {
          @extend %flex-left;
          @include pxrem(height, 100);
          border-bottom: 1px solid #eee;

          .leftHeader {
            width: 70%;
            @extend %flex-left;

            .navHeader {
              text-align: center;
              img {
                @include pxrem(width, 44);
                @include pxrem(height, 30);
              }
              .carType {
                text-align: left;
                @include pxrem(font-size, 20);
              }
            }

            .navDetail {
              width: 65%;
              @include pxrem(font-size,40);
              @include pxrem(margin-left,10);
              .plateNum {
                display: inline-block;
                width: 60%;
                text-align: center;
              }
            }

          }

          .rightHeader {
            width: 30%;
            @extend %flex-center;

            .carCircle {
              @include pxrem(width, 40);
              @include pxrem(height, 40);

              a {
                display: block;
                @include pxrem(width, 40);
                @include pxrem(height, 40);
              }
            }
            .carPosition {
              @include pxrem(margin-left, 80);
              a {
                background: url('./img/position.png') center center no-repeat;
                @include pxrem(background-size, 40 40);
              }
            }
            .carTrail {
              @include pxrem(margin-left, 50);
              a {
                background: url('./img/trail.png') center center no-repeat;
                @include pxrem(background-size, 40 40);
              }
            }
            .carPosition.activeCircle {
              a {
                background-color: blue;
                background: url('./img/positionActive.png') center center no-repeat;
                @include pxrem(background-size, 40 40);
              }
            }
            .carTrail.activeCircle {
              a {
                background-color: blue;
                background: url('./img/trailActive.png') center center no-repeat;
                @include pxrem(background-size, 40 40);
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
