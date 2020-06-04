//   auth module stores user authentication status as well
//   as user details inside Vuex state
import Vue from 'vue'

export const state = () => ({
  cartTotal: 0,
  cart: {},
  products: [],
  globals: []
})

export const mutations = {
  setProducts(state, products) {
    state.products = products
  },
  setGlobals(state, globals) {
    state.globals = globals
  },
  clearCart(state) {
    state.cart = {}
    state.cartTotal = 0
  },
  removeItem(state, item) {
    state.cartTotal -= item.quantities
    Vue.delete(state.cart, item.id)
  },
  addToCart(state, item) {
    state.cartTotal++
    if (item.id in state.cart) {
      state.cart[item.id].quantities++
    } else {
      const stateItem = Object.assign({}, item)
      stateItem.quantities = 1
      state.cart[item.id] = stateItem
    }
  }
}

export const actions = {
  async getProduct({ commit, state }) {
    await this.$axios.get('art-pieces/all-art-pieces/').then((response) => {
      if (response.status === 200) {
        commit('setProducts', response.data)
      }
    })
  }
}

export const getters = {
  products(state) {
    return state.products
  },
  cart(state) {
    return state.cart
  },
  cartTotal(state) {
    return state.cartTotal
  }
}
