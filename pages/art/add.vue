<template>
  <main class="container my-5">
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
          src="/img/ethnic-mask.jpg"
        />
      </div>
      <div class="col-md-4">
        <form @submit.prevent="submitproduct">
          <div class="form-group">
            <label for>product Name</label>
            <input v-model="product.name" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label for>Category</label>
            <input
              v-model="product.category"
              type="number"
              class="form-control"
            />
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
export default {
  data() {
    return {
      product: {
        name: '',
        description: '',
        price: '',
        picture: '',
        category: '',
        quantity: ''
      },
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
      // let image = new Image();
      const reader = new FileReader()
      const vm = this
      reader.onload = (e) => {
        vm.preview = e.target.result
      }
      reader.readAsDataURL(file)
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
