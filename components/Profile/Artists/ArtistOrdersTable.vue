<template>
  <div class="orders-table">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Number Of Pieces</th>
          <th scope="col">Status</th>
          <th scope="col">Date</th>
          <th scope="col"></th>
        </tr>
      </thead>

      <tbody v-if="orders.length > 0">
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.order_items_count }}</td>
          <td>
            <span
              v-if="order.status == 'placed'"
              class="badge badge-pill badge-info"
              >Placed</span
            >
            <span
              v-if="order.status == 'created'"
              class="badge badge-pill badge-info"
              >Created</span
            >
            <span
              v-if="order.status == 'paid'"
              class="badge badge-pill badge-success"
              >Paid</span
            >
          </td>
          <td>{{ order.order_date | moment('MMMM Do YYYY') }}</td>
          <td>
            <nuxt-link
              :to="`/orders/${order.id}/`"
              class="btn btn-sm btn-success"
            >
              View
            </nuxt-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="orders.length < 1" class="text-center no-content">
      <img class="img-fluid mb-2" src="/img/painter.png" alt="craftspace" />
      <h3>
        Oops! No orders made yet, visit our collection and make a purchase.
      </h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ArtistOrdersTable',
  data() {
    return {
      orders: ''
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  mounted() {
    this.getMyOrders(this.loggedInUser.id)
  },
  methods: {
    async getMyOrders(id) {
      try {
        const resp = await this.$axios.get(`/orders/my-orders/`)
        this.orders = resp.data
      } catch (e) {
        return { orders: [] }
      }
    }
  }
}
</script>
