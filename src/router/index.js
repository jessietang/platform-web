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
const spSystem = resolve => require(['../components/spSystem/index'], resolve)
const vehicleInfoReport = resolve => require(['../components/spSystem/vehicleInfoReport'], resolve)
const companyCheckReport = resolve => require(['../components/spSystem/companyCheckReport'], resolve)
const providerCheckReport = resolve => require(['../components/spSystem/providerCheckReport'], resolve)
const VehicleTogetherReport = resolve => require(['../components/spSystem/VehicleTogetherReport'], resolve)
const overSpeedReport = resolve => require(['../components/spSystem/overSpeedReport'], resolve)
const abnormalReport = resolve => require(['../components/spSystem/abnormalReport'], resolve)
const serverSupervise = resolve => require(['../components/serverSupervise/index'], resolve)
const providerCheck = resolve => require(['../components/providerCheck/index'], resolve)


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
        },
        // sp系统
        {
          path: 'spSystem',
          component: spSystem
        },
        // 车辆基本信息报表
        {
          path: 'vehicleInfoReport',
          component: vehicleInfoReport
        },
        // 企业考核统计报表
        {
          path: 'companyCheckReport',
          component: companyCheckReport
        },
        // 服务商考核统计报表
        {
          path: 'providerCheckReport',
          component: providerCheckReport
        },
        // 车辆汇总报表
        {
          path: 'VehicleTogetherReport',
          component: VehicleTogetherReport
        },
        // 超速报表
        {
          path: 'overSpeedReport',
          component: overSpeedReport
        },
        // 二至五点异常报表
        {
          path: 'abnormalReport',
          component: abnormalReport
        },
        // 服务器监控
        {
          path: 'serverSupervise',
          component: serverSupervise
        },
        // 服务商考核模块
        {
          path: 'providerCheck',
          component: providerCheck
        }
      ]
    }

  ]
})
