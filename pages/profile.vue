<template>
  <div>
    <div class="row">
      <SideNav style="height:20rem;" />
      <div class="col-9 mx-auto">
        <template v-for="profile in profiles">
          <div :key="profile.id" class="mt-3">
            <profile-card
              v-if="profileIsVisible && !productsIsVisible && !eventsIsVisible"
              :profile="profile"
            ></profile-card>
          </div>
        </template>
        <!-- products table -->
        <div class="products-table">
          <ProductTable />
        </div>
        <!-- end of products table -->
        <!-- events table -->
        <div class="events-table mt-3 mb-2">
          <EventTable />
        </div>

        <b-button v-b-toggle.sidebar-variant class="justify-content-end"
          >Toggle Sidebar</b-button
        >
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
    // eslint-disable-next-line vue/no-unused-components
    ProductTable,
    ProfileCard,
    EventTable,
    SideNav
  },
  middleware: 'has-profile',
  filters: {
    truncate(text, length, suffix) {
      if (text.length > 15) {
        return text.substring(0, length) + suffix
      } else {
        return text
      }
    }
  },
  data() {
    return {
      profiles: [],
      products: [],
      events: [],
      profileIsVisible: true,
      productsIsVisible: false,
      eventsIsVisible: false
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  mounted() {
    this.getProfile(this.loggedInUser.id)
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$toast.success('Successfully Logged Out')
    },
    async getProfile(id) {
      try {
        const resp = await this.$axios.get(`artists/profiles/?user=${id}`)
        // eslint-disable-next-line no-console
        console.log(`resp is ${resp.data}`)
        this.profiles = resp.data
      } catch (e) {
        return { profiles: [] }
      }
    },
    toggleSideNav() {
      // eslint-disable-next-line prefer-const
      let sideNavPos = document.querySelector('#sideNav')
      // eslint-disable-next-line no-unused-expressions
      sideNavPos.style.left === '-250px'
      if (sideNavPos.style.left === '-250px') {
        sideNavPos.style.left = '0'
      } else {
        sideNavPos.style.left = '-250px'
      }
    }
  },
  head() {
    return {
      title:
        'Craftspace | Profile' +
        ' ' +
        this.loggedInUser.first_name +
        ' ' +
        this.loggedInUser.last_name
    }
  }
}
</script>
