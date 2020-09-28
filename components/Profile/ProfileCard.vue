<template>
  <b-card
    :profile="profile"
    :img-src="profile.photo"
    img-alt="profile photo"
    img-left
    class="mb-3 artist-card"
  >
    <b-card-text class="artist-profile">
      <p>
        <i class="fa fa-info"></i>
        {{ profile.bio }}
      </p>
      <p>
        <i class="fa fa-map"></i>
        {{ profile.county }}
      </p>
      <p>
        <i class="fa fa-calendar"></i>
        {{ profile.created_on }}
      </p>
      <div class="d-flex justify-content-between">
        <star-rating
          v-model="rating"
          :show-rating="true"
          :max-rating="5"
          :star-size="20"
          :increment="0.5"
          @rating-selected="setRating"
        ></star-rating>
      </div>
<<<<<<< HEAD:components/ProfileCard.vue
    </b-card-text>
  </b-card>
=======
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
>>>>>>> ecf256028d7e685df834e066ab91bd546ef82c31:components/Profile/ProfileCard.vue
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
