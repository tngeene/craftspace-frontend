<template>
  <main class="container my-5">
    <Notification v-if="error" :message="error" />
    <div class="row">
      <div class="col-md-6 mb-4">
        <img
          v-if="preview"
          class="img-fluid"
          style="width: 400px; border-radius: 10px; box-shadow: 0 1rem 1rem rgba(0,0,0,.7);"
          :src="preview"
          alt
        />
        <img
          v-else
          class="img-fluid"
          style="width: 400px; border-radius: 10px; box-shadow: 0 1rem 1rem rgba(0,0,0,.7);"
          :src="product.picture"
        />
      </div>
      <div class="col-md-4">
        <form @submit.prevent="editProduct">
          <div class="form-group">
            <label for>product Name</label>
            <input v-model="product.name" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label for>Category</label>
            <select v-model="product.category" class="form-control">
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}</option
              >
            </select>
          </div>
          <div class="form-group">
            <label for>Picture</label>
            <input
              type="file"
              name="file"
              accept="image/*"
              @change="onFileChange"
            />
          </div>
          <!-- <div class="form-group">
            <label for>3D Image</label>
            <input type="file" name="file" @change="onFileChange" />
          </div> -->
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for>Quantities available</label>
                <input
                  v-model="product.quantity"
                  type="number"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for>
                  Price
                  <small>(ksh)</small>
                </label>
                <input
                  v-model="product.price"
                  type="number"
                  class="form-control"
                />
              </div>
            </div>
          </div>
          <div class="form-group mb-3">
            <label for>Description</label>
            <textarea
              v-model="product.description"
              class="form-control"
              rows="8"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import Notification from '~/components/Notification'
// gets the individual product from the db for editing
export default {
  components: Notification,
  async asyncData({ $axios, params }) {
    try {
      const [productRes, categoriesRes] = await Promise.all([
        $axios.get(`/art-pieces/${params.id}/`),
        $axios.get(`art-pieces/art-categories`)
      ])
      return {
        product: productRes.data,
        categories: categoriesRes.data
      }
    } catch (e) {
      return {
        product: [],
        categories: []
      }
    }
  },
  data() {
    return {
      product: [],
      categories: Object,
      preview: ''
    }
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.product.picture = files[0]
      this.createImage(files[0])
    },
    createImage(file) {
      const reader = new FileReader()
      const vm = this
      reader.onload = (e) => {
        vm.preview = e.target.result
      }
      reader.readAsDataURL(file)
    },
    async editProduct() {
      const product = this.product
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      const formData = new FormData()
      for (const data in product) {
        formData.append(data, product[data])
      }
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await this.$axios.$put(
          `/art-pieces/${product.id}/edit/`,
          formData,
          config
        )
        this.$toast.success(`${this.product.name} successfully updated`)
        this.$router.push('/art/')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  },
  head() {
    return {
      title: 'Edit Piece | ' + this.product.name
    }
  }
}
</script>

<style></style>
