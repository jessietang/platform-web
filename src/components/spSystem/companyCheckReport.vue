<template lang="html">
  <div id="companyCheckReport">
    <div class="top">
      <div class="top-back" @click="goBack()">
        <img src="../../../static/img/back.png" alt=""/>
      </div>
      <div class="top-title">
        企业考核统计报表
      </div>
    </div>
    <el-collapse>
      <el-collapse-item title="查询条件" name="1">
        <el-form :label-position="labelPosition" label-width="80px" :model="form">
          <!--1.所属地区-->
          <input-text :labelName="form.zoneLabel" :inputValue="form.zoneDbVal"></input-text>

          <!--2.考核类型-->
          <select-comp :options="form.checkTypeOptions" :labelName="form.checkTypeLabel"
                       :selectValue="form.checkTypeSelectVal" @updateSelectVal="updateCheckTypeSelectVal" :isMultiple="false"></select-comp>

          <!--3.月-->
          <div class="block">
            <span class="demonstration">月</span>
            <el-date-picker
              v-model="value4"
              type="month"
              placeholder="选择月">
            </el-date-picker>
          </div>

          <!--4.车辆类型-->
          <select-comp :options="form.carTypeOptions" :labelName="form.carTypeLabel"
                       :selectValue="form.carTypeSelectVal" @updateSelectVal="updateCarTypeSelectVal" :isMultiple="true"></select-comp>

          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="btn-query">查询</el-button>
          </el-form-item>


          <div style="display:none">
            <div>数据库提交值：{{form.plateNumDbVal}}</div>
            <div>数据库提交值：{{form.colorDbVal}}</div>
            <div>数据库提交值：{{form.carTypeDbVal}}</div>
            <div>数据库提交值：{{form.unitDbVal}}</div>
            <div>数据库提交值：{{form.zoneDbVal}}</div>
            <div>数据库提交值：{{form.providerDbVal}}</div>
            <div>数据库提交值：{{form.gpsInstallDbVal}}</div>
            <div>数据库提交值：{{form.isVedioDbVal}}</div>
            <div>数据库提交值：{{form.isTravelDbVal}}</div>
            <div>数据库提交值：{{form.deviceTypeDbVal}}</div>
            <div>数据库提交值：{{form.simNumDbVal}}</div>
            <div>数据库提交值：{{form.govStatusDbVal}}</div>
            <div>数据库提交值：{{form.locateModeDbVal}}</div>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <el-table
      :data="vehicleInfoData"
      border
      style="width: 100%"
      height="300">
      <el-table-column
        fixed
        prop="plateNum"
        label="车牌号"
        >
      </el-table-column>
      <el-table-column
        fixed
        prop="plateColor"
        label="车牌颜色">
      </el-table-column>
      <el-table-column
        prop="carType"
        label="车辆类型">
      </el-table-column>
      <el-table-column
        prop="unitName"
        label="道路运输企业">
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="babel">
  import {mapState} from 'vuex'
  import inputText from '../formInput/inputText'
  import selectComp from '../formInput/selectComp'
  import $ from 'n-zepto'
  export default {
    components: {
      inputText,
      selectComp
    },
    data () {
    return {
      labelPosition: 'right',
      form: {
        // 所属地区
        zoneLabel: '所属地区',
        zoneIdDbVal: '',
        // 考核类型
        checkTypeSelectVal: '',
        checkTypeDbVal: 0,
        checkTypeLabel: '考核类型',
        checkTypeOptions: [
          {label: '月度考核', value: '1'},
          {label: '年度考核', value: '2'},
          {label: '当月实时考核', value: '3'},
        ],
        // 月
        dateMonth: '',
        // 年
        dateYear: '',
        // 日期范围
        dateRange: '',
        // 车辆类型
        carTypeSelectVal: '',
        carTypeDbVal: 0,
        carTypeLabel: '车辆类型',
        carTypeOptions: [
          {label: '三类以上班线客车', value: '1'},
          {label: '高速客车', value: '4096'},
          {label: '超长客车', value: '2'},
          {label: '旅游客车', value: '4'},
          {label: '包车客车', value: '1048576'},
          {label: '危险品运输车', value: '128'},
          {label: '重型货物运输车', value: '16'},
          {label: '半挂牵引车', value: '32'},
          {label: '普通货车', value: '32768'},
          {label: '农村客运', value: '8192'},
          {label: '驾培车', value: '65536'},
          {label: '出租车', value: '16384'},
          {label: '公交车', value: '131072'},
          {label: '租赁客车', value: '2097152'},
          {label: '校园车辆', value: '262144'},
          {label: '其他车', value: '524288'}
        ],
      }, // form end...
      // 报表数据
      vehicleInfoData: [

      ],
    }
  },
  created () {
    var _this = this;
    _this.$store.dispatch('getOptions');
  },
  computed: {
  ...mapState([
      'unitOptions',
      'zoneOptions',
      'providerOptions',
      'deviceTypeOptions'
    ]),
  },
  methods: {
    goBack () {
      this.$router.go(-1);
    },
    onSubmit() {
      $('.el-collapse-item').toggleClass('is-active');
      $('.el-collapse-item__wrap').hide();
      console.log('submit!');
      var postData = {
        text: '川',
        type: 1002, // 车的类型
        userId: 2246
      };
      axios.get('api/autocomplete',{params: postData}).then(res => {
        this.vehicleInfoData = [
          {
            plateNum: '川AF8726',
            plateColor: '黄',
            carType: '危险品运输车',
            unitName: '四川省邛崃市运输公司1'
          },
          {
            plateNum: '川AF8726',
            plateColor: '黄',
            carType: '危险品运输车',
            unitName: '四川省邛崃市运输公司2'
          },
          {
            plateNum: '川AF8726',
            plateColor: '黄',
            carType: '危险品运输车',
            unitName: '四川省邛崃市运输公司3'
          },
        ]
      });
    },
    updateColorSelectVal (val, dbVal) {
      this.form.colorSelectVal = val;
      this.form.colorDbVal = dbVal;
    },
    updateCarTypeSelectVal (val, dbVal) {
      this.form.carTypeSelectVal = val;
      this.form.carTypeDbVal = dbVal;
    },
    updateCheckTypeSelectVal (val, dbVal) {
      this.form.checkTypeSelectVal = val;
      this.form.checkTypeDbVal = dbVal;
    },
    updateZoneSelectVal (val, dbVal) {
      this.form.zoneSelectVal = val;
      this.form.zoneDbVal = dbVal;
    },
    updateProviderSelectVal (val, dbVal) {
      this.form.providerSelectVal = val;
      this.form.providerDbVal = dbVal;
    },
    updateGpsInstallSelectVal (val, dbVal) {
      this.form.gpsInstallSelectVal = val;
      this.form.gpsInstallDbVal = dbVal;
    },
    updateIsVedioSelectVal (val, dbVal) {
      this.form.isVedioSelectVal = val;
      this.form.isVedioDbVal = dbVal;
    },
    updateIsTravelSelectVal (val, dbVal) {
      this.form.isTravelSelectVal = val;
      this.form.isTravelDbVal = dbVal;
    },
    updateDeviceTypeSelectVal (val, dbVal) {
      this.form.deviceTypeSelectVal = val;
      this.form.deviceTypeDbVal = dbVal;
    },
    updateGovStatusSelectVal (val, dbVal) {
      this.form.govStatusSelectVal = val;
      this.form.govStatusDbVal = dbVal;
    },
    updateLocateModeSelectVal (val, dbVal) {
      this.form.LocateModeSelectVal = val;
      this.form.LocateModeDbVal = dbVal;
    },
  }
  }
</script>
<style lang="scss" type="text/css">
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/scss/flexmixin.scss';
  @import '../../assets/scss/base.scss';

  #companyCheckReport {
    .top {
      width: 100%;
      @include pxrem(height, 80);
      @extend %flex-left;
      .top-back {
        @include pxrem(width, 64);
        @include pxrem(height, 64);
        @include pxrem(margin, 8 0 8 2);
        img {
          @include pxrem(width, 64);
          @include pxrem(height, 64);
        }
      }
      .top-title {
        width: 100%;
        @include pxrem(height, 80);
        @include pxrem(line-height, 80);
        @include pxrem(font-size, 36);
        text-align: center;
        color: #1296db;
      }
    }

  .el-collapse-item {
    position: relative;
    z-index: 20;

  .el-collapse-item__wrap {
    position: absolute;
    top: 43px;
    z-index: 2147483647;
    width: 100%;
    /*@include pxrem(height, 800);
    overflow-y: scroll;*/
  }
  }

  .el-select {
    width: 100%;
  }


  }
</style>
