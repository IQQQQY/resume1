import { getMale } from '@/api/index'
const state = {
  male: []
}
const mutations = {
  setMale (state, newData) {
    state.male = newData
  }
}
const actions = {
  getMale (context, data) {
    return getMale(data).then(res => {
      context.commit('setMale', res.data.data.data)
      return res
    }).catch(err => {
      console.log(err)
      return err
    })
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
