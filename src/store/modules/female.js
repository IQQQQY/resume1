import { getFemale } from '@/api/index'
const state = {
  female: []
}
const getters = {}
const mutations = {
  setFemale (state, newData) {
    state.female = newData
  }
}
const actions = {
  getFemale (context, data) {
    return getFemale(data).then(res => {
      context.commit('setFemale', res.data.data.data)
      return res
    }).catch(err => {
      return err
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
