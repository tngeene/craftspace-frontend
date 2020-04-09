//   auth module stores user authentication status as well
//   as user details inside Vuex state

import Vuex from 'vuex'
import Vue from 'vue'

export const state = () => ({
  users: null
})

const createStore = () => {
  return new Vuex.Store({
    state: {
      CartTotal: 0,
      Cart: {},
      products: [],
      globals: []
    },
    mutations: {
      setUsers(state, payload) {
        state.users = payload
      },
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
    },
    actions: {
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
    },
    getters: {
      isAuthenticated(state) {
        return state.auth.loggedIn // checks if a user is logged in
      },
      loggedInUser(state) {
        return state.auth.user // gets details of logged in user, returns null if no user is logged
      },
      products(state) {
        return state.products
      },
      cart(state) {
        return state.cart
      },
      cartTotal(state) {
        return state.CartTotal
      }
    }
  })
}
//   auth module stores user authentication status as well
//   as user details inside Vuex state
export default createStore
