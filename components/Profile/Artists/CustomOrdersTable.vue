<template>
  <div class="orders-table">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Requested By</th>
          <th scope="col">phone Number</th>
          <th scope="col">Description</th>
          <th scope="col">Due Date</th>
          <th scope="col">Medium</th>
          <th scope="col">Date Uploaded</th>
          <th scope="col">Last Update</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>

      <tbody v-if="orders.length > 0">
        <tr v-for="order in orders" :key="order.id">
          <td>
            {{
              order.requested_by.first_name + ' ' + order.requested_by.last_name
            }}
          </td>
          <td>{{ order.phone_number }}</td>
          <td>{{ order.description | truncate(15, '...') }}</td>
          <td>{{ order.due_date | moment('MMMM Do YYYY') }}</td>
          <td>{{ order.medium }}</td>
          <td>
            {{ order.created_on | moment('MMMM Do YYYY h:mm a') }}
          </td>
          <td>
            {{ order.updated_on | moment('MMMM Do YYYY h:mm a') }}
          </td>
          <td>
            <nuxt-link
              :to="`/custom-orders/${order.id}/`"
              class="btn btn-sm btn-success"
            >
              View
            </nuxt-link>
          </td>
          <td>
            <button
              class="btn btn-sm btn-danger"
              data-toggle="modal"
              data-target="#orderModal"
              @click="modalInfo(order)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="orders.length < 1" class="text-center no-content">
      <img class="img-fluid mb-2" src="/img/painter.png" alt="craftspace" />
      <h3>
        Oops! No custom orders requested yet
      </h3>
    </div>
    <div
      id="orderModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="orderModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="orderModalLabel" class="modal-title">
              Delete order
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete {{ selectedorder.name }}?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">
              Dismiss
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
              @click="deleteOrder(selectedorder.id)"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ArtistCustomOrdersTable',
  filters: {
    truncate(text, length, suffix) {
      if (text.length > 15) {
        return text.substring(0, length) + suffix
      } else {
        return text
      }
    }
  },
  data() {
    return {
      orders: '',
      selectedorder: ''
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
        const resp = await this.$axios.get(`/custom-orders/?artist=${id}`)
        // eslint-disable-next-line no-console
        console.log(`resp is ${resp.data}`)
        this.orders = resp.data
      } catch (e) {
        return { orders: [] }
      }
    },
    async deleteOrder(id) {
      await this.$axios
        .delete(`custom-orders/${id}/`)
        .then((response) => {
          if (response.status === 204) {
            window.location.reload(true)
            this.$toast.success('Order Successfully deleted')
          }
        })
        .catch((error) => {
          if (error.response) this.$toast.show(`${error.response.data.detail}`)
        })
    },
    modalInfo(order) {
      this.selectedorder = order
      // eslint-disable-next-line no-console
      console.log(`selected order is ${this.selectedorder.id}`)
    }
  }
}
</script>
