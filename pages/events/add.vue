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
          src="@/static/artist.jpeg"
        />
      </div>
      <div class="col-md-4">
        <form @submit.prevent="submitevent">
          <div class="form-group">
            <label for>Event Name</label>
            <input v-model="event.name" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label for>Venue</label>
            <input v-model="event.venue" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label for>Banner</label>
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
                <label for>Date</label>
                <b-form-datepicker v-model="event.date" class="form-control" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for>Time</label>
                <b-form-timepicker
                  v-model="event.time"
                  locale="en"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <label for>
                Price
                <small>(ksh)</small>
              </label>
              <input
                v-model="event.ticket_price"
                type="number"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-group mb-3">
            <label for>Description</label>
            <textarea
              v-model="event.description"
              class="form-control"
              rows="8"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-dark">Submit</button>
        </form>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      event: {
        name: '',
        description: '',
        venue: '',
        date: '',
        time: '',
        banner: '',
        ticket_price: ''
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
      this.event.banner = files[0]
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
    async submitevent() {
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      const formData = new FormData()
      for (const data in this.event) {
        formData.append(data, this.event[data])
      }
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await this.$axios.$post(
          '/events/add/',
          formData,
          config
        )
        this.$router.push('/events')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  },
  head() {
    return {
      title: ' Craftspace | Upload Event or Exhibition'
    }
  }
}
</script>
<style scoped></style>
