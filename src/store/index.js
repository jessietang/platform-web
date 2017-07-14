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
    corporation: '' // 所属营运商
  }
}

const getters = {

}

const mutations = {
  // 保存车辆信息
  SAVE_CAR_info: (state, carDetailObj) => {
    state.carDetail.carId = carDetailObj.carId;
    state.carDetail.carType = carDetailObj.carType;
    state.carDetail.carPlat = carDetailObj.carPlat;
    state.carDetail.carColor = carDetailObj.carColor;
    state.carDetail.unitName = carDetailObj.unitName;
    state.carDetail.platformName = carDetailObj.platformName;
    state.carDetail.location = carDetailObj.location;
    state.carDetail.corporation = carDetailObj.corporation;
  }
}

const actions = {
  saveCarInfo: ({commit}, carDetailObj) => {
    commit('SAVE_CAR_info', carDetailObj)
  },
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
