<template>
  <div class="card bg-dark text-white category-card" @click="onClick">
    <img class="card-img" :src="category.cover_photo" alt="Card image" />
    <div class="card-img-overlay">
      <p class="card-text d-flex justify-content-center">
        {{ category.name }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CategoryCard',
  // eslint-disable-next-line vue/require-prop-types
  props: ['category'],
  data() {
    return {
      search: ''
    }
  },
  methods: {
    onClick() {
      this.$emit('search-products', this.search)
      this.search = ''
    }
  }
}
</script>
<style>
.card-text {
  top: 50%;
  transform: translateY(-50%);
  position: relative;
}
</style>
