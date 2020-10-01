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

      <tbody v-if="products.length > 0">
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
              data-target="#productModal"
              @click="modalInfo(product)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="products.length < 1" class="text-center no-content">
      <img class="img-fluid mb-2" src="/img/painter.png" alt="craftspace" />
      <h3>
        Oops! No pieces uploaded yet, click the button below to add a new piece.
      </h3>
    </div>
    <div class="text-center mb-2">
      <nuxt-link :to="`/art/add`" class="btn btn-sm btn-primary">
        Add New
      </nuxt-link>
    </div>
    <div
      id="productModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="productModalLabel" class="modal-title">
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
            <button type="button" class="btn btn-primary" data-dismiss="modal">
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
      await this.$axios
        .delete(`art-pieces/${id}/delete`)
        .then((response) => {
          if (response.status === 204) {
            window.location.reload(true)
            this.$toast.success('Piece Successfully deleted')
          }
        })
        .catch((error) => {
          if (error.response) this.$toast.show(`${error.response.data.detail}`)
        })
    },
    modalInfo(product) {
      this.selectedProduct = product
      // eslint-disable-next-line no-console
      console.log(`selected product is ${this.selectedProduct.id}`)
    }
  }
}
</script>
