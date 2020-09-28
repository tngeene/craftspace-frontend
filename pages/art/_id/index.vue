<template>
  <section id="productSection" class="product-page">
    <div class="container row py-2 mx-auto">
      <div class="col-12">
        <h3>
          {{ product.name }} by
          {{
            product.uploaded_by.first_name + ' ' + product.uploaded_by.last_name
          }}
        </h3>
        <nav class="nav">
          <a class="nav-link active" href="#">Browse Categories |</a>
          <a class="nav-link" href="#"
            >{{
              product.uploaded_by.first_name +
                ' ' +
                product.uploaded_by.last_name
            }}
            |
          </a>
          <a class="nav-link" href="#">{{ product.name }}</a>
        </nav>
      </div>

      <div class="row">
        <div class="col-1 mini-images">
          <div class="images text-center">
            <img
              :src="product.picture"
              height="60px"
              width="60px"
              :alt="product.name"
            />
            <img
              v-if="product.image"
              :src="product.image"
              height="60px"
              width="60px"
              :alt="product.name"
            />
          </div>
        </div>
        <div class="col-md-7">
          <img
            :src="product.picture"
            height="400rem"
            width="100%"
            :alt="product.name"
          />
        </div>
        <div class="col-md-4 bg-light p-4">
          <h5>{{ product.name }}</h5>
          <small>
            {{
              product.uploaded_by.first_name +
                ' ' +
                product.uploaded_by.last_name
            }}
          </small>
          <div class="product-price mt-5 py-3 text-white text-center">
            <div class="">
              <p>Ksh {{ product.price }}</p>
            </div>
            <div>
              <button
                id="addToCart"
                class="btn text-white"
                @click="addToCart(product)"
              >
                <i class="fa fa-shopping-cart"></i> add to cart
              </button>
            </div>
          </div>
        </div>
        <div id="productDescCard" class="col-12">
          <ProductDescriptionCard :product="product" />
        </div>
        <div class="col-12">
          <h3>
            Other Pieces by
            {{
              product.uploaded_by.first_name +
                ' ' +
                product.uploaded_by.last_name
            }}
          </h3>
        </div>
        <template v-for="piece in pieces">
          <div
            :key="piece.id"
            class="flipInX animated col-lg-3 col-md-4 col-sm-6 mb-4"
          >
            <product-card :product="piece"></product-card>
          </div>
        </template>
        <div class="col-12">
          <h3>
            You Might also Be interested in
          </h3>
        </div>
        <template v-for="piece in category_products">
          <div
            :key="piece.id"
            class="flipInX animated col-lg-3 col-md-4 col-sm-6 mb-4"
          >
            <product-card :product="piece"></product-card>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import ProductDescriptionCard from '~/components/Products/ProductDescriptionCard'
import ProductCard from '~/components/Products/ProductCard'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { ProductDescriptionCard, ProductCard },
  async asyncData({ $axios, params, product }) {
    try {
      const product = await $axios.$get(`/art-pieces/${params.id}`)
      return { product }
    } catch (e) {
      return { product: null }
    }
  },
  data() {
    return {
      product: Object,
      pieces: [],
      category_products: []
    }
  },
  created() {
    this.getArtistProduct()
    this.getRelatedProducts()
  },
  methods: {
    async getArtistProduct() {
      const uploadedBy = this.product.uploaded_by.id
      try {
        const resp = await this.$axios.get(
          `art-pieces/all-art-pieces/?uploaded_by=${uploadedBy}`
        )
        // resp = this.pieces.splice(this.piece.indexOf(this.piece), 1)
        this.pieces = resp.data
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },
    async getRelatedProducts() {
      try {
        const category = this.product.category.id
        const resp = await this.$axios.get(
          `art-pieces/all-art-pieces/?category=${category}`
        )
        // resp = this.pieces.splice(this.piece.indexOf(this.piece), 1)
        this.category_products = resp.data
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },
    addToCart(item) {
      this.$store.commit('cart/addToCart', item)
      this.$toast.success('Added to Cart')
    },
    removeFromCart(item) {
      this.$store.commit('cart/removeItem', item)
      this.$toast.success('Removed from Cart')
    }
  },
  head() {
    return {
      title: 'Craftspace | ' + this.product.name
    }
  }
}
</script>
<style>
header {
  min-height: 100vh;
  background-image: none !important;
  background-position: center center;
  background-size: cover;
  position: relative;
}
</style>
