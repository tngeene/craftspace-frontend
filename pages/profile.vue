<template>
  <div>
    <div class="row">
      <div id="wrapper" class="d-flex">
        <!-- Sidebar -->
        <div id="sidebar-wrapper" class="bg-light border-left">
          <div class="sidebar-heading">My profile</div>
          <hr />
          <div class="list-group list-group-flush">
            <p
              class="list-group-item list-group-item-action bg-light"
              @click="isVisible = !isVisible"
            >
              Profile
            </p>
            <p
              class="list-group-item list-group-item-action bg-light"
              @click="isVisible = !isVisible"
            >
              Pieces
            </p>
            <a href="#" class="list-group-item list-group-item-action bg-light"
              >Order History</a
            >
            <p
              class="list-group-item list-group-item-action bg-light"
              @click="isVisible = !isVisible"
            >
              Exhibitions
            </p>
            <a href="#" class="list-group-item list-group-item-action bg-light"
              >Custom Orders</a
            >
          </div>
        </div>
      </div>
      <div class="col-10">
        <template v-for="profile in profiles">
          <div :key="profile.id" class="ml-3 mt-3">
            <profile-card v-if="!isVisible" :profile="profile"></profile-card>
          </div>
        </template>
        <!-- products table -->
        <div v-if="isVisible" class="products-table">
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
                    @click="deleteProduct(product.id)"
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
        <div v-if="isVisible" class="events-table mt-3 mb-2">
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
    ProfileCard
    // ProductsTable
  },
  middleware: 'auth',
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
      isVisible: false
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
        this.$toast.success('Product Successfully Deleted')
        this.$router.push('/profile')
      } catch (e) {
        this.$toast.danger('Could Not delete')
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

<style scoped>
@import '@/assets/main/css/simple-sidebar.css';
</style>
