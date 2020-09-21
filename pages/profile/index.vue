<template>
  <div>
    <div class="row">
      <div class="col-md-2 col-sm-12">
        <div class="sidebar">
          <ul>
            <li class="sub-menu">
              <a
                href="#"
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
            <li
              v-if="loggedInUser.membership_type == 'Collector'"
              class="sub-menu"
            >
              <a
                href="#"
                :class="[
                  'nav-item',
                  'nav-link',
                  { active: activeTab === 'orders' }
                ]"
                @click="setActiveTab('orders')"
              >
                <i class="ti-package"></i>
                <span>Orders</span>
              </a>
            </li>
            <li class="sub-menu">
              <a
                href="#"
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
                href="#"
                :class="[
                  'nav-item',
                  'nav-link',
                  { active: activeTab === 'events' }
                ]"
                @click="setActiveTab('events')"
              >
                <i class="ti-calendar"></i>
                <span>Events</span>
              </a>
            </li>
            <li class="sub-menu">
              <a
                href="#"
                :class="[
                  'nav-item',
                  'nav-link',
                  { active: activeTab === 'profile' }
                ]"
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
      </div>
      <div class="col-10 pt-3 mt-3 mx-auto">
        <div v-if="activeTab === 'profile'" class="profile-details">
          <ProfileCard />
        </div>

        <!-- products table -->
        <div v-if="activeTab === 'products'" class="products-table">
          <ProductTable />
        </div>
        <!-- end of products table -->
        <!-- events table -->
        <div v-if="activeTab === 'events'" class="events-table mt-3 mb-2">
          <EventTable />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EventTable from '~/components/Profile/EventTable'
import ProfileCard from '~/components/Profile/ProfileCard'
import ProductTable from '~/components/Profile/ProductTable'
import SideNav from '~/components/SideNav'

export default {
  components: {
    ProductTable,
    ProfileCard,
    EventTable,
    // eslint-disable-next-line vue/no-unused-components
    SideNav
  },
  middleware: 'has-profile',
  data() {
    return {
      profiles: [],
      products: [],
      events: [],
      activeTab: 'products',
      profileIsVisible: true,
      productsIsVisible: false,
      eventsIsVisible: false
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$toast.success('Successfully Logged Out')
    },
    setActiveTab(tab) {
      this.activeTab = tab
    }
  },
  head() {
    return {
      title: `Craftspace | Profile | ${this.loggedInUser.first_name} ${this.loggedInUser.last_name}`
    }
  }
}
</script>

<style scoped>
.nuxt-link-exact-active.nuxt-link-active {
  color: #fff;
}
a {
  color: #d5e7d4;
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
