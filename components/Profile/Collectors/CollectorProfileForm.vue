<template>
  <div class="col-md-8">
    <div v-if="profile" class="card">
      <div class="card-body">
        <form @submit.prevent="updateProfile">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for>First Name</label>
                <input
                  v-model="profile.user.first_name"
                  type="text"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for>Last Name</label>
                <input
                  v-model="profile.user.last_name"
                  type="text"
                  class="form-control"
                />
              </div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-12">
              <p class="text-muted">Contact Information</p>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for>Email</label>
                <input
                  v-model="profile.user.email"
                  type="text"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for>Phone Number</label>
                <input
                  v-model="profile.user.phone_number"
                  locale="en"
                  class="form-control"
                />
              </div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-12">
              <p class="text-muted">About</p>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label for>Bio</label>
                <textarea
                  v-model="profile.bio"
                  placeholder="Tell us something about yourself"
                  type="text"
                  rows="10"
                  cols="100"
                  class="form-control"
                />
              </div>
            </div>
          </div>

          <button type="submit" class="btn d-flex  btn-dark">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CollectorProfileForm',
  middleware: 'auth',
  data() {
    return {
      profile: '',
      profile_id: ''
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  mounted() {
    setTimeout(() => {
      this.getProfile(this.profile_id)
    }, 1000)
    this.getUserProfile(this.loggedInUser.id)
  },
  methods: {
    async getProfile(id) {
      await this.$axios
        .get(`collectors/profiles/${id}`)
        .then((response) => {
          if (response.status === 200) {
            this.profile = response.data
          }
        })
        .catch((error) => {
          if (error.response) this.$toast.show(`${error.response.data.detail}`)
        })
    },
    async getUserProfile(id) {
      await this.$axios
        .get(`collectors/profiles/?user=${id}`)
        .then((response) => {
          if (response.status === 200) {
            this.profile_id = response.data[0].id
          }
        })
        .catch((error) => {
          if (error.response) this.$toast.show(`${error.response.data.detail}`)
        })
    }
  }
}
</script>
