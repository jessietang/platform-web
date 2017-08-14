<template lang="html">
  <div id="sixStrictBan">
    <!--查询条件-->
    <mt-popup
      v-model="popupVisible"
      position="top" style="width:100%;z-index:2003;">
      <mt-picker :slots="addressSlots" class="picker" @change="onAddressChange" :visible-item-count="5" ></mt-picker >
    </mt-popup>

    <ul class="search-form clearfix">
      <li class="list">
        <label for="">地区</label>
        <input type="text" @click="showPopUp()" v-model="searchPlace" placeholder="四川省"/>
      </li>
      <li class="list">
        <label for="">服务商</label>
        <input type="text" placeholder="请输入服务商" v-model="serviceProvider"/>
      </li>
      <li class="list">
        <label for="">企业</label>
        <input type="text" placeholder="请输入企业" v-model="companyName"/>
      </li>
      <!--切换按钮 企业、地区、服务商-->
      <li class="list switch-line clearfix">
        <label for="">展示方式</label>
        <el-select v-model="showValue" placeholder="请选择">
          <el-option
            v-for="item in showOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </li>
    </ul>
    <div class="search-btn" @click="searchData()">查询</div>




    <!--图表渲染-->
    <div id="banReport" class="clearfix"></div>
    <loadingComp v-if="isLoadingShow" v-bind:loadingTip="loadingTip"></loadingComp>
  </div>
</template>
<script lang="babel">
  import echarts from 'echarts'
  import axios from 'axios'
  import s from '../../assets/js/lib/address3.json'
  import {mapState} from 'vuex'
  import loadingComp from '../loadingComp/index'
  export default {
    components: {
      loadingComp
    },
    data () {
      return {
        userInfo: JSON.parse(localStorage.getItem('platformUserInfo')) || this.$store.state.userInfo,
        isLoadingShow: false,
        loadingTip: '',
        popupVisible: false,
        // 查询条件数据
        addressSlots: [
          {
            flex: 1,
            defaultIndex: 1,
            values: Object.keys(s), // 把省的集合赋给第一个
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot4'
          }, {
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        addressProvince: '省',
        addressCity: '市',
        addressXian: '区',
        // 本来想的是给地区一个初始值，但是发现没用，因为刚一进去就出发了change事件，后来想了想，也不用，
        // 当地区为空的时候，下面就按地区id展示所有的，就跟我不输入服务商而下面选择按照服务商展示一样
        searchPlace: '四川', // 地区
        serviceProvider: '', // 服务商
        companyName:'', // 企业
        // 下拉切换选择数据
        showOptions: [{
          value: '1',
          label: '地区'
        }, {
          value: '2',
          label: '服务商'
        }, {
          value: '3',
          label: '企业'
        }],
        showValue: '1',
        // 图表数据
        yData: [], // 纵坐标，数据项名称
        chart: null,
        zxData: [], // 在线数
        rwData: [], // 入网数
        zsData: [], // 车辆总数
        dataSelectId: [], // 地区ID、服务商ID、企业ID
      }
    },
    computed: {

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
      },
      // 控制popup的显示隐藏
      showPopUp () {
        this.popupVisible = true;
      },
      // 地区选择改变时触发
      onAddressChange(picker, values) {
        let sheng = Object.keys(s);
        //console.log(sheng) // ['四川','湖南'，]
        // values[0] 四川  s[values[0]] 成都市、广安市。。
        let shi = Object.keys(s[values[0]]);
        //console.log(shi); // ["太原市", "大同市", "阳泉市", "长治市", "晋城市", "朔州市", "晋中市", "运城市", "忻州市", "临汾市", "吕梁市"]
        picker.setSlotValues(1, shi); // 把市的集合赋给第二个
        //console.log(values[0]); // 山西省
        //console.log(values[1]); // 太原市
        let xian = s[values[0]][values[1]];
        //console.log(s[values[0]][values[1]]); // 某个市下面的所有县的集合
        if (values[0] === '省') {
          this.addressProvince = '';
        } else {
          this.addressProvince = values[0];
        }

        if (values[1] === '市') {
          this.addressCity = '';
        } else {
          this.addressCity = values[1];
        }

        if (values[2] === '县' || values[2] === '区') {
          this.addressXian = '';
        } else {
          this.addressXian = values[2];
        }
        // input框最终选择的地址
        this.searchPlace = this.addressProvince + this.addressCity + this.addressXian;
        picker.setSlotValues(2, xian); // 把县的集合赋给第三个value
      },
      searchData () {
        var _this = this;
        sessionStorage.removeItem('onlineData'+_this.showValue); // 清空之前的缓存
        _this.searchByFilter();
      },
      // 条件搜索
      searchByFilter () {
        var _this = this;
        var zoneId = _this.userInfo.zoneId; // 区域id
        var searchPlace = _this.searchPlace;
        var serviceProvider = _this.serviceProvider;
        var companyName = _this.companyName;
        var nowSelect = _this.showValue; // 默认展示方式  1：地区。2：服务商。3：企业
        var userId = _this.userInfo.userId;

        // 参数 : 地区id、详细地址、服务商、企业、展示方式、用户id
        var postData = {
          zoneId: zoneId,
          //searchPlace: searchPlace,
          serviceProvider: serviceProvider,
          companyName: companyName,
          nowSelect: nowSelect,
          userId: userId
        };
        var data = sessionStorage.getItem('onlineData'+nowSelect) && (JSON.parse(JSON.parse(sessionStorage.getItem('onlineData'+nowSelect))).data).reverse();
        console.log(data);
        if (data && data.length > 0) { // 有缓存
          var yData = [], // 纵坐标，数据项名称
            zxData = [], // 在线数
            rwData = [], // 入网数
            zsData = [], // 车辆总数
            dataSelectId = []; // 地区ID、服务商ID、企业ID
          for (var i in data) {
            if (data[i].yName.length > 5) {
              yData.push(data[i].yName.substring(0,5));
            } else {
              yData.push(data[i].yName);
            }
            zxData.push(data[i].zxNum);
            rwData.push(data[i].rwNum);
            zsData.push(data[i].zsNum);
            dataSelectId.push(data[i].zId);
          }
          _this.yData = yData; // 纵坐标，数据项名称
          _this.zxData = zxData; // 在线数
          _this.rwData = rwData; // 入网数
          _this.zsData = zsData; // 车辆总数
          _this.dataSelectId = dataSelectId; // 地区ID、服务商ID、企业ID
          _this.chart.clear(); //每次画图之前都先清除掉之前的 清空图表
          _this.drawPie('banReport'); // 清除完再画
          // 绑定点击事件
          _this.chart.on('click', function(param){
            var index = param.dataIndex;
            var dataId = _this.dataSelectId[index]; // 选择项id
            _this.$router.push({
              path: '/zxDetail',
              query: {
                dataId: dataId,
                nowSelect: nowSelect,
                userId: userId
              }
            });
          });
        } else {
          _this.ajaxLoader('数据正在加载中,请稍候！');
          axios.post('/api/Online/QueryOnlineTotal', postData).then(res => {
            // 返回数据：
            // 1根据展示方式，返回地区ID、服务商ID、企业ID
            // 2根据展示方式，返回地区名称、服务商名称、企业名称
            // 3在线数、入网数、车辆总数
            /*var res = {
             "code": 0,
             "data": [
             {zId: 100, yName: '成都市', zxNum: 220, rwNum: 1200, zsNum: 2220},
             {zId: 101, yName: '自贡市', zxNum: 232, rwNum: 1302, zsNum: 1282},
             {zId: 102, yName: '成都市', zxNum: 220, rwNum: 1200, zsNum: 2220},
             {zId: 103, yName: '自贡市', zxNum: 232, rwNum: 1302, zsNum: 1282},
             {zId: 104, yName: '成都市', zxNum: 220, rwNum: 1200, zsNum: 2220},
             {zId: 105, yName: '自贡市', zxNum: 232, rwNum: 1302, zsNum: 1282},
             {zId: 106, yName: '成都市', zxNum: 220, rwNum: 1200, zsNum: 2220}
             ]
             };*/
            _this.ajaxComplete();
            sessionStorage.setItem('onlineData'+nowSelect,JSON.stringify(res.data)); // 动态缓存数据（）
            console.log(sessionStorage.getItem('onlineData'+nowSelect));
            var res = JSON.parse(res.data);
            if (res.code == 0) {
              if (res.data.length > 0) { // 有数据
                var data = res.data.reverse(); // 让成都的显示在最后，及柱形图的最上面那个
                var yData = [], // 纵坐标，数据项名称
                  zxData = [], // 在线数
                  rwData = [], // 入网数
                  zsData = [], // 车辆总数
                  dataSelectId = []; // 地区ID、服务商ID、企业ID
                for (var i in data) {
                  if (data[i].yName.length > 5) {
                    yData.push(data[i].yName.substring(0,5));
                  } else {
                    yData.push(data[i].yName);
                  }
                  zxData.push(data[i].zxNum);
                  rwData.push(data[i].rwNum);
                  zsData.push(data[i].zsNum);
                  dataSelectId.push(data[i].zId);
                }
                _this.yData = yData; // 纵坐标，数据项名称
                _this.zxData = zxData; // 在线数
                _this.rwData = rwData; // 入网数
                _this.zsData = zsData; // 车辆总数
                _this.dataSelectId = dataSelectId; // 地区ID、服务商ID、企业ID
                _this.chart.clear(); //每次画图之前都先清除掉之前的 清空图表
                _this.drawPie('banReport'); // 清除完再画
                // 绑定点击事件
                _this.chart.on('click', function(param){
                  var index = param.dataIndex;
                  var dataId = _this.dataSelectId[index]; // 选择项id
                  _this.$router.push({
                    path: '/zxDetail',
                    query: {
                      dataId: dataId,
                      nowSelect: nowSelect,
                      userId: userId
                    }
                  });
                });
              }
            } else {
              console.log(res.msg);
            }
          }).catch(error => {
            console.log(error);
          });
        }
      },
      // 图表绘制
      drawPie (id) {
        this.chart = echarts.init(document.getElementById(id));
        this.chart.setOption({
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:['在线数', '入网数','车辆总数']
          },
          grid: {
            x: '0', // 距离左边距离
            y: '10%',// 距离顶部距离
            containLabel: true
          },
          calculable : true,
          xAxis : [
            {
              type : 'value',
              //max: '230000'
            }
          ],
          yAxis : [
            {
              type : 'category',
              data : this.yData
            }
          ],
          series : [
            {
              name:'在线数',
              type:'bar',
              data:this.zxData
            },
            {
              name:'入网数',
              type:'bar',
              data:this.rwData
            },
            {
              name:'车辆总数',
              type:'bar',
              data:this.zsData
            }
          ]
        })
      }
    },

    mounted () {
      var _this = this;
      this.$nextTick(function(){
        setTimeout(() => { // 这个是一个初始化默认值的一个技巧
          _this.addressSlots[0].defaultIndex = 0;
        }, 0);
        // 初始化图表
        // 这里先init一个echarts对象，防止searchByFilter里面调用clear()方法时报错
        _this.chart = echarts.init(document.getElementById('banReport'));
        _this.searchByFilter();

      });
    },
    watch: {
      // 监听下拉列表值的变化
      showValue(newVal, oldVal) {
        this.searchByFilter();
      }
    }
  }

</script>
<style lang="scss"  type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';
  @import '../../assets/scss/base.scss';

  @media screen and (max-width: 400px) {
    .demo-ruleForm {
      .el-col-12 {
        width: 49%;
      }
    }
  }

  #sixStrictBan {
    width: 100%;
    height: auto;

    .address {
      select {
        width: 30%;
        display: inline-block;

        option {
          width: 100%;
        }
      }
    }

    .search-form {
      @include pxrem(width, 700);
      margin: auto;
      @include pxrem(height, 300);

      .switch-line {
        width: 100%;
        @include pxrem(height, 84);
        @include pxrem(margin-bottom, 30);
        @include pxrem(margin-top, 40);
        .el-select {
          padding: 0!important;
        }
        input {
          border: none;
        }
      }
      .list {
        float: left;
        @include pxrem(width, 280);
        @include pxrem(height, 130);
        @include pxrem(margin-top, 20);
        @include pxrem(margin-left, 35);

        label {
          display: block;
          @include pxrem(width, 280);
          @include pxrem(height, 60);
          @include pxrem(line-height, 60);
          text-align: left;
          color: #48576a;
          @include pxrem(font-size, 24);
        }

        input {
          display: block;
          @include pxrem(width, 280);
          @include pxrem(height, 70);
          border: 1px solid #bfcbd9;
          @include pxrem(border-radius, 5);
          @include pxrem(padding,3 10);
        }

        .el-select {
          display: block;
          @include pxrem(width, 280);
          @include pxrem(height, 70);
          @include pxrem(border-radius, 5);
          @include pxrem(padding,3 10);
        }
      }

    }

    .search-btn {
      @include pxrem(width, 595);
      @include pxrem(height, 70);
      @include pxrem(line-height, 70);
      color: #fff;
      background-color: #20a0ff;
      text-align: center;
      @include pxrem(margin,30 auto 30 60);
      @include pxrem(border-radius, 5);
    }

    form {
      width: 90%;
      height: auto;
      @include pxrem(margin, 20 auto);
    }



    .demo-ruleForm .address.el-row {
      margin-left: -15px!important;
      margin-right: -15px!important;
    }
  }

  #banReport {
    width: 98%;
    margin: auto;
    @include pxrem(height,1100);
    /*height: 100%;*/
  }

  .mint-popup-top {
    top: 30%;
  }




</style>
