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
import ArtistCard from '~/components/ArtistCard'
export default {
  components: {
    ArtistCard
  },
  async asyncData({ $axios, params }) {
    const config = {
      headers: {
        Accept: 'application/json'
      }
    }
    try {
      const artists = await $axios.$get(`artists/`, config)
      return { artists }
    } catch (e) {
      return { artists: [] }
    }
  },
  data() {
    return {
      artists: []
    }
  },
  head() {
    return {
      title: 'Craftspace | Artists'
    }
  }
}
</script>
