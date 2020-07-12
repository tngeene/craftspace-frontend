<template>
  <div class="product-description">
    <h3>{{ product.name }}</h3>
    <div class="card">
      <div class="card-body">
        <p>Category: {{ product.category.name }}</p>
        <hr />
        <p>{{ product.description }}</p>
        <hr />
        <p>
          Uploaded by:
          <nuxt-link :to="`/artists/${product.uploaded_by.id}/`">{{
            product.uploaded_by.first_name + ' ' + product.uploaded_by.last_name
          }}</nuxt-link>
        </p>
        <p>
          Styles:
        </p>
        <p>
          Mediums:
        </p>
        <p>
          Materials:
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDescriptionCard',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    product: Object
  }
}
</script>
