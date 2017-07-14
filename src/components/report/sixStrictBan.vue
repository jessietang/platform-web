<template lang="html">
  <div id="sixStrictBan">
    <!--查询条件-->
    <el-form ref="form" :model="form" label-width="60px" class="form">
      <el-form-item label="地区" style="margin-bottom: 12px;">
        <el-form class="demo-ruleForm"  label-position="top" style="margin-bottom: 0;">
          <el-row :gutter="20" class="address">
            <el-col :span="12" style="padding-left:0;padding-right:10px;">
              <el-form-item prop="province">
                <el-select v-model="form.place.province" placeholder="请输入省" >
                  <el-option
                    v-for="item in provinces"
                    :key="item.value"
                    :value="item.value"
                    ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12" style="padding-left:10px;padding-right:0;">
              <el-form-item  prop="city">
                <el-select v-model="form.place.city" placeholder="请选择市" >
                  <el-option
                    v-for="item in cities"
                    :key="item.value"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="24" style="margin-top: 10px;padding-left:0;padding-right:0;">
              <el-form-item prop="detail">
                <el-input placeholder="请填写详细地址" :number="true" v-model="form.place.detail"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-form-item>
      <el-form-item label="服务商" style="margin-bottom: 12px;">
        <el-input v-model="form.serviceProvider" placeholder="请填写服务商"></el-input>
      </el-form-item>
      <el-form-item label="企业" style="margin-bottom: 12px;">
        <el-input v-model="form.company" placeholder="请填写企业"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchByFilter()" style="width: 100%;">查&nbsp;&nbsp;询</el-button>
      </el-form-item>
    </el-form>

    <!--切换按钮 企业、地区、服务商-->
    <div class="switch-line clearfix">
      <label for="">展示方式：</label>
      <el-select v-model="showValue" placeholder="请选择">
        <el-option
          v-for="item in showOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <!--图表渲染-->
    <div id="banReport" class="clearfix" @click=""></div>
  </div>
</template>
<script lang="babel">
  import echarts from 'echarts'
  import axios from 'axios'
  import $ from 'n-zepto'
  import addressData from '../../assets/js/lib/addressData.js'
  function formatData (data) {
    var result = []
    for (var key in data) {
      result.push({
        value: key
      })
    }
    return result
  }

  export default {
    data () {
      return {
        // 查询条件数据
        form: {
          serviceProvider: '',
          company: '',
          place: {
            province: '四川省',
            city: '',
            district: '',
            detail: ''
          }
        },
        // 下拉切换选择数据
        showOptions: [{
          value: '地区',
          label: '地区'
        }, {
          value: '服务商',
          label: '服务商'
        }, {
          value: '企业',
          label: '企业'
        }],
        showValue: '地区',
        provinces: formatData(addressData),
        // 图表数据
        yData: ['成都市','自贡市','攀枝花市','泸州市','德阳市','绵阳市','广元市'],
        chart: null,
        zxData: [320, 302, 301, 334, 390, 330, 320],
        rwData: [120, 132, 101, 134, 90, 230, 210],
        zsData: [220, 182, 191, 234, 290, 330, 310],
      }
    },
    computed: {
      cities () {
        return formatData(addressData[this.form.place.province])
      }
    },
    methods: {
      // 条件搜索
      searchByFilter () {
        var province = this.form.place.province;
        var city = this.form.place.city;
        var district = this.form.place.detail;
        var detail = this.form.place.detail;
        var serviceProvider = this.form.serviceProvider;
        var company = this.form.company;
        var nowSelect = this.showValue; // 默认展示方式

        var postData = {};
        // 模拟的
        this.zxData = [20, 2, 1, 4, 39, 30, 20];
        this.chart.clear(); //清空图表
        this.drawPie('banReport');

        /*axios.post('',postData).then(res => {
          if (res.code == 0) {
            // do sth
            // 拿到各种需要的data后，把data值重新赋值，然后清空之前的，再重新绘制一次图表
             this.zxData = [20, 2, 1, 4, 39, 30, 20];
             this.chart.clear(); //清空图表
             this.drawPie('banReport');
          }
        }).catch(error => {
          console.log(error);
        });*/
      },
      // 图表绘制
      drawPie (id) {
        this.chart = echarts.init(document.getElementById(id))
        this.chart.setOption({
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            x: '0', // 距离左边距离
            y: '10%',// 距离顶部距离
            containLabel: true
          },
          legend: {
            data:['在线数', '入网数','车辆总数']
          },
          calculable : true,
          xAxis : [
            {
              type : 'value'
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
              stack: '总量',
              itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
              data: this.zxData
            },
            {
              name:'入网数',
              type:'bar',
              stack: '总量',
              itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
              data: this.rwData
            },
            {
              name:'车辆总数',
              type:'bar',
              stack: '总量',
              itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
              data: this.zsData
            }
          ]
        })
      }
    },
    mounted () {
      var _this = this;
      this.$nextTick(function(){
        // 初始化的时候，先去请求接口，然后在画图
        /*let data = {
         userId: 192,
         dataType: 'json'
         }
         axios.get('/activity/findTop100UserPrizes', data).then(res => {
         if (res.data.code === 0) {
         let opinionData = res.data.data
         this.opinionData = opinionData
         }
         }).catch(error => {
         console.log(error)
         })*/
        this.rwData = [1200, 1302, 1010, 1304, 900, 2030, 2100];
        this.drawPie('banReport');
        // 绑定点击事件
        this.chart.on('click', function(param){
          var index = param.dataIndex;
          _this.$router.push({
            path: '/zxDetail',
            query: {
              dataId: index
            }
          });
        })
      });
    },
    watch: {
      // 监听下拉列表值的变化
      showValue(newVal, oldVal) {
        // 注意这里不需要清除以前的数据this.chart.clear()，因为可能点这里的时候，上面选择的条件早就已经选择了，这里只是切换展示方式
        alert('now: '+ newVal);
        // 模拟的
        this.yData = ['111','222','333','444','555','666','777'];
        this.drawPie('banReport');

        var nowSelect = newVal;
        var postData = {};
        /*axios.post('', postData).then(res => {
          if (res.code == 0) {
            this.yData = ['111','222','333','444','555','666','777'];
            this.drawPie('banReport');
          }
        }).catch(error => {
          console.log(error);
        })*/

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

    form {
      width: 90%;
      height: auto;
      @include pxrem(margin, 20 auto);
    }

    .switch-line {
      width: 100%;
      @include pxrem(height, 84);
      @extend %flex-center;
      @include pxrem(margin-bottom, 30);
    }

    .demo-ruleForm .address.el-row {
      margin-left: -15px!important;
      margin-right: -15px!important;
    }

  }

  #banReport {
    width: 98%;
    margin: auto;
    @include pxrem(height,700);
    /*height: 100%;*/
  }



</style>
