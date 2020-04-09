<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="light"
      variant="dark"
      style="opacity: 0.85;"
    >
      <b-navbar-brand href="/">Craftspace</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item><nuxt-link to="/home">Home</nuxt-link></b-nav-item>
          <b-nav-item><nuxt-link to="/artists">Artists</nuxt-link></b-nav-item>
          <b-nav-item><nuxt-link to="/art">Collection</nuxt-link></b-nav-item>
          <b-nav-item
            ><nuxt-link to="/"> Cart ({{ cartTotal }}) </nuxt-link></b-nav-item
          >
          <b-nav-item
            ><nuxt-link to="/events">Exhibitions</nuxt-link></b-nav-item
          >

          <b-nav-item-dropdown v-if="isAuthenticated" right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em class="text-white">{{ loggedInUser.first_name }}</em>
            </template>
            <b-dropdown-item>
              <nuxt-link to="/profile"> Profile</nuxt-link></b-dropdown-item
            >
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <template v-else>
            <b-button variant="outline-secondary text-white mr-2"
              ><nuxt-link to="/register">Sign Up</nuxt-link></b-button
            >
            <b-button variant="outline-secondary text-white"
              ><nuxt-link to="/login">Sign In</nuxt-link></b-button
            >
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'cartTotal'])
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>

<style>
.nuxt-link-exact-active.nuxt-link-active {
  color: #526488;
  position: relative;
}
a {
  color: azure;
  position: relative;
}
a:hover {
  color: antiquewhite;
  position: relative;
  text-decoration: none;
}
.navbar {
  z-index: 9;
  width: 100%;
}
</style>
