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
                  { active: activeTab === 'profile' }
                ]"
                @click="setActiveTab('profile')"
              >
                <i class="ti-user"></i>
                <span>My Profile</span>
              </a>
            </li>
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
          </ul>
          <span class="mx-3 text-center">
            <h5 class="text-uppercase" @click="logout">
              <i class="ti-power-off"> Sign Out</i>
            </h5>
          </span>
        </div>
      </div>
      <div class="col-10">
        <div
          v-if="activeTab === 'profile'"
          class="profile-header pb-6 d-flex align-items-center"
        >
          <span class="cover-image"></span>
          <div class="row">
            <div class="col-md-6 mx-auto text-white profile-text">
              <h4>Hello {{ loggedInUser.first_name }}<br /></h4>
              <p>
                This is your profile page. You can edit your details as well as
                view all your activity on craftspace
              </p>
              <button
                class="btn btn-md btn-light"
                @click="isVisible = !isVisible"
              >
                Edit Profile
              </button>
            </div>
          </div>
          <!-- Mask -->
        </div>
        <div
          v-if="activeTab === 'profile'"
          class="row profile-details p-md-3 mt-2 p-lg-3"
        >
          <ArtistProfileCard v-if="loggedInUser.membership_type === 'Artist'" />
          <CollectorProfileCard
            v-if="loggedInUser.membership_type === 'Collector'"
          />
          <ArtistProfileForm
            v-if="isVisible && loggedInUser.membership_type === 'Artist'"
          />
          <CollectorProfileForm
            v-if="isVisible && loggedInUser.membership_type === 'Collector'"
          />
        </div>

        <!-- products table -->
        <div v-if="activeTab === 'products'" class="products-table mt-2">
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
import ArtistProfileCard from '~/components/Profile/ArtistProfileCard'
import ProductTable from '~/components/Profile/ProductTable'
import ArtistProfileForm from '~/components/Profile/ArtistProfileForm'
import CollectorProfileCard from '~/components/Profile/CollectorProfileCard'
import CollectorProfileForm from '~/components/Profile/CollectorProfileForm'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    CollectorProfileCard,
    // eslint-disable-next-line vue/no-unused-components
    CollectorProfileForm,
    EventTable,
    ProductTable,
    ArtistProfileCard,
    ArtistProfileForm
  },
  middleware: 'has-profile',
  data() {
    return {
      profiles: [],
      products: [],
      events: [],
      activeTab: 'profile',
      isVisible: false
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
