<template>
  <main class="container my-5">
    <Notification v-if="error" :message="error" />
    <div class="row">
      <div class="col-md-6 mb-4">
        <img
          v-if="!preview"
          class="img-fluid"
          style="width: 400px; border-radius: 10px; box-shadow: 0 1rem 1rem rgba(0,0,0,.7);"
          :src="event.banner"
        />
        <img
          v-else
          class="img-fluid"
          style="width: 400px; border-radius: 10px; box-shadow: 0 1rem 1rem rgba(0,0,0,.7);"
          src="@/static/mask.jpg"
        />
      </div>
      <div class="col-md-4">
        <form @submit.prevent="submitEvent">
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
import Notification from '~/components/Notification'
// gets the individual event from the db for editing
export default {
  components: Notification,
  async asyncData({ $axios, params }) {
    try {
      const event = await $axios.$get(`/events/${params.id}`)
      return { event }
    } catch (e) {
      return { event: [] }
    }
  },
  data() {
    return {
      event: [],
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
      const reader = new FileReader()
      const vm = this
      reader.onload = (e) => {
        vm.preview = e.target.result
      }
      reader.readAsDataURL(file)
    },
    async submitEvent() {
      const editedEvent = this.event
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      const formData = new FormData()
      for (const data in editedEvent) {
        formData.append(data, editedEvent[data])
      }
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await this.$axios.$put(
          `/events/${editedEvent.id}/`,
          formData,
          config
        )
        this.$router.push('/events/')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  },
  head() {
    return {
      title: 'Edit event'
    }
  }
}
</script>

<style></style>
