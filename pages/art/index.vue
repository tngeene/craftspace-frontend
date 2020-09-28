/* eslint-disable no-console */
<template>
  <main class="container mt-5">
    <div class="row">
      <div class="col-12 text-right mb-4">
        <div class="d-flex justify-content-between">
          <h3 class="text-dark">Browse through Various Categories</h3>
        </div>
      </div>
      <template v-for="category in categories">
        <div
          :key="category.id"
          class="fadeInUp animated col-lg-3 col-md-4 col-sm-6 mb-4"
          @click="getCategoryProduct(category.id)"
        >
          <category-card :category="category"></category-card>
        </div>
      </template>
    </div>
    <div class="row">
      <div class="col-12 text-right mb-4">
        <div class="d-flex justify-content-between">
          <h3 class="text-dark">Our Collection</h3>
          <nuxt-link to="/art/" class="btn btn-outline-dark btn-large mr-2"
            >View All</nuxt-link
          >
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
import ProductCard from '~/components/Products/ProductCard'
import CategoryCard from '~/components/Products/CategoryCard'
export default {
  components: {
    ProductCard,
    CategoryCard
  },
  async asyncData({ $axios, params }) {
    const config = {
      headers: {
        Accept: 'application/json'
      }
    }
    try {
      const [categoriesRes, productsRes] = await Promise.all([
        $axios.get('art-pieces/art-categories', config),
        $axios.get('art-pieces/all-art-pieces/', config)
      ])
      return {
        categories: categoriesRes.data,
        products: productsRes.data
      }
    } catch (e) {
      return {
        products: [],
        categories: []
      }
    }
  },
  data() {
    return {
      products: [],
      categories: []
    }
  },
  // mounted() {
  //   this.getCategoryProduct()
  // },
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
    },
    async getCategoryProduct(id) {
      try {
        // eslint-disable-next-line no-console
        console.log(id)
        const res = await this.$axios.$get(
          `art-pieces/all-art-pieces/?category=${id}`
        )
        this.products = res
        // eslint-disable-next-line no-console
        console.log(res)
      } catch (e) {
        return { products: [] }
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
