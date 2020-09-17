<template>
  <div class="text-center side-menu">
    <b-sidebar
      id="sidebar-variant"
      bg-variant="dark"
      text-variant="light"
      shadow
      class="text-white"
    >
      <div class="px-3 py-2">
        <nav class="sidebar-menu">
          <ul id="nav-accordion">
            <li class="sub-menu">
              <a href="">
                <i class="ti-pencil"></i>
                <span>Art Work</span>
              </a>
            </li>
            <li class="sub-menu">
              <a href="#">
                <i class="ti-package"></i>
                <span>Custom Orders</span>
              </a>
            </li>
            <li class="sub-menu">
              <a href="#">
                <i class="ti-calendar"></i>
                <span>Events</span>
              </a>
            </li>
            <li class="sub-menu">
              <a href="#">
                <i class="ti-user"></i>
                <span>My Profile</span>
              </a>
            </li>
          </ul>
          <span class="mx-3 justify-content-center">
            <h5 class="text-uppercase" @click="logout">
              <i class="ti-power-off"> Sign Out</i>
            </h5>
          </span>
        </nav>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SideNav',
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

<style scoped>
.nuxt-link-exact-active.nuxt-link-active {
  color: #fff;
}
a {
  color: #242424;
}
a:hover {
  color: #b6985e;
  text-decoration: none;
}
span h5 {
  cursor: pointer;
  font-size: 14px;
  color: #b6985e;
}
</style>

<style scoped>
@import '~/static/css/side-nav.css';
</style>
