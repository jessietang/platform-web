/**
 * Created by jessietang on 2017/6/24.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

const hello = resolve => require(['../components/Hello'], resolve)
const index = resolve => require(['../components/index/index'], resolve)
const report = resolve => require(['../components/report/index'], resolve)
const platformSupervise = resolve => require(['../components/report/platformSupervise'], resolve)
const platformDetail = resolve => require(['../components/report/platformDetail'], resolve)
const onlineStatus = resolve => require(['../components/report/onlineStatus'], resolve)
const onlineDetail = resolve => require(['../components/report/onlineDetail'], resolve)
const alarmInspector = resolve => require(['../components/report/alarmInspector'], resolve)
const module = resolve => require(['../components/module/index'], resolve)
const carPosition = resolve => require(['../components/index/carPosition'], resolve)
const carTrail = resolve => require(['../components/index/carTrail'], resolve)
const login = resolve => require(['../components/login/login'], resolve)
const web = resolve => require(['../components/web/index'], resolve)
const info = resolve => require(['../components/info/index'], resolve)
const changePass = resolve => require(['../components/info/changePass'], resolve)
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: login
    },
    // 登录页面
    {
      path: '/login',
      component: login
    },
    // 接入平台监管详情页面
    {
      path: '/platformDetail',
      component: platformDetail
    },
    // 在线情况详情页面
    {
      path: '/onlineDetail',
      component: onlineDetail
    },
    // 修改密码页面
    {
      path: '/changePass',
      component: changePass
    },
    // app之后的入口文件
    {
      path: '/web',
      component: web,
      children: [
        // 首页
        {
          path: 'index',
          component: index,
          children: [
            {path: 'carPosition', component: carPosition},
            {path: 'carTrail', component: carTrail}
          ]
          /*children: [
            {path: 'alarmCar', component: alarmCar},
            {
              path: 'nearCar',
              component: nearCar,
              children: [
                {path: 'carPosition', component: carPosition},
                {path: 'carTrail', component: carTrail}
              ]
            }
          ]*/
        },
        // 统计报表
        {
          path: 'report',
          component: report,
          children: [
            // 平台监控
            {
              path: 'platformSupervise',
              component: platformSupervise,
              children: [
                {path: 'platformDetail', component: platformDetail}
              ]
            },
            // 在线情况
            {
              path: 'onlineStatus',
              component: onlineStatus
            },
            // 报警督办统计
            {path: 'alarmInspector', component: alarmInspector}
          ]
        },
        // 模块化
        {
          path: 'module',
          component: module
        },
        // 个人信息
        {
          path: 'info',
          component: info
        }
      ]
    }

  ]
})
