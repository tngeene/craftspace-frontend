<template>
  <div>
    <div class="container py-3">
      <div class="row">
        <div class="col-lg-12">
          <h3 class="order-title text-center">{{ order.name }}</h3>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-8 col-md-12">
          <img
            :src="order.picture"
            class="w-100"
            height="57%"
            :alt="order.picture"
          />
          <p class="order-description mt-2">{{ order.description }}</p>
          <div
            v-if="
              loggedInUser.membership_type === 'Artist' &&
                loggedInUser.id === order.artist.id
            "
            class="text-center"
          >
            <b-button
              v-if="!order.price"
              v-b-modal.priceModal
              class="btn btn-info"
              @click="modalInfo(order)"
            >
              Quote Price
            </b-button>
            <b-button
              v-if="!order.is_complete"
              v-b-modal.completeModal
              class="btn btn-success"
              :footer-text-variant="footerTextVariant"
              @click="modalInfo(order)"
              >Mark as Complete</b-button
            >
          </div>
        </div>
        <div class="col-lg-4 mb-2">
          <div class="card bg-dark">
            <div class="card-body">
              <div class="card-text date">
                <i class="fa fa-calendar text-white"></i>
                <p class="text-white">
                  {{ order.due_date | moment('MMMM Do YYYY') }}
                </p>
              </div>
              <div v-if="order.requested_by" class="card-text artist">
                <i class="fa fa-user text-white"></i>
                <p class="text-white">
                  {{
                    order.requested_by.first_name +
                      ' ' +
                      order.requested_by.last_name
                  }}
                </p>
              </div>
              <div v-else class="card-text artist">
                <i class="fa fa-user text-white"></i>
                <p class="text-white">
                  {{ order.first_name + ' ' + order.last_name }}
                </p>
              </div>
              <div class="card-text venue">
                <i class="fa fa-paint-brush text-white"></i>
                <p class="text-white">
                  {{ order.medium }}
                </p>
              </div>
              <div class="card-text venue">
                <i class="fa fa-map-pin text-white"></i>
                <p class="text-white">
                  {{ order.size }}
                </p>
              </div>
              <div class="card-text text-white ticket-price">
                &#36;
                <p v-if="order.price">ksh {{ order.price }}</p>
                <p v-else>
                  <span class="badge badge-light">Not yet quoted</span>
                </p>
              </div>
              <!-- <div class="order-actions text-center">
                <button class="btn-md btn-primary">Add to calendar</button>
                <button id="addToCart" class="btn-md text-white">
                  Buy Ticket
                </button>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <b-modal id="priceModal" ref="my-modal" title="Quote Price">
        <form ref="form">
          <b-form-group
            label="Price"
            label-for="price-input"
            invalid-feedback="Price is required"
          >
            <b-form-input
              id="price-input"
              v-model="order.price"
              required
            ></b-form-input>
          </b-form-group>
        </form>
        <template v-slot:modal-footer>
          <div class="w-100">
            <b-button
              variant="success"
              size="md"
              class="float-right ml-2"
              @click="quotePrice"
            >
              Submit
            </b-button>
            <b-button
              variant="warning"
              size="md"
              class="float-right"
              @click="hideModal"
            >
              Cancel
            </b-button>
          </div>
        </template>
      </b-modal>
      <b-modal id="completeModal" ref="my-modal" title="Mark As Complete">
        <p class="my-4">
          Are You sure you want to mark this order as complete?
        </p>
        <template v-slot:modal-footer>
          <div class="w-100">
            <b-button
              variant="success"
              size="md"
              class="float-right ml-2"
              @click="markAsComplete()"
            >
              Submit
            </b-button>
            <b-button
              variant="warning"
              size="md"
              class="float-right"
              @click="hideModal"
            >
              Cancel
            </b-button>
          </div>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  async asyncData({ $axios, params }) {
    try {
      const order = await $axios.$get(`/custom-orders/${params.id}`)
      return { order }
    } catch (e) {
      return { order: null }
    }
  },
  data() {
    return {
      order: Object,
      footerTextVariant: 'info',
      show: false
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  methods: {
    quotePrice() {
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      const data = new FormData()
      data.append('price', this.order.price)

      this.$axios
        .patch(`/custom-orders/${this.$route.params.id}/`, data, config)
        .then((response) => {
          if (response.status === 200) {
            window.location.reload(true)
            this.$toast.success('Price Updated')
          }
        })
        .catch((error) => {
          if (error.response) {
            this.$toast.info(`${error.response.detail.price}`)
          }
        })
    },
    markAsComplete() {
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      const data = new FormData()
      data.append('is_complete', 'true')

      this.$axios
        .patch(`/custom-orders/${this.$route.params.id}/`, data, config)
        .then((response) => {
          if (response.status === 200) {
            window.location.reload(true)
            this.$toast.success('Order marked as complete')
          }
        })
        .catch((error) => {
          if (error.response) {
            this.$toast.info(`${error.response.detail.is_complete}`)
          }
        })
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    modalInfo(order) {
      this.order = order
      // eslint-disable-next-line no-console
      console.log(this.order)
    }
  },
  head() {
    return {
      title: 'Craftspace | Custom Order Details |'
    }
  }
}
</script>
