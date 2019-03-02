import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { 
      path: '*', 
      redirect: '/dispositivos' 
    },
    {
      path: '/dispositivos',
      name: 'devices',
      component: () => import(/* webpackChunkName: "devices" */ './views/devices/devices.component.vue')
    }
  ]
})
