/**
 * Created by jessietang on 2017/6/24.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  // 用户信息
  userInfo: JSON.parse(localStorage.getItem('platformUserInfo')), // 用户信息： userId zoneId
  loginState: localStorage.getItem('platformLoginState'), // 登录状态
  // 查到的车的详细信息 或者当前点击查看的车的详细信息
  carDetail: {
    carId: 0,
    carType: '',
    carPlat: '',
    carColor: 'yyyy',
    unitName: '',
    platformName: '',
    location: '',
    corporation: '', // 所属营运商
    gpsDateCvt: '' // 最后定位时间
  },
  iconItems : [
    {
      id: 1,
      name: '正北方向',
      direction: './static/img/d1.png',
      dot: './static/img/icon1.png'
    },
    {
      id: 2,
      name: '东北方向',
      direction: './static/img/d2.png',
      dot: './static/img/icon2.png'
    },
    {
      id: 3,
      name: '正东方向',
      direction: './static/img/d3.png',
      dot: './static/img/icon3.png'
    },
    {
      id: 4,
      name: '东南方向',
      direction: './static/img/d4.png',
      dot: './static/img/icon4.png'
    },
    {
      id: 5,
      name: '正南方向',
      direction: './static/img/d5.png',
      dot: './static/img/icon5.png'
    },
    {
      id: 6,
      name: '西南方向',
      direction: './static/img/d6.png',
      dot: './static/img/icon6.png'
    },
    {
      id: 7,
      name: '正西方向',
      direction: './static/img/d7.png',
      dot: './static/img/icon7.png'
    },
    {
      id: 8,
      name: '西北方向',
      direction: './static/img/d8.png',
      dot: './static/img/icon8.png'
    }
  ],
  unitOptions: JSON.parse(sessionStorage.getItem('unitOptions')),
  zoneOptions: JSON.parse(sessionStorage.getItem('zoneOptions')),
  providerOptions: JSON.parse(sessionStorage.getItem('providerOptions')),
  deviceTypeOptions: JSON.parse(sessionStorage.getItem('deviceTypeOptions')),
}

const getters = {

}

const mutations = {
  // 保存车辆信息
  SAVE_CAR_INFO: (state, carDetailObj) => {
    state.carDetail.carId = carDetailObj.carId;
    state.carDetail.carType = carDetailObj.carType;
    state.carDetail.carPlat = carDetailObj.carPlat;
    state.carDetail.carColor = carDetailObj.carColor;
    state.carDetail.unitName = carDetailObj.unitName;
    state.carDetail.platformName = carDetailObj.platformName;
    state.carDetail.location = carDetailObj.location;
    state.carDetail.corporation = carDetailObj.corporation;
    state.carDetail.gpsDateCvt = carDetailObj.gpsDateCvt;
  },
  GET_UNIT_OPTIONS: (state, unitOptions) => {
    //state.unitOptions = unitOptions;
    // 保存在localStorage里面，防止刷新浏览器vuex数据消失
    if (!sessionStorage.getItem('unitOptions')) {
      sessionStorage.setItem('unitOptions', JSON.stringify(unitOptions))
    }
  },
  GET_ZONE_OPTIONS: (state, zoneOptions) => {
    //state.zoneOptions = zoneOptions;
    if (!sessionStorage.getItem('zoneOptions')) {
      sessionStorage.setItem('zoneOptions', JSON.stringify(zoneOptions))
    }
  },
  GET_PROVIDER_OPTIONS: (state, providerOptions) => {
    //state.providerOptions = providerOptions;
    if (!sessionStorage.getItem('providerOptions')) {
      sessionStorage.setItem('providerOptions', JSON.stringify(providerOptions))
    }
  },
  GET_DEVICE_TYPE_OPTIONS: (state, deviceTypeOptions) => {
    if (!sessionStorage.getItem('deviceTypeOptions')) {
      sessionStorage.setItem('deviceTypeOptions', JSON.stringify(deviceTypeOptions))
    }
  }
}

const actions = {
  saveCarInfo: ({commit}, carDetailObj) => {
    commit('SAVE_CAR_INFO', carDetailObj)
  },
  // 获取运输企业数据
  getOptions: ({commit}) => {
    var postData = {
      text: '川',
      type: 1002, // 车的类型
      userId: 2246
    };

    // need to do...
    // 获取运输企业数据
    var unitOptions = [];
    axios.get('api/autocomplete',{params: postData}).then(res => {
      unitOptions = [
        {label: '成都富临长运集团有限公司', value: '1001'},
        {label: '四川东方龙运业有限公司', value: '3519'},
        {label: '四川省汽车运输成都公司', value: '3520'},
      ];
      commit('GET_UNIT_OPTIONS', unitOptions)
    });
    // 获取所属地区数据
    var zoneOptions = [];
    axios.get('api/autocomplete',{params: postData}).then(res => {
      zoneOptions = [
        {label: '四川省', value: '51000000'},
        {label: '成都市', value: '51010000'},
        {label: '自贡市', value: '51030000'},
      ];
      commit('GET_ZONE_OPTIONS', zoneOptions)
    });
    // 获取服务商数据
    var providerOptions = [];
    axios.get('api/autocomplete',{params: postData}).then(res => {
      providerOptions = [
        {label: '巴中市伊爱科贸有限责任公司', value: '1'},
        {label: '北京中交兴路信息科技有限公司四川分公司', value: '2'},
        {label: '成都安彩敬天科技有限公司', value: '3'},
      ];
      commit('GET_PROVIDER_OPTIONS', providerOptions)
    });
    // 获取终端型号数据
    var deviceTypeOptions = [];
    axios.get('api/autocomplete',{params: postData}).then(res => {
      deviceTypeOptions = [
        {label: 'ZD-V02H', value: '1'},
        {label: '中软北斗I型', value: '2'},
        {label: 'ZD-V01H', value: '3'},
      ];
      commit('GET_DEVICE_TYPE_OPTIONS', deviceTypeOptions)
    });
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
