/**
 * Created by jessietang on 2017/6/24.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

const hello = resolve => require(['../components/Hello'], resolve)

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/hello',
      component: hello
    }
  ]
})
