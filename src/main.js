import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/assets/request'
import '@/assets/element-ui.js'
import '@/assets/vant-ui'
import '@/assets/global-components.js'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
