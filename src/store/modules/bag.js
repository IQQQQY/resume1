import { getBag } from '@/api/index'
const state = {
  bag: []
}
const getters = {}
const mutations = {
  setBag (state, bag) {
    state.bag = bag
  }
}
const actions = {
  getBag (context, data) {
    return getBag(data).then(res => {
      context.commit('setBag', res.data.data.data)
      return res
    }).catch(err => {
      console.log(err)
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
