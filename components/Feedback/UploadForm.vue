<template>
  <div class="col-md-8 mx-auto mt-5 fadeInUp animated">
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="postFeedback">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for> Name</label>
                <input
                  v-model="feedback.name"
                  type="text"
                  class="form-control"
                  required
                />
              </div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for>Email</label>
                <input
                  v-model="feedback.email"
                  type="text"
                  class="form-control"
                  required
                />
              </div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <label for>Message</label>
                <textarea
                  v-model="feedback.message"
                  placeholder="Have any enquiries or feedback? Leave it in the comment box here.."
                  type="text"
                  rows="10"
                  cols="100"
                  class="form-control"
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" class="btn d-flex text-center btn-dark">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeedbackUploadForm',
  middleware: 'auth',
  data() {
    return {
      feedback: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
  methods: {
    postFeedback() {
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      const formData = new FormData()
      for (const data in this.feedback) {
        formData.append(data, this.feedback[data])
      }
      this.$axios.post(`feedback/`, formData, config).then((response) => {
        if (response.status === 201) {
          this.$router.push('/home')
          this.$toast
            .success(
              "Thanks for your feedback! We'll get back to you as soon as possible."
            )
            .catch((error) => {
              if (error.response) {
                this.$toast.show(`${error.response.data.detail}`)
              }
            })
        }
      })
    }
  }
}
</script>
