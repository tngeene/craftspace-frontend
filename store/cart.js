//   auth module stores user authentication status as well
//   as user details inside Vuex state
import Vue from 'vue'

export const state = () => ({
  CartTotal: 0,
  Cart: {},
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
    state.cartTotal -= item.count
    Vue.delete(state.cart, item.id)
  },
  addToCart(state, item) {
    state.cartTotal++
    if (item.id in state.cart) {
      state.cart[item.id].count++
    } else {
      const stateItem = Object.assign({}, item)
      stateItem.count = 1
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
  },
  async getUsers({ commit }) {
    await this.$axios.get('auth/users/').then((response) => {
      if (response.status === 200) {
        commit('setUsers', response.data)
      }
    })
  }
}

export const getters = {
  products: (state) => state.products,
  cart: (state) => state.cart,
  cartTotal: (state) => state.cartTotal
}
