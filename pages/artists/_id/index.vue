<template>
  <div class="main">
    <div class="container-fluid p-3">
      <div class="row">
        <div class="col-md-4 mb-3">
          <div class="card shadow-sm mb-3">
            <div class="card-body">
              <div class="text-center">
                <div v-show="profile.photo">
                  <img :src="profile.photo" :alt="profile.user" class="w-50" />
                </div>
                <div v-show="!profile.photo">
                  <i class="fa fa-user-circle fa-5x mb-2" />
                </div>

                <h2 class="text-capitalize py-2">
                  {{ artist.first_name + ' ' + artist.last_name }}
                </h2>
              </div>
              <div class="text-center">
                <p>
                  <strong
                    ><i class="fa fa-map-pin" aria-hidden="true"></i>
                    {{ profile.county }}
                  </strong>
                </p>
                <p>
                  <strong
                    ><i class="fa fa-briefcase" aria-hidden="true"></i> Status:
                  </strong>
                  <span class="text-success">Active</span>
                </p>
                <div class="mt-5"></div>
              </div>
            </div>
          </div>
          <div class="card shadow-sm mb-3">
            <RatingForm :artist-profile="artist" />
          </div>
        </div>
        <div class="col-md-8">
          <nav class="nav nav-pills nav-fill artist-navs mb-3">
            <a
              :class="[
                'nav-item',
                'nav-link',
                'mr-1',
                { active: activeTab === 'pieces' }
              ]"
              href="#"
              @click="setActiveTab('pieces')"
            >
              Art Works
            </a>
            <a
              :class="[
                'nav-item',
                'nav-link',
                'mr-1',
                { active: activeTab === 'events' }
              ]"
              href="#"
              @click="setActiveTab('events')"
            >
              Events
            </a>
          </nav>
          <div v-if="activeTab === 'pieces'" class="row">
            <div v-if="products.length > 0" class="row">
              <template v-for="product in products">
                <div
                  :key="product.id"
                  class="bounceIn animated col-lg-4 col-md-3 col-sm-6 mb-4"
                >
                  <product-card :product="product"></product-card>
                </div>
              </template>
            </div>
            <div
              v-if="products.length < 1"
              class="col-12 text-center no-content"
            >
              <img
                class="img-fluid mb-2 text-center"
                src="/img/painter.png"
                alt="craftspace"
              />
              <h3>
                Oops! Artist has not uploaded any art work yet 😕
              </h3>
            </div>
          </div>
          <div v-if="activeTab === 'events'" class="row">
            <div v-if="events.length > 0" class="row">
              <EventCard
                v-for="event in events"
                :key="event.id"
                :event="event"
                class="card-deck"
              />
            </div>
            <div v-if="events.length < 1" class="container row">
              <div class="col-10 mx-auto text-center h-25">
                <img
                  class="img-fluid mb-2 h-50"
                  src="/img/painter.png"
                  alt="craftspace"
                />
                <h3>
                  Oops! Artist hasn't uploaded any exhibitions yet 🙁
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '~/components/Products/ProductCard'
import EventCard from '~/components/Events/EventCard'
import RatingForm from '~/components/RatingForm'

export default {
  components: {
    ProductCard,
    RatingForm,
    EventCard
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['artistProfile'],
  async asyncData({ $axios, params }) {
    try {
      const artist = await $axios.$get(`/auth/custom-users/${params.id}/`)
      return { artist }
    } catch (e) {
      return { artist: null }
    }
  },
  data() {
    return {
      artist: [],
      profile: Object,
      products: [],
      events: [],
      activeTab: 'pieces'
    }
  },
  mounted() {
    this.getArtistProfile(this.$route.params.id)
    this.getArtistProducts(this.$route.params.id)
    this.getArtistEvents(this.$route.params.id)
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
    getArtistProfile(id) {
      try {
        this.$axios.get(`/artists/profiles/?user=${id}`).then((response) => {
          if (response.status === 200) {
            this.profile = response.data[0]
          } else {
            // eslint-disable-next-line no-console
            console.log(`profile is ${this.profile}`)
            this.$toast.error(`${response.data[0].detail}`)
          }
        })
      } catch (e) {
        return { profile: [] }
      }
    },
    getArtistEvents(id) {
      this.$axios
        .get(`events/?uploaded_by=${id}`)
        .then((response) => {
          if (response.status === 200) {
            this.events = response.data
          }
        })
        .catch((error) => {
          if (error.response) this.$toast.show(`${error.response.data.detail}`)
        })
    },
    setActiveTab(tab) {
      this.activeTab = tab
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
