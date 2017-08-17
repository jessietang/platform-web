<template lang="html">
    <div id="index">
      <!--<p class="title">地图操作</p>-->
      <div class="nearCar" :class="{'tabActive': isNearTab}" @click="switchNear()">
        <a href="javascript:void(0)">
          <p class="text">附近</p>
        </a>
      </div>
      <div class="alarmCar" :class="{'tabActive': isAlarmTab}" @click="switchAlarm()">
        <a href="javascript:void(0)">
          <p class="text">报警</p>
        </a>
      </div>

      <!--回到用户当前位置按钮-->
      <div class="backNowPos"  @click="getMyPosition()">
        <img src="./img/reLocation.png" alt=""/>
      </div>

      <div id="nearCar">
        <div class="searchBox">
          <input type="text" class="search-input" placeholder="搜车牌号" v-model="platNum" @keyup="showList()" @focus="showList()"/>
          <div class="searchBtn">
            <img src="./img/magnify.png" alt="" id="searchBtn" @click="searchPlat()"/>
          </div>
          <ul class="resultList" v-if="resultList.length > 0" :class="{'active': isActive}">
            <li class="list" v-for="list in resultList" @click="selectOne(list)">
              <span class="platNum">{{list.Name}}</span>
            </li>
          </ul>
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
                <div class="carCircle carPosition" :class="{'activeCircle': $route.path === '/web/index/carPosition'}">
                  <router-link :to="{path: '/web/index/carPosition'}">
                  </router-link>
                </div>
                <div class="carCircle carTrail" :class="{'activeCircle': $route.path === '/web/index/carTrail'}">
                  <router-link to="/web/index/carTrail">
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

        <div class="selectPoint">
          <img src="./img/selectPoint.png" alt=""/>
        </div>

        <loadingComp v-if="isLoadingShow" v-bind:loadingTip="loadingTip"></loadingComp>
      </div>
    </div>
</template>

<script lang="babel">
  import {mapState} from 'vuex'
  import axios from 'axios'
  import loadingComp from '../loadingComp/index'

  export default {
    components: {
      loadingComp
    },
    data () {
      return {
        isNearTab: true, // 默认点亮附近tab
        isAlarmTab: false, // 默认报警tab不点亮
        isLoadingShow: false, // 加载动画
        loadingTip: '', // 加载的提示文字
        platNum: '', // 搜索车牌号关键字
        isOpenPopUp: false, // popup默认关闭 点击页面上的某一个点才显示popup
        myPosPoint: {}, // 我的当前位置（经纬度未转换的）
        myPoint: { // 我的当前位置（转换后的）
          lng: 0, // 纬度
          lat: 0 // 经度
        },
        mySelectPoint: { // 用户选择的位置点
          lng: 0,
          lat: 0
        },
        tips: '请至少输入四位要查询的车牌号！',
        tipShow: false,
        map: null,
        opts: {
          width : 600,     // 信息窗口宽度
          //height: 500,     // 信息窗口高度
          title : "信息窗口" , // 信息窗口标题
          enableMessage: true // 设置允许信息窗发送短息
        },
        trackData: [], // 历史轨迹数据（从carTrail.vue传过来的数据）
        frontPoint: null, // 前一个点
        marker: null,
        points: [], // 只保存有经纬度的所有轨迹点
        car: null,
        resultList: [],
        isActive: false,
        userInfo: JSON.parse(localStorage.getItem('platformUserInfo')) || this.$store.state.userInfo
      }
    },
    created () {
      console.log('===========created===============');
      console.log(this.$store.state.userInfo);
    },
    computed: {
    ...mapState([
        'carDetail',
        'iconItems'
      ]),
    },
    methods: {
      ajaxLoader (tip) {
        var _this = this;
        _this.isLoadingShow = true;
        _this.loadingTip = tip;
      },
      ajaxComplete () {
        var _this = this;
        _this.isLoadingShow = false;
        _this.loadingTip = '';
      },
      // 当前是附近tab时候的操作
      switchNear () {
        var _this = this;
        _this.isNearTab = true;
        _this.isAlarmTab = false;
        console.log("当前地图中心点================");
        console.log(_this.map.getCenter());
        // 获取当前用户选择的点(要进行处理后才拿去查数据)
        _this.mySelectPoint.lng = ((_this.map.getCenter().lng) * 1000000).toFixed(0);
        _this.mySelectPoint.lat = ((_this.map.getCenter().lat) * 1000000).toFixed(0);

        // 清除地图上的覆盖物
        _this.map.clearOverlays();
        // 标记当前定位
        _this.addMyPosMarker();
        // 获取用户选择点附近的车辆
        _this.getNearPosition();

      },
      // 当前是报警tab时候的操作
      switchAlarm () {
        var _this = this;
        _this.isNearTab = false;
        _this.isAlarmTab = true;
        console.log("当前地图中心点================");
        console.log(_this.map.getCenter());
        // 获取当前用户选择的点(要进行处理后才拿去查数据)
        _this.mySelectPoint.lng = ((_this.map.getCenter().lng) * 1000000).toFixed(0);
        _this.mySelectPoint.lat = ((_this.map.getCenter().lat) * 1000000).toFixed(0);

        // 清除地图上的覆盖物
        _this.map.clearOverlays();
        // 标记当前定位
        _this.addMyPosMarker();
        // 获取用户选择点附近的报警车辆
        _this.getAlarmPoint();
      },
      // 标记当前定位位置
      addMyPosMarker () {
        var _this = this;
        // 重新标记我的当前位置，因为在点击tab切换的时候，把地图上的覆盖物都清除了，包括当前定位位置
        var myIcon = new BMap.Icon('./static/img/local.png',new BMap.Size(40,40));
        var marker = new BMap.Marker(_this.myPosPoint,{icon:myIcon});
        _this.map.addOverlay(marker);
      },
      showList (){
        var _this = this;
        _this.isActive = true;
        var keyWords = _this.platNum;
        // 参数：车牌号 、用户id
        var postData = {
          text: keyWords,
          type: 1002, // 车的类型
          userId: _this.userInfo.userId
        };
        console.log(postData);
        // 发get请求 （这里要注意传参的方式，通过params对象传递参数）
        axios.get('/api/autocomplete',{params: postData}).then(res => {
          var res = JSON.parse(res.data);
          console.log(res);
          var resultList = res.data;
          _this.resultList = resultList;
        });
      },
      selectOne (list) {
        var _this = this;
        _this.platNum = list.Name;
        _this.isActive = true;
        _this.resultList = [];
      },
      // 创建地图
      getMyMap () {
        var _this = this; // 单独保存this
        _this.map = new BMap.Map("nearMapPannel");    // 创建Map实例
        //map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        //map.addControl(new BMap.NavigationControl());
        //this.map.centerAndZoom("四川",12);       // 设置地图显示的城市 此项是必须设置的
        _this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        _this.map.enablePinchToZoom(true);    //启用双指操作缩放
        _this.getMyPosition();
      },
      // 获取我的位置并在地图上标记出来
      getMyPosition () {
        var _this = this;
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            // 清除地图上的覆盖物
            _this.map.clearOverlays();
            // Icon类表示覆盖物所使用的图标
            var myIcon = new BMap.Icon('./static/img/local.png',new BMap.Size(40,40));
            // Marker类表示地图上一个图像标注
            var marker = new BMap.Marker(r.point,{icon:myIcon});
            //添加一个覆盖物
            _this.map.addOverlay(marker);
            _this.map.centerAndZoom(r.point, 16);
            //_this.map.panTo(r.point);
            //_this.map.setZoom(16);
            _this.myPosPoint = r.point; // 我的真实位置（经纬度未转换）
            console.log('您的位置：'+r.point.lng+','+r.point.lat);
            // 保存我的位置信息
            console.log('=====我的位置====');
            // 传给后台的经纬度要进行转换（Int）
            _this.myPoint.lng = ((r.point.lng) * 1000000).toFixed(0);// 转换后的我的位置
            _this.myPoint.lat = ((r.point.lat) * 1000000).toFixed(0);
            // 把定位的当前位置赋值给用户选择的点
            _this.mySelectPoint.lng = _this.myPoint.lng;
            _this.mySelectPoint.lat = _this.myPoint.lat;
            // 获取附近的车的信息并标记在地图上
            if (_this.isNearTab) {
              _this.getNearPosition();
            }

            if (_this.isAlarmTab) {
              _this.getAlarmPoint();
            }
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
          lng: _this.mySelectPoint.lng,
          lat: _this.mySelectPoint.lat,
          userId:_this.userInfo.userId
        };
        console.log(postData);
        var nearData = sessionStorage.getItem('nearDataRes') && JSON.parse(JSON.parse(sessionStorage.getItem('nearDataRes'))).data;
        if (nearData !== null && nearData.length > 0 &&
          _this.myPoint.lat == _this.mySelectPoint.lat &&
          _this.myPoint.lng == _this.mySelectPoint.lng) { // 有缓存并且中心点位置还是用户当前位置
          for (let i in nearData) {
            var option = nearData[i];
            // 拿到的经纬度要进行转换
            option.lng = parseFloat(option.lng) / 1000000;
            option.lat = parseFloat(option.lat) / 1000000;
            var myIcon = new BMap.Icon("./static/img/nearCar.png", new BMap.Size(36,36));// 附近的车辆定位图标
            var marker = new BMap.Marker(new BMap.Point(option.lng,option.lat),{icon:myIcon});// 创建标注
            _this.map.addOverlay(marker);
            // carDetailObj作为局部变量
            var carDetailObj = {
              carId: option.carId,
              carType: option.carType,
              carPlat: option.carPlat,
              carColor: option.carColor,
              unitName: option.unitName,
              platformName: option.platformName,
              location: option.location,
              corporation: option.corporation,
              gpsDateCvt: option.gpsDateCvt
            };
            _this.addClickHandler1(marker, carDetailObj);
          }
        } else { // 无缓存，重新请求数据
          _this.ajaxLoader('正在加载附近车辆，请稍候！');
          axios.post('/api/Vehicle/QueryVehicleInfoNear', postData).then(res => {
            _this.ajaxComplete();
            console.log(res);
            // 只在用户选定的位置是用户的定位位置的时候进行数据缓存
            if (_this.myPoint.lat == _this.mySelectPoint.lat && _this.myPoint.lng == _this.mySelectPoint.lng) {
              sessionStorage.setItem('nearDataRes',JSON.stringify(res.data)); // 进行数据缓存
            }
            var res = JSON.parse(res.data);
            if (res.code == 0) {
              if (res.data.length > 0) { // 有数据
                var nearData = res.data;
                console.log(nearData)
                for (let i in nearData) {
                  var option = nearData[i];
                  // 拿到的经纬度要进行转换
                  option.lng = parseFloat(option.lng) / 1000000;
                  option.lat = parseFloat(option.lat) / 1000000;
                  var myIcon = new BMap.Icon("./static/img/nearCar.png", new BMap.Size(36,36));// 附近的车辆定位图标
                  let marker = new BMap.Marker(new BMap.Point(option.lng,option.lat),{icon:myIcon});// 创建标注
                  _this.map.addOverlay(marker);
                  // carDetailObj作为局部变量
                  var carDetailObj = {
                    carId: option.carId,
                    carType: option.carType,
                    carPlat: option.carPlat,
                    carColor: option.carColor,
                    unitName: option.unitName,
                    platformName: option.platformName,
                    location: option.location,
                    corporation: option.corporation,
                    gpsDateCvt: option.gpsDateCvt
                  };
                  _this.addClickHandler1(marker, carDetailObj);
                }
              } else { // 无数据
                alert('附近暂无车辆！');
              }
            } else {
              console.log(res.msg);
            }
          }).catch(error => {
            console.log(error);
          });
        }
      },
      getAlarmPoint () {
        var _this = this;
        // 参数：经度纬度、用户id
        var postData = {
          lng: _this.mySelectPoint.lng,
          lat: _this.mySelectPoint.lat,
          userId: _this.userInfo.userId
        };
        var nearData = sessionStorage.getItem('nearDataAlarmRes') && JSON.parse(JSON.parse(sessionStorage.getItem('nearDataAlarmRes'))).data;
        if (nearData !== null && nearData.length > 0 &&
          _this.myPoint.lat == _this.mySelectPoint.lat &&
          _this.myPoint.lng == _this.mySelectPoint.lng) { // 有缓存数据并且中心点位置还在用户当前位置，则加载缓存数据
          for (var i in nearData) {
            var option = nearData[i];
            console.log(option);
            // 拿到的经纬度要进行转换
            option.lng = parseFloat(option.lng) / 1000000;
            option.lat = parseFloat(option.lat) / 1000000;
            var myIcon = new BMap.Icon("./static/img/alarmCar.png", new BMap.Size(24,24));// 搜索到的车辆定位图标
            var marker = new BMap.Marker(new BMap.Point(option.lng,option.lat),{icon:myIcon});// 创建标注
            _this.map.addOverlay(marker);
            // 速度处理规则，按位与： (Speed&0x00FFFFFF)/1000
            var speedCvt = parseInt(((option.speedCvt)&0x00FFFFFF) / 1000);
            var limitSpeed = parseInt(((option.limitSpeed)&0x00FFFFFF) / 1000);
            var html = '<div class="map-info-win"><table>' +
              "<tr><td>所属企业：</td><td>" + option.unitName + '</td></tr>' +
              "<tr><td>所属接入平台：</td><td>" + option.platformName + '</td></tr>' +
              '<tr><td>地址：</td><td>' + option.location + '</td></tr>' +
              "<tr><td>速度/限速值：</td><td>" + speedCvt + "/" + limitSpeed + ' km/h</td></tr>' +
              '<tr><td>报警类型：</td><td>' + option.alarmType + '</td></tr>' +
              '<tr><td>报警时间：</td><td>' + option.gpsDateCvt + '</td></tr>' +
              "</table></div>";
            var title = `<h2 style="font-size:14px;border-bottom: 1px solid #eee;margin-bottom: 10px;">${option.carPlat}${option.carColor}</h2>`;
            _this.addClickHandler2(html,marker,new BMap.Point(option.lng,option.lat),title);
          }
        }else { // 没有缓存数据
          _this.ajaxLoader('正在加载附近报警车辆，请稍候！');
          axios.post('/api/Vehicle/QueryAlarmVehicleInfoNear', postData).then(res => {
            _this.ajaxComplete();
            // 只在用户选定的位置是用户的定位位置的时候进行数据缓存
            if (_this.myPoint.lat == _this.mySelectPoint.lat && _this.myPoint.lng == _this.mySelectPoint.lng) {
              sessionStorage.setItem('nearDataAlarmRes',JSON.stringify(res.data)); // 进行数据缓存
            }
            var res = JSON.parse(res.data);
            if (res.code == 0) {
              if (res.data.length > 0) { // 有数据，附近有车
                var nearData = res.data;
                for (var i in nearData) {
                  var option = nearData[i];
                  console.log(option);
                  // 拿到的经纬度要进行转换
                  option.lng = parseFloat(option.lng) / 1000000;
                  option.lat = parseFloat(option.lat) / 1000000;
                  var myIcon = new BMap.Icon("./static/img/alarmCar.png", new BMap.Size(24,24));// 搜索到的车辆定位图标
                  var marker = new BMap.Marker(new BMap.Point(option.lng,option.lat),{icon:myIcon});// 创建标注
                  _this.map.addOverlay(marker);
                  // 速度处理规则，按位与： (Speed&0x00FFFFFF)/1000
                  var speedCvt = parseInt(((option.speedCvt)&0x00FFFFFF) / 1000);
                  var limitSpeed = parseInt(((option.limitSpeed)&0x00FFFFFF) / 1000);
                  var html = '<div class="map-info-win"><table>' +
                    "<tr><td>所属企业：</td><td>" + option.unitName + '</td></tr>' +
                    "<tr><td>所属接入平台：</td><td>" + option.platformName + '</td></tr>' +
                    '<tr><td>地址：</td><td>' + option.location + '</td></tr>' +
                    "<tr><td>速度/限速值：</td><td>" + speedCvt + "/" + limitSpeed + ' km/h</td></tr>' +
                    '<tr><td>报警类型：</td><td>' + option.alarmType + '</td></tr>' +
                    '<tr><td>报警时间：</td><td>' + option.gpsDateCvt + '</td></tr>' +
                    "</table></div>";
                  var title = `<h2 style="font-size:14px;border-bottom: 1px solid #eee;margin-bottom: 10px;">${option.carPlat}${option.carColor}</h2>`;
                  _this.addClickHandler2(html,marker,new BMap.Point(option.lng,option.lat),title);
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
        }
      },
      addClickHandler1 (marker, carDetailObj) {
        var _this = this;
        marker.addEventListener("click",function(){
          _this.$router.push({
            path: '/web/index/carPosition'
          });
          _this.isOpenPopUp = true;
          // 把车的详细信息保存到store里面,而不是通过query传递，这样防止在切换定位和轨迹的时候丢失数据
          _this.$store.dispatch('saveCarInfo', carDetailObj);
        });
      },
      addClickHandler2 (content,marker,point, title) {
        var _this = this;
        marker.addEventListener("click",function(){
          _this.opts.title = title;
          var infoWindow = new BMap.InfoWindow(content, _this.opts);  // 创建信息窗口对象
          _this.map.openInfoWindow(infoWindow,point); //开启信息窗口
        });
      },
      // 精确搜索（一个值）
      searchPlat () {
        var _this = this;
        var platNum = _this.platNum;
        // 参数：车牌号车牌颜色(作为一个整体)、用户id
        var postData = {
          platNum: platNum,
          userId: _this.userInfo.userId
        };
        console.log(postData);

        if (_this.isNearTab) { // 当前是附近车的精准搜索（不同接口）
          axios.post('/api/Vehicle/QueryVehicleInfo',postData).then(res => {
            var res = JSON.parse(res.data);
            if (res.code == 0) {
              if (res.data.length == 1) {
                var option = res.data[0]; // res.data[0], 不是res.data， 这里注意哦！！！
                option.lat = (option.lat) / 1000000;
                option.lng = (option.lng) / 1000000;
                console.log(option);
                var myIcon = new BMap.Icon("./static/img/resultCar.png", new BMap.Size(22,33));// 搜索到的车辆定位图标
                var marker = new BMap.Marker(new BMap.Point(option.lng,option.lat),{icon:myIcon});// 创建标注
                _this.map.addOverlay(marker);
                _this.map.centerAndZoom(new BMap.Point(option.lng,option.lat), 16);
                // carDetailObj作为局部变量
                var carDetailObj = {
                  carId: option.carId,
                  carType: option.carType,
                  carPlat: option.carPlat,
                  carColor: option.carColor,
                  unitName: option.unitName,
                  platformName: option.platformName,
                  location: option.location,
                  corporation: option.corporation, // 所属营运商
                  gpsDateCvt: option.gpsDateCvt // 最新定位时间
                };
                // 搜到结果后就展开车辆的详细信息
                _this.isOpenPopUp = true;
                // 把车的详细信息保存到store里面,而不是通过query传递，这样防止在切换定位和轨迹的时候丢失数据
                _this.$store.dispatch('saveCarInfo', carDetailObj);
                // need to do...
                _this.$router.push({
                  path: '/web/index/carPosition'
                });
                _this.addClickHandler(marker, carDetailObj);
              } else if (res.data.length > 1) {
                _this.tips = '请从下拉框里准确选择一辆车进行信息查看！';
                _this.tipShow = true;
                setTimeout(function(){
                  _this.tipShow = false;
                }, 1000);
              } else {
                _this.tips = '暂无查询结果！';
                _this.tipShow = true;
                setTimeout(function(){
                  _this.tipShow = false;
                }, 1000);
              }
            }else {
              console.log(res.msg || '未知错误！');
              _this.tips = '请从下拉框里准确选择一辆车进行信息查看！';
              _this.tipShow = true;
              setTimeout(function(){
                _this.tipShow = false;
              }, 1000);
            }
          }).catch(error => {
            console.log(error);
          });
        }

        if (_this.isAlarmTab) { // 当前是报警车的精准搜索（不同接口）
          axios.post('/api/Vehicle/QueryAlarmVehicleInfo', postData).then(res => {
            var res = JSON.parse(res.data);
            if (res.code == 0) {
              if (res.data.length == 1) { // 有数据，搜索有结果
                var option = res.data[0];
                option.lat = (option.lat) / 1000000;
                option.lng = (option.lng) / 1000000;
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
                // 速度处理规则，按位与： (Speed&0x00FFFFFF)/1000
                var speedCvt = parseInt(((option.speedCvt)&0x00FFFFFF) / 1000);
                var limitSpeed = parseInt(((option.limitSpeed)&0x00FFFFFF) / 1000);
                var html = '<div class="map-info-win"><table>' +
                  "<tr><td>所属企业：</td><td>" + option.unitName + '</td></tr>' +
                  "<tr><td>所属接入平台：</td><td>" + option.platformName + '</td></tr>' +
                  '<tr><td>地址：</td><td>' + option.location + '</td></tr>' +
                  "<tr><td>速度/限速值：</td><td>" + speedCvt + "/" + limitSpeed + ' km/h</td></tr>' +
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
                _this.tips = '请从下拉框里准确选择一辆车进行信息查看！';
                _this.tipShow = true;
                setTimeout(function(){
                  _this.tipShow = false;
                }, 1000);
              } else {
                _this.tips = '未查询到相关结果！';
                _this.tipShow = true;
                setTimeout(function(){
                  _this.tipShow = false;
                }, 1000);
              }
            } else {
              _this.tips = '请从下拉框里准确选择一辆车进行信息查看！';
              _this.tipShow = true;
              setTimeout(function(){
                _this.tipShow = false;
              }, 1000);
              console.log(res.msg);
            }
          }).catch(error => {
            console.log(error);
          });
        }

      },
      // 计算两点之间的距离
      drawTrackPoint_Distance (sPoint, ePoint) {
        var _this = this;
        return _this.map.getDistance(sPoint, ePoint);
      },
      // 转换度为方向
      convertDegree (degree) {
        return parseInt((degree + 23) / 45) % 8;
      },
      // 获取不同方向图标的路径 (nType: 1:车辆  2:方向  index:轨迹点索引)
      getIconPath (nType, index) {
        var _this = this;
        var direction = _this.convertDegree(_this.trackData[index]["direction"]);
        var n = _this.iconItems[direction].id;
        var d = _this.iconItems[direction].direction;
        console.log(d);
        if (nType == 1) {
          return _this.iconItems[direction].dot;
        }
        return d;
      },
      addInfoClickEvent (now) {
        var _this = this;
        // 速度处理规则，按位与： (Speed&0x00FFFFFF)/1000
        var speedCvt = parseInt(((_this.trackData[now].speedCvt)&0x00FFFFFF) / 1000);
        var limitSpeed = parseInt(((_this.trackData[now].limitSpeed)&0x00FFFFFF) / 1000);
        var html = '<div class="map-info-win"><table>' +
          "<tr><td>所属企业：</td><td>" + _this.carDetail.unitName + '</td></tr>' +
          "<tr><td>所属营运商：</td><td>" + _this.carDetail.corporation + '</td></tr>' +
          "<tr><td>速度/限速值：</td><td>" + speedCvt + "/" + limitSpeed + ' km/h</td></tr>' +
          "<tr><td>车辆类型：</td><td>" + _this.carDetail.carType + '</td></tr>' +
          "<tr><td>接入平台：</td><td>" + _this.carDetail.platformName + '</td></tr>' +
          '<tr><td>地址：</td><td>' + _this.trackData[now].location + '</td></tr>' +
          '<tr><td>定位时间：</td><td>' + _this.trackData[now].gpsDateCvt + '</td></tr>' +
          '<tr><td>接收时间：</td><td>' + _this.trackData[now].receiveDate + '</td></tr>' +
          "</table></div>";
        // 给轨迹上的每一个点绑定点击开启信息窗口的事件
        _this.marker.addEventListener("click",function(){
          console.log(now);
          console.log(_this.trackData[now].location);
          var infoWindow = new BMap.InfoWindow(html, _this.opts);  // 创建信息窗口对象
          _this.map.openInfoWindow(infoWindow, _this.points[now]); //开启信息窗口
        });
      },
      // 画历史轨迹图
      drawTrack (data, isShow) {
        var _this = this;
        _this.isOpenPopUp = isShow;
        console.log(data);
        var centerPoint;
        var car;   //汽车图标
        var label; //信息标签
        var timer; //定时器
        var index = 0; //记录播放到第几个point
        var points = [];
        for (var i in data) {
          points.push(new BMap.Point(data[i].lng, data[i].lat));
        }
        _this.trackData = data;
        _this.points = points;

        //_this.map.centerAndZoom(points[0], 14);
        // 清除地图上的覆盖物
        _this.map.clearOverlays();

        // DrivingRoute获取驾车路线规划方案
        var driving = new BMap.DrivingRoute(_this.map); // 当参数为地图实例时，检索位置由地图当前的中心点确定
        driving.search(points[0], points[points.length-1]); //发起检索（起点，终点）
        // 设置检索结束后的回调函数
        driving.setSearchCompleteCallback(function() {
          //画面移动到起点和终点的中间,并且缩小地图
          centerPoint = new BMap.Point((points[0].lng + points[points.length - 1].lng) / 2, (points[0].lat + points[points.length - 1].lat) / 2);
          _this.map.centerAndZoom(centerPoint,13);

          //显示跟踪的图片
          var myIcon = new BMap.Icon(_this.getIconPath(1,index), new BMap.Size(27,27));// 跟踪图标
          _this.car = new BMap.Marker(points[0], {icon: myIcon}); // 创建Marker实例
          _this.map.addOverlay(_this.car);

          // 播放
          play();
          function play() {
            var point = points[index];
            console.log(index);
            if(index > 0) {
              _this.map.addOverlay(new BMap.Polyline([points[index - 1], point], {strokeColor: "#83c2ec", strokeWeight: 6, strokeOpacity: 1}));
            }
            // 点标记跟踪
            if (index > -1 && index < points.length){
              var now = 0;
              // 这里的所有点的title都是同一辆车的，所以这里可以这样用
              _this.opts.title = `<h2 style="font-size:14px;border-bottom: 1px solid #eee;margin-bottom: 10px;">${_this.carDetail.carPlat}${_this.carDetail.carColor}</h2>`;
              if (index == 0) { // 第一个点，直接添加标注点，然后设置为frontPoint
                _this.marker = new BMap.Marker(_this.points[0], {icon: new BMap.Icon("./static/img/bullet.png", new BMap.Size(12,12))});
                _this.frontPoint = _this.points[0];
                _this.map.addOverlay(_this.marker);
                console.log(_this.trackData[index].location);
                _this.addInfoClickEvent(index); // 应该是只给添加蓝色点标注的点添加click事件
              } else {
                var distance = _this.drawTrackPoint_Distance(_this.frontPoint, _this.points[index]);
                console.log('distance===='+distance);
                if (distance > 600 || index === points.length-1) { // 》3000m  标记点的方向 （类似 >>  << 等）
                  _this.marker = new BMap.Marker(_this.points[index], {icon: new BMap.Icon(_this.getIconPath(2,index), new BMap.Size(20,20))});
                  _this.map.addOverlay(_this.marker);
                }
                if (distance > 200) { // 画蓝色标注点
                  _this.marker = new BMap.Marker(_this.points[index], {icon: new BMap.Icon("./static/img/bullet.png", new BMap.Size(12,12))});
                  _this.frontPoint = _this.points[index];
                  _this.map.addOverlay(_this.marker);
                  console.log(_this.trackData[index].location);
                  _this.addInfoClickEvent(index); // 应该是只给添加蓝色点标注的点添加click事件
                } else {
                  _this.frontPoint = _this.points[index-1];
                }
              }
              // 车的图片也时时改变
              _this.car.setIcon(new BMap.Icon(_this.getIconPath(1, index), new BMap.Size(27,27)));
            }
            // 不能把绑定click事件放到这里，这样的话，会给每个点都添加click事件，就会出现例如：我点第一个点在第三个点的位置弹出消息。
            // 应该是只给添加蓝色点标注的点添加click事件
            _this.car.setPosition(point); // 设置标注的地理坐标
            // 画面跟随
            //_this.map.panTo(point);
            index++;
            if(index < points.length) {
              timer = window.setTimeout(play, 0); // 在函数内部通过setTimeout再次调用函数本身，达到setInterval类似的的效果
            } else {
              //_this.map.panTo(point);
              //画面移动到终点,并且还原地图大小
              _this.map.centerAndZoom(point,16);
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
        _this.getMyMap();
      });
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
        background: url('./img/near.png') no-repeat;
        @include pxrem(background-position, 20 8);
        @include pxrem(background-size, 40 40);
      }
    }

    .alarmCar {
      @include pxrem(top, 310);

      a {
        background: url('./img/alarm.png') no-repeat;
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
        background: url('./img/alarmActive.png') no-repeat;
        @include pxrem(background-position, 20 8);
        @include pxrem(background-size, 40 40);
      }
    }


    #nearCar {
      width: 100%;
      height: 100%;

    .searchBox {
      position: absolute;
      z-index: 1001;
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
                width: 70%;
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

    .selectPoint {
      position: fixed;
      @include pxrem(width, 100);
      @include pxrem(height, 100);
      left: 50%;
      top: 50%;
      @include pxrem(margin-top, -70);
      @include pxrem(margin-left, -50);
      z-index: 9999;

      img {
        @include pxrem(width, 100);
        @include pxrem(height, 100);
      }
    }


    .backNowPos {
      @include pxrem(width, 60);
      @include pxrem(height, 60);
      @include pxrem(line-height, 60);
      background-color: #fff;
      position: fixed;
      z-index: 1000;
      @include pxrem(left, 20);
      @include pxrem(bottom, 150);

      img {
        margin: auto;
        vertical-align: middle;
        @include pxrem(width, 60);
        @include pxrem(height, auto);
      }
    }

  }


</style>
