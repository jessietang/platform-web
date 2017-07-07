/**
 * Created by jessietang on 2017/6/24.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

const hello = resolve => require(['../components/Hello'], resolve)
const index = resolve => require(['../components/index/index'], resolve)
const searchCar = resolve => require(['../components/index/searchCar'], resolve)
const alarmCar = resolve => require(['../components/index/alarmCar'], resolve)
const nearCar = resolve => require(['../components/index/nearCar'], resolve)
const report = resolve => require(['../components/report/index'], resolve)
const analysis = resolve => require(['../components/report/analysis'], resolve)
const sixStrictBan = resolve => require(['../components/report/sixStrictBan'], resolve)
const supervision = resolve => require(['../components/report/supervision'], resolve)
const module = resolve => require(['../components/module/index'], resolve)
const carPosition = resolve => require(['../components/index/carPosition'], resolve)
const carTrail = resolve => require(['../components/index/carTrail'], resolve)
const login = resolve => require(['../components/login/login'], resolve)
const web = resolve => require(['../components/web/index'], resolve)
const info = resolve => require(['../components/info/index'], resolve)
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: web
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/web',
      component: web,
      children: [
        {
          path: 'index',
          component: index,
          children: [
            {path: 'searchCar', component: searchCar},
            {path: 'alarmCar', component: alarmCar},
            {
              path: 'nearCar',
              component: nearCar,
              children: [
                {path: 'carPosition', component: carPosition},
                {path: 'carTrail', component: carTrail}
              ]
            }
          ]
        },
        {
          path: 'report',
          component: report,
          children: [
            {path: 'analysis', component: analysis},
            {path: 'sixStrictBan', component: sixStrictBan},
            {path: 'supervision', component: supervision}
          ]
        },
        {
          path: 'module',
          component: module
        },
        {
          path: 'info',
          component: info
        }
      ]
    },

  ]
})
