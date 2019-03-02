import Vue from 'vue'
import Vuetify from 'vuetify'

import '@fortawesome/fontawesome-free/css/all.css'
import 'vuetify/dist/vuetify.min.css'

import App from "./App.vue"
import router from './router.js'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  iconfont: 'fa'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')