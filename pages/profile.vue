<template>
  <section class="section">
    <div id="wrapper" class="d-flex">
      <!-- Sidebar -->
      <div id="sidebar-wrapper" class="bg-light border-left">
        <div class="sidebar-heading">Start Bootstrap</div>
        <div class="list-group list-group-flush">
          <a href="#" class="list-group-item list-group-item-action bg-light"
            >Dashboard</a
          >
          <a href="#" class="list-group-item list-group-item-action bg-light"
            >Shortcuts</a
          >
          <a href="#" class="list-group-item list-group-item-action bg-light"
            >Overview</a
          >
          <a href="#" class="list-group-item list-group-item-action bg-light"
            >Events</a
          >
          <a href="#" class="list-group-item list-group-item-action bg-light"
            >Profile</a
          >
          <a
            class="list-group-item list-group-item-action bg-light"
            @click="logout"
          >
            Logout
          </a>
        </div>
      </div>
      <!-- /#sidebar-wrapper -->
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import SideNav from '../components/SideNav'

export default {
  components: SideNav,
  middleware: 'auth',
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$toast.success('Successfully Logged Out')
    }
  }
}
</script>

<style scoped>
@import '@/assets/main/css/simple-sidebar.css';
</style>
