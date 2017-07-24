// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUi from 'element-ui' // 引入ElementUi组价
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios' // 引入axios请求
import {fastclick} from './assets/js/common/index'
fastclick(document.body) // fastclick用于消除在移动浏览器上触发click事件与一个物理Tap(敲击)之间的300s延迟

import { Picker } from 'mint-ui' //前提是npm install mint-ui --save
import { Popup } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)

import './assets/js/common/config'
import './assets/js/lib/flexible' // 通过js来动态改写meta标签

window.axios = axios

//let AUTH_TOKEN = 'amVzc2lldGFuZyswOTI1' // base64编码 jessietang+0925 (用户名+密码) AUTH_TOKEN是请求头里面的一个权限参数
axios.defaults.baseURL = rootSrc.api // config.js里面配置
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
//axios.defaults.headers.post['Content-Type'] = 'application/json'

Vue.use(ElementUi)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
