<template>
  <div class="card mb-3" style="max-width: 1000px;">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="profile.photo" class="card-img" alt="" />
      </div>
      <div class="col-md-8 text-center my-auto">
        <div class="card-body">
          <h5 class="card-title"></h5>
          <p class="card-text p-2">
            <i class="fa fa-info"></i>
            {{ profile.bio }}
          </p>
          <p>
            <i class="fa fa-map"></i>
            {{ profile.county }}
          </p>
          <p>
            <i class="fa fa-calendar"></i>
            Joined on {{ profile.created_on | moment('MMMM Do YYYY') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ProfileCard',
  middleware: 'auth',
  data() {
    return {
      profile: ''
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  mounted() {
    this.getProfile(this.loggedInUser.id)
  },
  methods: {
    async getProfile(id) {
      await this.$axios
        .get(`artists/profiles/?user=${id}`)
        .then((response) => {
          if (response.status === 200) {
            this.profile = response.data[0]
          }
        })
        .catch((error) => {
          if (error.response) this.$toast.show(`${error.response.data.detail}`)
        })
    }
  }
}
</script>

<style scoped>
b-card img-src {
  height: 191px !important;
  width: 275px !important;
}
</style>
