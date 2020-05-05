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

    <!-- about section -->
    <div class="container-fluid padding mt-2">
      <div class="row padding align-items-lg-center">
        <div class="col-md-12 col-lg-6">
          <h2 class="title text-center">About</h2>
          <p>
            Imagination is the source of every human achievement.For the bulk of
            human history, we have relied on this creativity to build
            inspirational and well designed art, be it music, hand made craft
            and tech art.
          </p>
          <p>
            Even now, after all the technological advancements, where everything
            is virtual, humans still feel a deep connection to visual art,
            Craftspace offers a space for African artists, especially the hand
            made craft to showcase their craft.
          </p>
          <p>
            It is with this aim that the project was made, to offer a digital
            solution to the display of curated African art and showcase the
            works of various artists from the continent. It aims at offering the
            perfect intersection point between art and technology.
          </p>
          <br />
          <div class="col-12 text-center">
            <a href="#"
              ><button class="btn btn-primary from-top text-center">
                <span>More</span>
              </button></a
            >
          </div>
        </div>
        <div class="col-lg-6">
          <img class="img-fluid" src="/img/create.jpeg" alt="" />
        </div>
      </div>
    </div>
    <div class="container-fluid padding">
      <div class="row">
        <div class="col-12 mb-4">
          <div class="mt-2">
            <h2 class="title text-center">Exhibitions</h2>
            <nuxt-link
              to="/events/"
              class="float-right btn btn-sm btn-dark ml-2"
              >All Exhibitions</nuxt-link
            >
          </div>
        </div>
        <template v-for="event in events.slice(0, 3)">
          <div
            :key="event.id"
            class="fadeInUp animated col-lg-8 col-md-4 col-sm-6 mb-4"
          >
            <event-card-home :event="event"></event-card-home>
          </div>
        </template>
      </div>
    </div>
    <div class="container-fluid-padding">
      <div class="row">
        <div class="col-12 text-right mb-4">
          <div>
            <h2 class="title text-center">Work of Artists</h2>
            <nuxt-link to="/art/" class="text-dark mr-2">View All</nuxt-link>
          </div>
        </div>
        <template v-for="product in products.slice(0, 4)">
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
        // eslint-disable-next-line no-console
        console.log(`resp is ${events.data}`)
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
