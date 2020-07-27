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
        <form @submit.prevent="submitOrder">
          <div class="form-group">
            <label for>Medium(s)</label>
            <select v-model="order.medium" class="form-control">
              <option
                v-for="medium in mediums"
                :key="medium.id"
                :value="medium.id"
              >
                {{ medium.name }}</option
              >
            </select>
          </div>
          <div class="form-group">
            <label for>Reference Picture(Optional)</label>
            <input
              type="file"
              name="file"
              accept="image/*"
              @change="onFileChange"
            />
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for>Phone Number</label>
                <input
                  v-model="order.phone_number"
                  type="text"
                  required
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for>
                  Email
                </label>
                <input
                  v-model="order.email"
                  type="email"
                  required
                  class="form-control"
                />
              </div>
            </div>
          </div>
          <div class="form-group mb-3">
            <label for>Description</label>
            <textarea
              v-model="order.description"
              class="form-control"
              rows="6"
            ></textarea>
          </div>
          <div class="form-group">
            <label for>Artist</label>
            <select v-model="order.artist" class="form-control">
              <option
                v-for="artist in artists"
                :key="artist.id"
                :value="artist.id"
              >
                {{ artist.first_name }}</option
              >
            </select>
          </div>
          <div class="form-group mb-3">
            <label for>Due Date</label>
            <b-form-datepicker v-model="order.due_date" class="form-control" />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    try {
      const [artistRes, mediumRes] = await Promise.all([
        $axios.$get('artists'),
        $axios.get('art-pieces/mediums/')
      ])
      return {
        artists: artistRes.data,
        mediums: mediumRes.data
      }
    } catch (e) {
      return {
        artists: [],
        mediums: []
      }
    }
  },
  data() {
    return {
      order: {
        description: '',
        picture: '',
        due_date: '',
        medium: '',
        artist: '',
        email: '',
        phone_number: ''
      },
      artists: Object,
      mediums: Object,
      preview: ''
    }
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.order.picture = files[0]
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
    async submitOrder() {
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      const formData = new FormData()
      for (const data in this.order) {
        formData.append(data, this.order[data])
      }
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await this.$axios.$post(
          '/custom-orders/',
          formData,
          config
        )
        this.$router.push('/home')
      } catch (e) {
        // this.$toast.error(`${this.order.data}`)
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  },
  head() {
    return {
      title: 'Request Custom Order'
    }
  }
}
</script>
<style scoped></style>
