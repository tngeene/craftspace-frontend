<template>
  <div class="card product-card">
    <img :src="product.picture" class="card-img-top" />
    <div class="card-body text-center">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">
        <strong> Category:</strong> {{ product.category }}
      </p>
      <p class="card-text">
        <strong> Artist:</strong> {{ product.uploaded_by }}
      </p>
      <div class="action-buttons text-center">
        <nuxt-link :to="`/art/${product.id}/`" class="btn btn-md btn-primary">
          View
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['product', 'onDelete']
}
</script>
<style>
.product-card {
  box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.6);
}
</style>
