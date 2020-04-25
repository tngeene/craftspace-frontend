<template>
  <div>
    <div id="slides" class="carousel slide" data-ride="carousel">
      <ul class="carousel-indicators">
        <li data-target="#slides" data-slide-to="0" class="active"></li>
        <li data-target="#slides" data-slide-to="1"></li>
        <li data-target="#slides" data-slide-to="2"></li>
      </ul>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="/img/art-background.jpg" />
          <div class="carousel-caption">
            <h1 class="display-2">Craftspace</h1>
            <h3>
              An online space everyone can enjoy, learn and discover the
              richness of African Contemporary Art.
            </h3>
            <button type="button" class="btn btn-outline-light btn-lg">
              View Demo
            </button>
            <button type="button" class="btn btn-primary btn-lg">
              Get Started
            </button>
          </div>
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="/img/trumpet.jpg" />
          <div class="carousel-caption">
            <h3>
              Craftspace showcases the dynamic African art scene and connects a
              selection of African artists with art lovers, collectors,
              curators, art buyers, corporations, museums and art institutions.
            </h3>
          </div>
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="/img/artist.jpeg" />
          <div class="carousel-caption">
            <h3>
              Enhancing creatives and aiming to improve their portfolio.
            </h3>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 text-right mb-4">
      <div class="d-flex justify-content-between mt-2">
        <h3>Upcoming Exhibitions</h3>
        <nuxt-link to="/events/" class="btn btn-sm btn-dark ml-2"
          >All Exhibitions</nuxt-link
        >
      </div>
    </div>
    <hr />
    <template v-for="event in events">
      <div
        :key="event.id"
        class="fadeInUp animated col-lg-8 col-md-4 col-sm-6 mb-4"
      >
        <event-card-home :event="event"></event-card-home>
      </div>
    </template>
    <div class="row ml-auto mr-auto">
      <div class="col-12 text-right mb-4">
        <div class="d-flex justify-content-between">
          <h3>Work of Artists</h3>
          <hr />
          <nuxt-link to="/art/" class="text-dark">View All</nuxt-link>
        </div>
        <hr />
      </div>
      <template v-for="product in products">
        <div
          :key="product.id"
          class="flipInX animated col-lg-3 col-md-4 col-sm-6 mb-4"
        >
          <product-card
            :on-delete="deleteProduct"
            :product="product"
          ></product-card>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import EventCardHome from '~/components/EventCardHome'
import ProductCard from '~/components/ProductCard'
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    EventCardHome,
    ProductCard
  },
  data() {
    return {
      events: [],
      products: [],
      slide: 0,
      sliding: null
    }
  },
  mounted() {
    this.getEvents()
    this.getProducts()
    this.latestEvents()
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    async getEvents() {
      const config = {
        headers: {
          Accept: 'application/json'
        }
      }
      try {
        const events = await this.$axios.get(`events/`, config)
        this.events = events.data
      } catch (e) {
        return { events: [] }
      }
    },
    latestEvents() {
      return this.events.splice(1, 3)
    },
    async getProducts() {
      // method for fetching art pieces in storage
      const config = {
        headers: {
          Accept: 'application/json'
        }
      }
      try {
        const products = await this.$axios.get(
          `art-pieces/all-art-pieces/`,
          config
        )
        this.products = products.data
      } catch (e) {
        return { products: [] }
      }
    }
  },
  head() {
    return {
      title: 'Craftspace | Home'
    }
  }
}
</script>

<style scoped>
@import '~/static/css/home.css';
</style>
