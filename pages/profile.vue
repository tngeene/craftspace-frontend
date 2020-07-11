<template>
  <div>
    <div class="row">
      <div id="wrapper" class="d-flex">
        <!-- Sidebar -->
        <div id="sidebar-wrapper" class="bg-light border-left">
          <div class="sidebar-heading">
            {{ loggedInUser.membership_type }} Profile
          </div>
          <hr />
          <div class="list-group list-group-flush">
            <p
              class="list-group-item list-group-item-action bg-light"
              @click="profileIsVisible = !profileIsVisible"
            >
              Profile
            </p>
            <p
              v-if="loggedInUser.membership_type === 'Artist'"
              class="list-group-item list-group-item-action bg-light"
              @click="
                profileIsVisible = !profileIsVisible && !productsIsVisible
              "
            >
              Pieces
            </p>
            <a
              v-if="loggedInUser.membership_type === 'Collector'"
              href="#"
              class="list-group-item list-group-item-action bg-light"
              >Order History</a
            >
            <p
              v-if="loggedInUser.membership_type === 'Artist'"
              class="list-group-item list-group-item-action bg-light"
              @click="profileIsVisible = !profileIsVisible && eventsIsVisible"
            >
              Exhibitions
            </p>
            <a href="#" class="list-group-item list-group-item-action bg-light"
              >Custom Orders</a
            >
          </div>
        </div>
      </div>
      <div class="col-9 mx-auto">
        <template v-for="profile in profiles">
          <div :key="profile.id" class="mt-3">
            <profile-card
              v-if="profileIsVisible && !productsIsVisible && !eventsIsVisible"
              :profile="profile"
            ></profile-card>
          </div>
        </template>
        <!-- products table -->
        <div
          v-if="!profileIsVisible && !productsIsVisible && !eventsIsVisible"
          class="products-table"
        >
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
                <!-- <th class="float-right bg-light">
                  <nuxt-link :to="`/art/add`" class="btn btn-sm btn-primary">
                    Add New
                  </nuxt-link>
                </th> -->
              </tr>
            </thead>

            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.description | truncate(15, '...') }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.quantity }}</td>
                <td>
                  {{ product.created_on | moment('MMMM Do YYYY h:mm a') }}
                </td>
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
                  <button
                    class="btn btn-sm btn-danger"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    @click="modalInfo(product)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class=" text-center">
            <nuxt-link :to="`/art/add`" class="btn btn-sm btn-primary">
              Add New
            </nuxt-link>
          </div>
        </div>
        <!-- end of products table -->
        <!-- events table -->
        <div
          v-if="!profileIsVisible && !productsIsVisible && !eventsIsVisible"
          class="events-table mt-3 mb-2"
        >
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Event Price</th>
                <th scope="col">Date</th>
                <th scope="col">Description</th>
                <th scope="col">Venue</th>
                <th scope="col">Ticket Price</th>
                <th scope="col">Date Uploaded</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <!-- <th class="float-right bg-light">
                  <nuxt-link :to="`/art/add`" class="btn btn-sm btn-primary">
                    Add New
                  </nuxt-link>
                </th> -->
              </tr>
            </thead>

            <tbody>
              <tr v-for="event in events" :key="event.id">
                <td>{{ event.name }}</td>
                <td>{{ event.date }}</td>
                <td>{{ event.description | truncate(15, '...') }}</td>
                <td>{{ event.venue }}</td>
                <td>{{ event.ticket_price }}</td>
                <td>
                  {{ event.created_on | moment('MMMM Do YYYY h:mm a') }}
                </td>
                <td>
                  <nuxt-link
                    :to="`/events/${event.id}/`"
                    class="btn btn-sm btn-success"
                  >
                    View
                  </nuxt-link>
                </td>
                <td>
                  <nuxt-link
                    :to="`/events/${event.id}/edit/`"
                    class="btn btn-sm btn-primary"
                  >
                    Edit
                  </nuxt-link>
                </td>
                <td>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="deleteEvent(event.id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class=" text-center">
            <nuxt-link :to="`/events/add`" class="btn btn-sm btn-primary">
              Add New
            </nuxt-link>
          </div>
        </div>
        <!-- end of events table -->
        <!-- Modal -->
        <div
          id="exampleModal"
          class="modal fade"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 id="exampleModalLabel" class="modal-title">
                  Delete Product
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
                <p>
                  Are you sure you want to delete {{ selectedProduct.name }}?
                </p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Dismiss
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                  @click="deleteProduct(selectedProduct.id)"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfileCard from '~/components/ProfileCard'
// import ProductsTable from '~/components/ProductsTable'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ProfileCard
    // ProductsTable
  },
  middleware: 'has-profile',
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
      profiles: [],
      products: [],
      events: [],
      selectedProduct: '',
      profileIsVisible: true,
      productsIsVisible: false,
      eventsIsVisible: false
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  mounted() {
    this.getProfile(this.loggedInUser.id)
    this.getMyPieces(this.loggedInUser.id)
    this.getMyEvents(this.loggedInUser.id)
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$toast.success('Successfully Logged Out')
    },
    async getProfile(id) {
      try {
        const resp = await this.$axios.get(`artists/profiles/?user=${id}`)
        // eslint-disable-next-line no-console
        console.log(`resp is ${resp.data}`)
        this.profiles = resp.data
      } catch (e) {
        return { profiles: [] }
      }
    },
    async getMyPieces(id) {
      try {
        const products = await this.$axios.get(
          `art-pieces/all-art-pieces/?uploaded_by=${id}`
        )
        this.products = products.data
      } catch (e) {
        return { products: [] }
      }
    },
    async deleteProduct(id) {
      try {
        await this.$axios.delete(`art-pieces/${id}/delete`)
        this.$toast.success('Piece Successfully Deleted')
        this.$router.redirect('/profile')
      } catch (e) {
        this.$toast.error('Could Not delete')
        return e.data
      }
    },
    async getMyEvents(id) {
      try {
        const events = await this.$axios.get(`events/?uploaded_by=${id}`)
        this.events = events.data
      } catch (e) {
        return { events: [] }
      }
    },
    async deleteEvent(id) {
      try {
        await this.$axios.delete(`events/${id}`)
        this.$toast.success('Events Successfully Deleted')
        this.$router.push('/profile')
      } catch (e) {
        this.$toast.danger('Could Not delete')
        return e
      }
    },
    modalInfo(product) {
      this.selectedProduct = product
      // eslint-disable-next-line no-console
      console.log(`selected product is ${this.selectedProduct.id}`)
    },
    toggleSideNav() {
      // eslint-disable-next-line prefer-const
      let sideNavPos = document.querySelector('#sideNav')
      // eslint-disable-next-line no-unused-expressions
      sideNavPos.style.left === '-250px'
      if (sideNavPos.style.left === '-250px') {
        sideNavPos.style.left = '0'
      } else {
        sideNavPos.style.left = '-250px'
      }
    }
  },
  head() {
    return {
      title:
        'Craftspace | Profile' +
        ' ' +
        this.loggedInUser.first_name +
        ' ' +
        this.loggedInUser.last_name
    }
  }
}
</script>
