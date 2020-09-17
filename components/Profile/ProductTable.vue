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
            <p>Are you sure you want to delete {{ selectedProduct.name }}?</p>
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
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ProductTable',
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
      products: '',
      selectedProduct: ''
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  mounted() {
    this.getMyPieces(this.loggedInUser.id)
  },
  methods: {
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
    modalInfo(product) {
      this.selectedProduct = product
      // eslint-disable-next-line no-console
      console.log(`selected product is ${this.selectedProduct.id}`)
    }
  }
}
</script>
