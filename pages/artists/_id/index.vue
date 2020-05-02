<template>
  <div class="main">
    <div class="row">
      <div class="col-md-8">
        <div class="mt-4">
          <h4 class="text-center">
            {{ artist.first_name }} {{ artist.id }} {{ artist.last_name }}
          </h4>
          <template v-for="profile in profiles">
            <div :key="profile.id" class="ml-3">
              <profile-card :profile="profile"></profile-card>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="row col-8">
      <div>
        <h4 class="ml-3">
          Recent Art Works
        </h4>
      </div>
    </div>
    <div class="row col-8">
      <template v-for="product in products">
        <div
          :key="product.id"
          class="flipInX animated col-lg-3 col-md-4 col-sm-6 mb-4"
        >
          <product-card :product="product"></product-card>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ProductCard from '~/components/ProductCard.vue'
import EventCard from '~/components/EventCard.vue'
import ProfileCard from '~/components/ProfileCard.vue'

export default {
  components: {
    ProductCard,
    // eslint-disable-next-line vue/no-unused-components
    EventCard,
    ProfileCard
  },
  async asyncData({ $axios, params }) {
    try {
      const artist = await $axios.$get(`/auth/users/${params.id}`)
      return { artist }
    } catch (e) {
      return { artist: null }
    }
  },
  data() {
    return {
      artist: [],
      // profiles: [],
      products: [],
      events: []
    }
  },
  mounted() {
    this.getArtistProfile(this.$route.params.id)
    this.getArtistProducts(this.$route.params.id)
  },
  methods: {
    async getArtistProducts(id) {
      try {
        // eslint-disable-next-line no-console
        console.log(id)
        const res = await this.$axios.$get(
          `/art-pieces/all-art-pieces/?uploaded_by=${id}`
        )
        // eslint-disable-next-line no-console
        console.log(res)
        this.products = res
      } catch (e) {
        return { products: [] }
      }
    },
    async getArtistProfile(id) {
      try {
        const resp = await this.$axios.$get(`/artists/profiles/?user=${id}`)
        this.profiles = resp
        // eslint-disable-next-line no-console
        console.log(`response is ${resp}`)
      } catch (e) {
        return { profiles: [] }
      }
    }
  },
  head() {
    return {
      title: ' Craftspace | Artist Profile |' + ' ' + this.artist.last_name
    }
  }
}
</script>

<style scoped>
.artist-profile {
  top: 30%;
  transform: translateY(-20%);
  position: absolute;
}
</style>
