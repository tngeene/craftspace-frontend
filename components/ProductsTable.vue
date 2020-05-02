<template>
  <div class="products-table">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Piece Name</th>
          <th scope="col">Category</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">In Stock</th>
          <th scope="col">Date Uploaded</th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.created_on }}</td>
          <td>
            <nuxt-link
              :to="`/art/${product.id}/`"
              class="btn btn-sm btn-success"
            >
              View
            </nuxt-link>
          </td>
          <td>
            <nuxt-link
              :to="`/art/${product.id}/edit/`"
              class="btn btn-sm btn-primary"
            >
              Edit
            </nuxt-link>
          </td>
          <td>
            <nuxt-link
              :to="`/art/${product.id}/edit/`"
              class="btn btn-sm btn-danger"
            >
              Delete
            </nuxt-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['products', 'onDelete']
}
</script>
