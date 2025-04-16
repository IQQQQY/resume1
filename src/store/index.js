import Vue from 'vue'
import Vuex from 'vuex'
import female from './modules/female'
import male from './modules/male'
import bag from './modules/bag'
import cart from './modules/cart'
import all from './modules/all'
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {

  },
  actions: {
  },
  modules: {
    female,
    male,
    bag,
    cart,
    all,
    user

  }
})
