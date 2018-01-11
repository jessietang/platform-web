<template lang="html">
  <div id="companyCheckReport">
    <div class="top">
      <div class="top-back" @click="goBack()">
        <img src="../../../static/img/back.png" alt=""/>
      </div>
      <div class="top-title">
        服务商考核统计
      </div>
    </div>
    <el-collapse>
      <el-collapse-item title="查询条件" name="1">
        <el-form :label-position="labelPosition" label-width="80px" :model="form">
          <!--1.接入平台-->
          <input-text :labelName="form.platformLabel" :inputValue="form.platformDbVal"></input-text>

          <!--2.开始日期-->
          <date-picker :labelName="form.startTimeLabel" :dateValue="form.startTimeDbVal"></date-picker>

          <!--3.结束日期-->
          <date-picker :labelName="form.endTimeLabel" :dateValue="form.endTimeDbVal"></date-picker>

          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="btn-query">查询</el-button>
          </el-form-item>


          <div style="display:none">
            <div>数据库提交值：{{form.platformDbVal}}</div>
            <div>数据库提交值：{{form.startTimeDbVal}}</div>
            <div>数据库提交值：{{form.endTimeDbVal}}</div>
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
        prop="PlatformName"
        label="接入平台名称"
        >
      </el-table-column>
      <el-table-column
        fixed
        prop="ProviderName"
        label="所属服务商名称">
      </el-table-column>
      <el-table-column
        prop="Score"
        label="总分">
      </el-table-column>

      <el-table-column label="平台连通率">
        <el-table-column
          prop="ConnectedTimeAll"
          label="应连通时长"
          width="120">
        </el-table-column>
        <el-table-column
          prop="ConnectedTime"
          label="实际连通时长"
          width="120">
        </el-table-column>
        <el-table-column
          prop="ConnectedRate"
          label="连通率（%）"
          width="300">
        </el-table-column>
        <el-table-column
          prop="ConnectedScore"
          label="分数"
          width="120">
        </el-table-column>
      </el-table-column>

      <el-table-column label="车辆上线率">
        <el-table-column
          prop="InnetCount"
          label="入网车辆数"
          width="120">
        </el-table-column>
        <el-table-column
          prop="OnlineCount"
          label="上线车辆数"
          width="120">
        </el-table-column>
        <el-table-column
          prop="OnlineRate"
          label="上线率（%）"
          width="300">
        </el-table-column>
        <el-table-column
          prop="OnlineScore"
          label="分数"
          width="120">
        </el-table-column>
      </el-table-column>

      <el-table-column label="轨迹完整率">
        <el-table-column
          prop="OnlineCount1"
          label="上线车辆总天次"
          width="120">
        </el-table-column>
        <el-table-column
          prop="VehicleCount_FULL"
          label="轨迹完整车辆天次"
          width="120">
        </el-table-column>
        <el-table-column
          prop="FULLRate"
          label="轨迹完整率（%）"
          width="300">
        </el-table-column>
        <el-table-column
          prop="FullScore"
          label="分数"
          width="120">
        </el-table-column>
      </el-table-column>

      <el-table-column label="数据合格率">
        <el-table-column
          prop="StaticValidRate"
          label="静态数据合格率（%）"
          width="120">
        </el-table-column>
        <el-table-column
          prop="StaticValidScore"
          label="分数（静）"
          width="120">
        </el-table-column>
        <el-table-column
          prop="DynamicValidRate"
          label="动态数据合格率（%）"
          width="300">
        </el-table-column>
        <el-table-column
          prop="DynamicValidScore"
          label="分数（动）"
          width="120">
        </el-table-column>
      </el-table-column>

      <el-table-column label="卫星漂移率">
        <el-table-column
          prop="OnlineCount2"
          label="上线车辆总天次"
          width="120">
        </el-table-column>
        <el-table-column
          prop="VehiclePYCNT"
          label="卫星漂移车辆天次"
          width="120">
        </el-table-column>
        <el-table-column
          prop="VehiclePYRate"
          label="卫星漂移率（%）"
          width="300">
        </el-table-column>
        <el-table-column
          prop="VehicleScore"
          label="分数"
          width="120">
        </el-table-column>
      </el-table-column>

    </el-table>
  </div>
</template>
<script lang="babel">
  import {mapState} from 'vuex'
  import inputText from '../formInput/inputText'
  import datePicker from '../formInput/datePicker'
  import $ from 'n-zepto'
  export default {
    components: {
      inputText,
      datePicker
    },
    data () {
      return {
        labelPosition: 'right',
        form: {
          // 接入平台
          platformLabel: '接入平台',
          platformDbVal: '',
          // 开始日期
          startTimeLabel: '开始日期',
          startTimeDbVal: '',
          // 结束日期
          endTimeLabel: '开始日期',
          endTimeDbVal: '',
        }, // form end...
        // 报表数据
        vehicleInfoData: [

        ],
      }
  },
  created () {

  },
  computed: {

  },
  methods: {
    goBack () {
      this.$router.go(-1);
    },
    onSubmit() {
      $('.el-collapse-item').toggleClass('is-active');
      $('.el-collapse-item__wrap').hide();
      console.log('submit!');
      var model = {
        "PlatformName":"网阔GPS企业平台 ",
        "PlatformId":"510001",
        "BeginDate":"20171030",
        "EndDate":"20171030",
        "PageIndex":1,
        "PageSize":10,
        "IsSplitPage":true,
        "TotalIndex":-1
      };
      var postData = {
        nType: 1,
        Model: JSON.stringify(model)
      };
      // 这个接口估计没得，还有问题，一直报302这个错误
      // 2017-12-05: 初步衡量了一下，不同项目用的接口根路径不同，这里接口是sp系统的，不是四川系统里面的，故不能用。
      // 2017-12-05: 现在把url请求的根路径改回来（改成：http://125.71.30.136/AppWebApi, 之前为了兼容这里的这个接口，写的是：http://125.71.30.136）
      /*axios.post('/Report/GetServiceProviderCheckData',postData).then(res => {
        console.log(res.retVal);
        console.log(typeof res.retVal)
        //this.vehicleInfoData = res.data;
      });*/
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
