<template lang="html">
    <div id="vehicleInfoReport">
      <div class="top">
        <div class="top-back" @click="goBack()">
          <img src="../../../static/img/back.png" alt=""/>
        </div>
        <div class="top-title">
          车辆基本信息报表
        </div>
      </div>
      <el-collapse>
        <el-collapse-item title="查询条件" name="1">
          <el-form :label-position="labelPosition" label-width="80px" :model="form">
            <!--1.车牌号-->
            <input-text :labelName="form.plateLabel" :inputValue="form.plateNumDbVal"></input-text>

            <!--2.车牌颜色-->
            <select-comp :options="form.colorOptions" :labelName="form.colorLabel"
                         :selectValue="form.colorSelectVal" @updateSelectVal="updateColorSelectVal" :isMultiple="false"></select-comp>

            <!--3.车辆类型-->
            <select-comp :options="form.carTypeOptions" :labelName="form.carTypeLabel"
                         :selectValue="form.carTypeSelectVal" @updateSelectVal="updateCarTypeSelectVal" :isMultiple="true"></select-comp>

            <!--4.道路运输企业-->
            <select-comp :options="unitOptions" :labelName="form.unitLabel"
                         :selectValue="form.unitSelectVal" @updateSelectVal="updateUnitSelectVal" :isMultiple="false"></select-comp>

            <!--5.所属地区-->
            <select-comp :options="zoneOptions" :labelName="form.zoneLabel"
                         :selectValue="form.zoneSelectVal" @updateSelectVal="updateZoneSelectVal" :isMultiple="false"></select-comp>

            <!--6.服务商-->
            <select-comp :options="providerOptions" :labelName="form.providerLabel"
                         :selectValue="form.providerSelectVal" @updateSelectVal="updateProviderSelectVal" :isMultiple="false"></select-comp>

            <!--7.卫星定位安装情况-->
            <select-comp :options="form.gpsInstallOptions" :labelName="form.gpsInstallLabel"
                         :selectValue="form.gpsInstallSelectVal" @updateSelectVal="updateGpsInstallSelectVal" :isMultiple="false"></select-comp>

            <!--8.是否支持视频-->
            <select-comp :options="form.isVedioOptions" :labelName="form.isVedioLabel"
                         :selectValue="form.isVedioSelectVal" @updateSelectVal="updateIsVedioSelectVal" :isMultiple="false"></select-comp>

            <!--9.是否支持行驶记录仪-->
            <select-comp :options="form.isTravelOptions" :labelName="form.isTravelLabel"
                         :selectValue="form.isTravelSelectVal" @updateSelectVal="updateIsTravelSelectVal" :isMultiple="false"></select-comp>

            <!--10.终端型号-->
            <select-comp :options="deviceTypeOptions" :labelName="form.deviceTypeLabel"
                         :selectValue="form.deviceTypeSelectVal" @updateSelectVal="updateDeviceTypeSelectVal" :isMultiple="false"></select-comp>

            <!--11.SIM卡号-->
            <input-text :labelName="form.simLabel" :inputValue="form.simNumDbVal"></input-text>

            <!--12.状态-->
            <select-comp :options="form.govStatusOptions" :labelName="form.govStatusLabel"
                         :selectValue="form.govStatusSelectVal" @updateSelectVal="updateGovStatusSelectVal" :isMultiple="true"></select-comp>

            <!--13.定位模式-->
            <select-comp :options="form.locateModeOptions" :labelName="form.locateModeLabel"
                         :selectValue="form.locateModeSelectVal" @updateSelectVal="updateLocateModeSelectVal" :isMultiple="false"></select-comp>

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
              // 车牌号
              plateLabel: '车牌号',
              plateNumDbVal: '',
              // 车牌颜色
              colorSelectVal: '',
              colorDbVal: 0,
              colorLabel: '车牌颜色',
              colorOptions: [
                {label: '黄', value: '2'},
                {label: '蓝', value: '1'},
                {label: '白', value: '4'},
                {label: '黑', value: '3'},
                {label: '其他', value: '9'}
              ],
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
              // 道路运输企业
              unitSelectVal: '',
              unitDbVal: 0,
              unitLabel: '道路运输企业',
              // 所属地区
              zoneSelectVal: '',
              zoneDbVal: 0,
              zoneLabel: '所属地区',
              // 服务商
              providerSelectVal: '',
              providerDbVal: 0,
              providerLabel: '服务商',
              // 卫星定位安装情况
              gpsInstallSelectVal: '-1', // 默认选中
              gpsInstallDbVal: 0,
              gpsInstallLabel: '卫星定位安装情况',
              gpsInstallOptions: [
                {label: '全部', value: '-1'},
                {label: '已安装', value: '1'},
                {label: '未安装', value: '0'},
              ],
              // 是否支持视频
              isVedioSelectVal: '-1',
              isVedioDbVal: 0,
              isVedioLabel: '是否支持视频',
              isVedioOptions: [
                {label: '全部', value: '-1'},
                {label: '是', value: '1'},
                {label: '否', value: '0'},
              ],
              // 是否支持行驶记录仪
              isTravelSelectVal: '-1',
              isTravelDbVal: 0,
              isTravelLabel: '是否支持视频',
              isTravelOptions: [
                {label: '全部', value: '-1'},
                {label: '是', value: '1'},
                {label: '否', value: '0'},
              ],
              // 终端型号
              deviceTypeSelectVal: '',
              deviceTypeDbVal: 0,
              deviceTypeLabel: '终端型号',
              // SIM卡号
              simLabel: 'SIM卡号',
              simNumDbVal: '',
              // 车辆状态
              govStatusSelectVal: '',
              govStatusDbVal: 0,
              govStatusLabel: '状态',
              govStatusOptions: [
                {label: '营运', value: '2'},
                {label: '报废', value: '1'},
                {label: '停运', value: '4'},
                {label: '注销', value: '8'},
                {label: '转出', value: '16'},
                {label: '挂失', value: '32'},
                {label: '歇业', value: '64'},
                {label: '锁定', value: '256'},
                {label: '删除', value: '128'}
              ],
              // 定位模式
              locateModeSelectVal: '-1',
              locateModeDbVal: 0,
              locateModeLabel: '定位模式',
              locateModeOptions: [
                {label: '全部', value: '-1'},
                {label: 'GPS', value: '1'},
                {label: '北斗', value: '2'},
                {label: 'GPS/北斗双模', value: '3'}
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
          updateUnitSelectVal (val, dbVal) {
            this.form.unitSelectVal = val;
            this.form.unitDbVal = dbVal;
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

  #vehicleInfoReport {
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
