<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <table class="table table-image">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Artist</th>
                <th scope="col">Quantity</th>
                <th scope="col">Unit Price</th>
                <!-- <th scope="col">Total</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="order_item in order.order_items" :key="order_item.id">
                <td class="w-25">
                  <img
                    :src="order_item.product.picture"
                    class="img-fluid img-thumbnail"
                    alt="craftspace"
                  />
                </td>
                <td>{{ order_item.product.name }}</td>
                <td>{{ order_item.product.uploaded_by }}</td>
                <td>{{ order_item.quantity }}</td>
                <td>{{ order_item.product.price }}</td>
                <!-- <td>2.846</td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  async asyncData({ $axios, params }) {
    try {
      const order = await $axios.$get(`/orders/${params.id}/details/`)
      return { order }
    } catch (e) {
      return { order: null }
    }
  },
  data() {
    return {
      order: Object
    }
  },
  head() {
    return {
      title: 'Craftspace | Order Details |'
    }
  }
}
</script>
