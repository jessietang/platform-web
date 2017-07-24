<template lang="html">
    <div id="alarmCar">
      <div class="searchBox">
        <input type="text" class="search-input" placeholder="搜车牌号" v-model="platNum" @keyup="showList()"/>
        <div class="searchBtn">
          <img src="./img/magnify.png" alt="" id="searchBtn" @click="searchPlat()"/>
        </div>
        <ul class="resultList" v-if="resultList.length > 0" :class="{'active': isActive}">
          <li class="list" v-for="list in resultList" @click="selectOne(list)">
            <span class="platNum">{{list.carPlat}}</span><span class="color">{{list.carColor}}</span>
          </li>
        </ul>
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
          },
          resultList: [],
          isActive: false
        }
      },
      computed: {
        ...mapState([
          'userInfo'
        ]),
      },
      methods: {
        // 模糊查找
        showList (){
          var _this = this;
          _this.isActive = true;
          var keyWords = _this.platNum;
          // 参数：车牌号 、用户id
          var postData = {
            text: keyWords,
            type: 1006,
            userId: _this.userInfo.userId
          };
          axios.get('',postData).then(res => {
            var res = {
              "code": 0,
              "data": [
                {
                  carId: 0, // 车辆id
                  carPlat: '川A5434', // 车牌号
                  carColor: '绿', // 车颜色
                  alarmType: "疲劳驾驶", // 报警类型
                  lng: _this.myPoint.lng + Math.random() / 100, // 纬度
                  lat: _this.myPoint.lat - Math.random() / 1000, // 经度
                  location: "四川省成都市都江堰市都江堰市徐渡小学西南319米", // 最新位置
                  unitName: "网阔信息111", // 所属企业
                  corporation: '成都王阔信息技术股份有限公司', // 所属营运商
                  speedCvt: "60", // 速度值
                  limitSpeed: "40", // 限速值
                  carType: '危险品3', // 车辆类型
                  platformName: "成都网阔信息技术股份有限公司", // 接入平台
                  gpsDateCvt: "2017-6-20 12:00", // 定位时间
                  receiveDate: '2017-6-20 12:01' // 接收时间
                },
                {
                  carId: 0, // 车辆id
                  carPlat: '川A0000', // 车牌号
                  carColor: '蓝', // 车颜色
                  alarmType: "疲劳驾驶", // 报警类型
                  lng: _this.myPoint.lng + Math.random() / 100, // 纬度
                  lat: _this.myPoint.lat - Math.random() / 1000, // 经度
                  location: "四川省成都市都江堰市都江堰市徐渡小学西南319米", // 最新位置
                  unitName: "网阔信息111", // 所属企业
                  corporation: '成都王阔信息技术股份有限公司', // 所属营运商
                  speedCvt: "60", // 速度值
                  limitSpeed: "40", // 限速值
                  carType: '危险品3', // 车辆类型
                  platformName: "成都网阔信息技术股份有限公司", // 接入平台
                  gpsDateCvt: "2017-6-20 12:00", // 定位时间
                  receiveDate: '2017-6-20 12:01' // 接收时间
                },
                {
                  carId: 0, // 车辆id
                  carPlat: '川A1234', // 车牌号
                  carColor: '红', // 车颜色
                  alarmType: "疲劳驾驶", // 报警类型
                  lng: _this.myPoint.lng + Math.random() / 100, // 纬度
                  lat: _this.myPoint.lat - Math.random() / 1000, // 经度
                  location: "四川省成都市都江堰市都江堰市徐渡小学西南319米", // 最新位置
                  unitName: "网阔信息111", // 所属企业
                  corporation: '成都王阔信息技术股份有限公司', // 所属营运商
                  speedCvt: "60", // 速度值
                  limitSpeed: "40", // 限速值
                  carType: '危险品3', // 车辆类型
                  platformName: "成都网阔信息技术股份有限公司", // 接入平台
                  gpsDateCvt: "2017-6-20 12:00", // 定位时间
                  receiveDate: '2017-6-20 12:01' // 接收时间
                },
              ]
            };
            var resultList = res.data;
            _this.resultList = resultList;
          });
        },
        selectOne (list) {
          var _this = this;
          var carPlat = list.carPlat;
          var carColor = list.carColor;
          _this.platNum = carPlat + ' ' + carColor;
          _this.isActive = true;
          _this.resultList = [];
        },
        // 精准搜索报警车辆
        searchPlat () {
          var _this = this;
          var inputValue = _this.platNum;
          var platNum = inputValue.split(' ')[0] || '';
          var platColor = inputValue.split(' ')[1] || '';
          // 参数：车牌号 、车牌颜色、用户id
          var postData = {
            platNum: platNum,
            platColor: platColor,
            userId: _this.userInfo.userId
          };
          console.log(postData);
          axios.get('', postData).then(res => {
            var res = {
              "code": 0,
              "data": [
                {
                  carId: 0, // 车辆id
                  carPlat: '川A5434', // 车牌号
                  carColor: '绿', // 车颜色
                  alarmType: "疲劳驾驶", // 报警类型
                  lng: _this.myPoint.lng + Math.random() / 100, // 纬度
                  lat: _this.myPoint.lat - Math.random() / 1000, // 经度
                  location: "四川省成都市都江堰市都江堰市徐渡小学西南319米", // 最新位置
                  unitName: "网阔信息111", // 所属企业
                  corporation: '成都王阔信息技术股份有限公司', // 所属营运商
                  speedCvt: "60", // 速度值
                  limitSpeed: "40", // 限速值
                  carType: '危险品3', // 车辆类型
                  platformName: "成都网阔信息技术股份有限公司", // 接入平台
                  gpsDateCvt: "2017-6-20 12:00", // 定位时间
                  receiveDate: '2017-6-20 12:01' // 接收时间
                }
              ]
            };
            if (res.code == 0) {
              if (res.data.length == 1) { // 有数据，搜索有结果
                var option = res.data[0];
                var myIcon = new BMap.Icon("./static/img/resultCar.png", new BMap.Size(22,33));// 搜索到的车辆定位图标
                var marker = new BMap.Marker(new BMap.Point(option.lng,option.lat),{icon:myIcon});// 创建标注
                _this.map.addOverlay(marker);
                _this.map.centerAndZoom(new BMap.Point(option.lng,option.lat), 16);
                var carDetailObj = {
                  carId: option.carId,
                  carType: option.carType,
                  carPlat: option.carPlat,
                  carColor: option.carColor,
                  unitName: option.unitName,
                  platformName: option.platformName,
                  location: option.location,
                  corporation: option.corporation
                };
                var html = '<div class="map-info-win"><table>' +
                  "<tr><td>所属企业：</td><td>" + option.unitName + '</td></tr>' +
                  "<tr><td>所属接入平台：</td><td>" + option.platformName + '</td></tr>' +
                  '<tr><td>地址：</td><td>' + option.location + '</td></tr>' +
                  "<tr><td>速度/限速值：</td><td>" + option.speedCvt + "/" + option.limitSpeed + ' km/h</td></tr>' +
                  '<tr><td>报警类型：</td><td>' + option.alarmType + '</td></tr>' +
                  '<tr><td>报警时间：</td><td>' + option.gpsDateCvt + '</td></tr>' +
                  "</table></div>";
                var title = `<h2 style="font-size:14px;border-bottom:1px solid #eee;margin-bottom: 10px;">${option.carPlat}${option.carColor}</h2>`;
                // 查询到的结果直接在页面上通过infoWindow显示出来
                _this.opts.title = title;
                var infoWindow = new BMap.InfoWindow(html, _this.opts);  // 创建信息窗口对象
                _this.map.openInfoWindow(infoWindow,new BMap.Point(option.lng,option.lat)); //开启信息窗口

                _this.addClickHandler(html,marker,new BMap.Point(option.lng,option.lat),title);
              } else if (res.data.length > 1) { // 查出有多辆车
                this.tips = '请准确选择一辆车进行信息查看！';
                this.tipShow = true;
                setTimeout(function(){
                  _this.tipShow = false;
                }, 1000);
              } else {
                this.tips = '未查询到相关结果！';
                this.tipShow = true;
                setTimeout(function(){
                  _this.tipShow = false;
                }, 1000);
              }
            } else {
              console.log(res.msg);
            }
          }).catch(error => {
            console.log(error);
          });
        },
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
          axios.get('', postData).then(res => {
            var res = {
              "code": 0,
              "data": [
                {
                  carId: 0, // 车辆id
                  carPlat: '川A5434', // 车牌号
                  carColor: '红', // 车颜色
                  alarmType: "超速", // 报警类型
                  lng: _this.myPoint.lng + Math.random() / 100, // 纬度
                  lat: _this.myPoint.lat - Math.random() / 1000, // 经度
                  location: "四川省成都市都江堰市都江堰市徐渡小学西南319米", // 最新位置
                  unitName: "网阔信息111", // 所属企业
                  corporation: '成都王阔信息技术股份有限公司', // 所属营运商
                  speedCvt: "60", // 速度值
                  limitSpeed: "40", // 限速值
                  carType: '危险品1', // 车辆类型
                  platformName: "成都网阔信息技术股份有限公司", // 接入平台
                  gpsDateCvt: "2017-6-20 12:00", // 定位时间
                  receiveDate: '2017-6-20 12:01' // 接收时间
                },
                {
                  carId: 0, // 车辆id
                  carPlat: '川A5434', // 车牌号
                  carColor: '黄', // 车颜色
                  alarmType: "凌晨2-3点", // 报警类型
                  lng: _this.myPoint.lng + Math.random() / 100, // 纬度
                  lat: _this.myPoint.lat - Math.random() / 1000, // 经度
                  location: "四川省成都市都江堰市都江堰市徐渡小学西南319米", // 最新位置
                  unitName: "网阔信息111", // 所属企业
                  corporation: '成都王阔信息技术股份有限公司', // 所属营运商
                  speedCvt: "60", // 速度值
                  limitSpeed: "40", // 限速值
                  carType: '危险品2', // 车辆类型
                  platformName: "成都网阔信息技术股份有限公司", // 接入平台
                  gpsDateCvt: "2017-6-20 12:00", // 定位时间
                  receiveDate: '2017-6-20 12:01' // 接收时间
                }
              ]
            };
            if (res.code == 0) {
              if (res.data.length > 0) { // 有数据，附近有车
                var nearData = res.data;
                for (var i in nearData) {
                  var option = nearData[i];
                  console.log(option);
                  var myIcon = new BMap.Icon("./static/img/alarmCar.png", new BMap.Size(24,24));// 搜索到的车辆定位图标
                  var marker = new BMap.Marker(new BMap.Point(option.lng,option.lat),{icon:myIcon});// 创建标注
                  _this.map.addOverlay(marker);
                  var html = '<div class="map-info-win"><table>' +
                    "<tr><td>所属企业：</td><td>" + option.unitName + '</td></tr>' +
                    "<tr><td>所属接入平台：</td><td>" + option.platformName + '</td></tr>' +
                    '<tr><td>地址：</td><td>' + option.location + '</td></tr>' +
                    "<tr><td>速度/限速值：</td><td>" + option.speedCvt + "/" + option.limitSpeed + ' km/h</td></tr>' +
                    '<tr><td>报警类型：</td><td>' + option.alarmType + '</td></tr>' +
                    '<tr><td>报警时间：</td><td>' + option.gpsDateCvt + '</td></tr>' +
                    "</table></div>";
                  var title = `<h2 style="font-size:14px;border-bottom: 1px solid #eee;margin-bottom: 10px;">${option.carPlat}${option.carColor}</h2>`;
                  _this.addClickHandler(html,marker,new BMap.Point(option.lng,option.lat),title);
                }
              } else {
                alert('附近暂无报警车辆！');
              }
            } else {
              console.log(res.msg);
            }
           }).catch(error => {
              console.log(error);
           });
        },
        addClickHandler (content,marker,point, title) {
          var _this = this;
          marker.addEventListener("click",function(){
            _this.opts.title = title;
            var infoWindow = new BMap.InfoWindow(content, _this.opts);  // 创建信息窗口对象
            _this.map.openInfoWindow(infoWindow,point); //开启信息窗口
          });
        },

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

      .resultList {
        display: none;
        width: 100%;
        height: auto;
        position: absolute;
        background-color: #fff;
        .list {
          width: 100%;
          @include pxrem(height, 70);
          @include pxrem(line-height, 70);
          border: 1px solid #eee;
          border-top: none;
          @include pxrem(padding, 0 20);

          .color {
            @include pxrem(margin-left, 10);
          }

          .carId {
            display: none;
          }
        }
      .list:hover {
        background-color: #eee;
        cursor: pointer;
      }
      }

      .resultList.active {
        display: block;
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
