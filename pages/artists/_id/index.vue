<template>
  <div class="main">
    <div class="container-fluid p-3">
      <div class="row">
        <div class="col-md-4 mb-3">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="text-center">
                <i class="fa fa-user-circle fa-5x mb-3" />
                <h2 class="text-capitalize mb-5">
                  {{ artist.first_name + ' ' + artist.last_name }}
                </h2>
              </div>
              <div class="text-center">
                <p>
                  <strong
                    ><i class="fa fa-phone" aria-hidden="true"></i
                  ></strong>
                  {{ artist.phone_number }}
                </p>
                <p>
                  <strong
                    ><i class="fa fa-envelope" aria-hidden="true"></i
                  ></strong>
                  {{ artist.email }}
                </p>
                <p>
                  <strong
                    ><i class="fa fa-map-pin" aria-hidden="true"></i
                  ></strong>
                  <!-- {{ profile[0].birth_place }} -->
                </p>
                <p>
                  <strong
                    ><i class="fa fa-briefcase" aria-hidden="true"></i> Status:
                  </strong>
                  <span v-if="artist.is_active === 'true'" class="text-success"
                    >Active</span
                  >
                  <span v-else class="text-warning">{{
                    artist.status || '-'
                  }}</span>
                </p>
                <div class="mt-5"></div>
              </div>
            </div>
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
            <a
              :class="[
                'nav-item',
                'nav-link',
                'mr-1',
                { active: activeTab === 'profile' }
              ]"
              href="#"
              @click="setActiveTab('profile')"
            >
              Full Profile
            </a>
          </nav>
          <div v-if="activeTab === 'pieces'" class="row">
            <template v-for="product in products">
              <div
                :key="product.id"
                class="bounceIn animated col-lg-3 col-md-4 col-sm-6 mb-4"
              >
                <product-card :product="product"></product-card>
              </div>
            </template>
          </div>
          <div v-if="activeTab === 'events'" class="row">
            <template v-for="product in products">
              <div
                :key="product.id"
                class="bounceIn animated col-lg-3 col-md-6 col-sm-6 mb-4"
              >
                <product-card :product="product"></product-card>
              </div>
            </template>
          </div>
          <div v-if="activeTab === 'profile'">
            <h2 class="text-uppercase mb-3">
              Full profile
            </h2>
            <table class="table table-striped">
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>
                    {{ artist.first_name }}
                    {{ artist.last_name }}
                  </td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{{ artist.email }}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{{ artist.phone_number }}</td>
                </tr>
                <tr>
                  <th>Gender</th>
                  <!-- <td>{{ artist.gender }}</td> -->
                </tr>
                <tr>
                  <th>Date of Birth</th>
                  <!-- <td>{{ artist.date_of_birth }}</td> -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '~/components/ProductCard.vue'
import EventCard from '~/components/EventCard.vue'
// import ProfileCard from '~/components/ProfileCard.vue'
// import ArtistProfile from '~/components/ArtistProfile.vue'

export default {
  components: {
    ProductCard,
    // eslint-disable-next-line vue/no-unused-components
    EventCard
    // ProfileCard,
    // ArtistProfile
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
      profile: [],
      products: [],
      events: [],
      activeTab: 'pieces'
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
        this.profile = resp
        // eslint-disable-next-line no-console
        console.log(`response is ${resp}`)
      } catch (e) {
        return { profile: [] }
      }
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
