<template>
  <div class="sidebar">
    <ul>
      <li class="sub-menu">
        <a
          href=""
          :class="[
            'nav-item',
            'nav-link',
            { active: activeTab === 'products' }
          ]"
          @click="setActiveTab('products')"
        >
          <i class="ti-pencil"></i>
          <span>Art Work</span>
        </a>
      </li>
      <li v-if="loggedInUser.membership_type == 'Collector'" class="sub-menu">
        <a
          href=""
          :class="['nav-item', 'nav-link', { active: activeTab === 'orders' }]"
          @click="setActiveTab('orders')"
        >
          <i class="ti-package"></i>
          <span>Orders</span>
        </a>
      </li>
      <li class="sub-menu">
        <a
          href=""
          :class="[
            'nav-item',
            'nav-link',
            { active: activeTab === 'custom-orders' }
          ]"
          @click="setActiveTab('custom-orders')"
        >
          <i class="ti-package"></i>
          <span>Custom Orders</span>
        </a>
      </li>
      <li class="sub-menu">
        <a
          href=""
          :class="['nav-item', 'nav-link', { active: activeTab === 'events' }]"
          @click="setActiveTab('events')"
        >
          <i class="ti-calendar"></i>
          <span>Events</span>
        </a>
      </li>
      <li class="sub-menu">
        <a
          href=""
          :class="['nav-item', 'nav-link', { active: activeTab === 'profile' }]"
          @click="setActiveTab('profile')"
        >
          <i class="ti-user"></i>
          <span>My Profile</span>
        </a>
      </li>
    </ul>
    <span class="mx-3 text-center">
      <h5 class="text-uppercase" @click="logout">
        <i class="ti-power-off"> Sign Out</i>
      </h5>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SideNav',
  data() {
    return {
      activeTab: 'products'
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    }
  },
  setActiveTab(tab) {
    this.activeTab = tab
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
