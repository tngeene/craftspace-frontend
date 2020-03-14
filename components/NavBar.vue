<template>
  <nav
    class="navbar navbar-inverse bg-transparent navbar-fixed-top navbar navbar-expand-lg static-top"
  >
    <div class="navbar-inner">
      <div class="container">
        <a class="navbar-brand" href="/">Craftspace</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navbarResponsive" class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <div class="container">
              <li class="nav-item active">
                <nuxt-link to="/home"
                  >Home
                  <span class="sr-only">(current)</span>
                </nuxt-link>
              </li>
            </div>
            <div class="container">
              <li class="nav-item">
                <nuxt-link to="/artists">Artists</nuxt-link>
              </li>
            </div>
            <div class="container">
              <li class="nav-item">
                <nuxt-link to="/art">Collection</nuxt-link>
              </li>
            </div>
            <div class="container">
              <li class="nav-item">
                <nuxt-link to="/events">Exhibitions</nuxt-link>
              </li>
            </div>
            <div
              v-if="isAuthenticated"
              class="navbar-item has-dropdown is-hoverable"
            >
              <b-dropdown
                id="dropdown-left"
                text=""
                variant="primary"
                class="m-2"
              >
                <b-dropdown-item
                  ><nuxt-link to="/profile"
                    >My Profile</nuxt-link
                  ></b-dropdown-item
                >
                <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                <b-dropdown-item href="#">Something else here</b-dropdown-item>
              </b-dropdown>
            </div>
            <template v-else>
              <li class="nav-item">
                <button
                  type="button"
                  class="btn btn-outline-secondary text-white mt-2"
                >
                  <nuxt-link to="/register"> Sign Up</nuxt-link>
                </button>
              </li>
              <li class="nav-item">
                <button
                  type="button"
                  class="btn btn-outline-secondary text-white mt-2 ml-2"
                >
                  <nuxt-link to="/login"> Sign In </nuxt-link>
                </button>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px dotted #cccc;
}
.header .title {
  font-size: 3rem;
  color: #526488;
}
.header ul {
  display: flex;
}
.header a {
  display: inline-block;
  background: #333;
  color: beige;
  padding: 0.3rem 1rem;
  margin-right: 0.5rem;
}
.nuxt-link-exact-active.nuxt-link-active {
  color: #526488;
  position: relative;
}
a {
  color: antiquewhite;
  position: relative;
}
a:hover {
  color: antiquewhite;
  position: relative;
  text-decoration: none;
}
.navbar {
  z-index: 9;
}
</style>
