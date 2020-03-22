/* eslint-disable no-console */
<template>
  <main class="container mt-5">
    <div class="row">
      <div class="col-12 text-right mb-4">
        <div class="d-flex justify-content-between">
          <h3>Our Collection</h3>
          <nuxt-link to="/art/add" class="btn btn-info">Add Piece</nuxt-link>
        </div>
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
  </main>
</template>
<script>
// import axios from 'axios'
import ProductCard from '~/components/ProductCard.vue'
export default {
  components: {
    ProductCard
  },
  async asyncData({ $axios, params }) {
    const config = {
      headers: {
        Accept: 'application/json'
      }
    }
    try {
      const products = await $axios.$get(`art-pieces/all-art-pieces/`, config)
      return { products }
    } catch (e) {
      return { products: [] }
    }
  },
  data() {
    return {
      products: []
    }
  },
  methods: {
    // eslint-disable-next-line camelcase
    async deleteProduct({ product }) {
      const config = {
        headers: {
          Accept: 'application/json'
        }
      }
      try {
        // eslint-disable-next-line camelcase
        await this.$axios.$delete(`art-pieces/${product.id}/`, config) // delete product
        const newProducts = await this.$axios.$get(`art-pieces/all-art-pieces/`) // get new list of products after deletion
        this.products = newProducts // update list of products
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  },
  head() {
    return {
      title: 'Our Collection'
    }
  }
}
</script>
<style scoped></style>
