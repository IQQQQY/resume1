import { getCart, addCart, deleteCart } from '@/api/index'
const state = {
  cart: [],
  show: false,
  selectCart: []
}
const mutations = {
  makeShow (state) {
    state.show = !state.show
  },
  makeHide (state) {
    state.show = false
  },
  setCart (state, newData) {
    state.cart = newData
  },
  addSetCart (state, newData) {
    state.cart = newData
  },
  changeQuantity (state, data) {
    state.cart.forEach(item => {
      if (item.productId === data.id) {
        if (data.quantity < 1) data.quantity = 1
        if (data.flag === 'set') {
          console.log('cart set')
          item.quantity = data.quantity
        } else {
          item.quantity += data.quantity
          console.log('cart change')
        }
      }
    })
  },
  deleteSetCart (state, newData) {
    state.cart = newData
  },
  getSelectCart (state, newData) {
    state.selectCart = newData
  }
}
const actions = {
  getCart (context, newData) {
    return getCart(newData).then(res => {
      context.commit('setCart', res.data.data)
      return res
    }).catch(err => {
      console.log(err)
    })
  },
  addCart (context, newData) {
    addCart(newData).then(res => {
      context.commit('addSetCart', res)
    })
  },
  deleteCart (context, data) {
    return deleteCart(data).then(res => {
      context.commit('deleteSetCart', res.data.data)
      return res
    })
  }
}
const getters = {
  totalPrice (state) {
    if (Array.isArray(state.selectCart)) {
      return typeof state.selectCart === 'object' ? state.selectCart.reduce((sum, item) => sum + item.price * 100 * item.quantity, 0) : 0.00
    } else {
      return 0.00
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
