import { getAll } from '@/api/index'
const state = {
  all: []
}
const mutations = {
  setAll (state, newData) {
    state.all = newData
  }
}
const actions = {
  getAll (context, data) {
    return getAll(data).then(res => {
      context.commit('setAll', res.data.data.data)
      return res
    }).catch(err => {
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
