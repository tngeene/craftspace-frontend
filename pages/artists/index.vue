<template>
  <main class="container mt-5">
    <div class="row">
      <div class="col-12 text-right mb-4">
        <div class="text-center">
          <h3 class="text-dark text-center">Artists</h3>
        </div>
      </div>
      <template v-for="artist in artists">
        <div :key="artist.id" class="col-lg-3 col-md-4 col-sm-6 mb-4 ml-4 mr-4">
          <artist-card :artist="artist"></artist-card>
        </div>
      </template>
    </div>
  </main>
</template>

<script>
import ArtistCard from '~/components/Artists/ArtistCard'
export default {
  components: {
    ArtistCard
  },
  data() {
    return {
      artists: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.getArtists()
    }, 1000)
  },
  methods: {
    async getArtists() {
      await this.$axios
        .get(`artists/`)
        .then((response) => {
          if (response.status === 200) {
            this.artists = response.data
            // eslint-disable-next-line no-console
            console.log(`artist data ${this.artists}`)
          }
        })
        .catch((error) => {
          if (error.response)
            this.$toast.show(`could not fetch artists at this time`)
        })
    }
  },
  head() {
    return {
      title: 'Craftspace | Artists'
    }
  }
}
</script>
