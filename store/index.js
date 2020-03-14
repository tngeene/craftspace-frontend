//   auth module stores user authentication status as well
//   as user details inside Vuex state

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn // checks if a user is logged in
  },

  loggedInUser(state) {
    return state.auth.user // gets details of logged in user, returns null if no user is logged
  }
}
