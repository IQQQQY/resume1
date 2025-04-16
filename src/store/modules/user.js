import { login, verCode, register } from '@/api/index'
const state = {
  user: [],
  currentUser: {},
  code: ''
}
const getters = {}
const mutations = {
  setLogin (state, newData) {
  },
  setVerCode (state, newData) {
    state.code = newData
  },
  setRegister (state, newData) {
    state.user.push(newData.data)
  }
}
const actions = {
  login (context, newData) {
    return login(newData).then(res => {
      context.commit('setLogin', res.data)
      return res
    })
  },
  verCode (context, newData) {
    verCode(newData).then(res => {
      context.commit('setVerCode', res.data)
      console.log(res.data.message)
    }).catch(err => {
      console.log(err)
    })
  },
  register (context, newData) {
    return register(newData).then(res => {
      context.commit('setRegister', res.data)
      return res
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
