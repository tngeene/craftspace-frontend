<template>
  <main class="container my-5">
    <div class="row">
      <div class="row col-md-6">
        <div class="col-md-12 mb-4">
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
            src="/img/ethnic-mask.jpg"
          />
        </div>
        <div class="col-md-12 mb-4">
          <model-fbx
            v-if="spin_preview"
            class="img-fluid"
            style="width: 400px; border-radius: 10px; box-shadow: 0 1rem 1rem rgba(0,0,0,.7);"
            :src="spin_preview"
            alt
          ></model-fbx>
        </div>
      </div>
      <div class="row col-md-6">
        <div class="col-md-12">
          <form @submit.prevent="submitproduct">
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
                @change="onImageChange"
              />
            </div>
            <div class="form-group">
              <label for>3D Image</label>
              <input
                type="file"
                name="file"
                accept="file/fbx, file/obj, file/gltf, file/ply"
                @change="onFileChange"
              />
            </div>
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
    </div>
  </main>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    try {
      const categories = await $axios.$get(`art-pieces/art-categories`)
      return { categories }
    } catch (e) {
      // eslint-disable-next-line nuxt/no-this-in-fetch-data
      return { categories: [] }
    }
  },
  data() {
    return {
      product: {
        name: '',
        description: '',
        price: '',
        picture: '',
        category: '',
        quantity: '',
        is_approved: 'true'
      },
      categories: Object,
      preview: '',
      spin_preview: ''
    }
  },
  methods: {
    onImageChange(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.product.picture = files[0]
      this.createImage(files[0])
    },
    onFileChange(e) {
      const images = e.target.files || e.dataTransfer.files
      if (!images.length) {
        return
      }
      this.product.spin_image = images[0]
      this.create3DImage(images[0])
    },
    createImage(file) {
      // let image = new Image();
      const reader = new FileReader()
      const vm = this
      reader.onload = (e) => {
        vm.preview = e.target.result
      }
      reader.readAsDataURL(file)
    },
    create3DImage(image) {
      const reader = new FileReader()
      const vm = this
      reader.onload = (e) => {
        vm.spin_preview = e.target.result
      }
      reader.readAsDataURL(image)
    },
    async submitproduct() {
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      const formData = new FormData()
      for (const data in this.product) {
        formData.append(data, this.product[data])
      }
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await this.$axios.$post(
          '/art-pieces/add/',
          formData,
          config
        )
        this.$router.push('/art')
      } catch (e) {
        // this.$toast.error(`${this.product.data}`)
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  },
  head() {
    return {
      title: 'Add Art Piece'
    }
  }
}
</script>
<style scoped></style>
