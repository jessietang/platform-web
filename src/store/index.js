/**
 * Created by jessietang on 2017/6/24.
 */
import Vue from 'vue'
import Vuex from 'vuex'

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
  ]
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
  }
}

const actions = {
  saveCarInfo: ({commit}, carDetailObj) => {
    commit('SAVE_CAR_INFO', carDetailObj)
  },
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
