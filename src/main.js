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
window.axios = axios

import './assets/js/lib/flexible' // 通过js来动态改写meta标签

Vue.use(ElementUi)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
