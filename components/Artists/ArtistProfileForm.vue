<template>
  <section class="signup fadeInUp animated">
    <div class="container mt-5">
      <div class="signup-content">
        <div class="profile-form mx-auto my-auto">
          <h2 class="form-title">
            Hey {{ loggedInUser.first_name }}! it's time to update your Profile
          </h2>
          <form
            id="checkout-form"
            method="post"
            class="checkout-form"
            @submit.prevent="postArtistProfile"
          >
            <div class="form-group">
              <textarea
                id="bio"
                v-model="profile.bio"
                type="text"
                placeholder="Tell us something about yourself..."
                cols="40"
                rows="10"
                name="bio"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="county"
                ><i class="zmdi zmdi-account material-icons-name"></i
              ></label>
              <input
                v-model="profile.county"
                type="text"
                name="county"
                placeholder="County"
                required
              />
            </div>
            <div class="form-group">
              <label for="email"><i class="zmdi zmdi-email"></i></label>
              <input
                id="birth_place"
                v-model="profile.birth_place"
                type="text"
                name="text"
                placeholder="Birth Place"
                required
              />
            </div>
            <div class="form-group">
              <label for>Profile Picture</label>
              <input
                type="file"
                name="file"
                accept="image/*"
                @change="onFileChange"
              />
            </div>
            <div class="text-center">
              <button type="submit" class="form-submit btn-md bg-dark">
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ArtistProfileForm',
  // eslint-disable-next-line vue/require-prop-types
  middleware: 'auth',
  data() {
    return {
      profile: {
        bio: '',
        county: '',
        birth_place: '',
        photo: ''
      }
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  // methods for posting checkout info to db
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.profile.photo = files[0]
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
    routeToProfile() {
      this.$store.commit('setProfile')
      this.$router.push('/profile')
    },
    async postArtistProfile() {
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      const formData = new FormData()
      for (const data in this.profile) {
        formData.append(data, this.profile[data])
      }
      await this.$axios
        .post('artists/profiles/', formData, config)
        .then((response) => {
          if (response.status === 201) {
            this.routeToProfile()
            this.$toast.success('Profile Succesfully Updated')
          }
        })
        .catch((error) => {
          if (error.response) {
            this.$toast.show(`${error.response.data.detail}`)
          }
        })
    }
  },
  head() {
    return {
      title: 'Craftspace | Add Profile'
    }
  }
}
</script>

<style scoped>
header {
  min-height: 100vh;
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.9),
      rgba(0, 0, 0, 0.4)
    ),
    url('/img/masai.jpg');
  background-position: center center;
  background-size: cover;
  position: relative;
  overflow: hidden;
}
.label {
  color: #fff;
}
.signup-form {
  width: 100% !important;
  overflow: hidden;
}
</style>
<style scoped>
@import '@/assets/signup/css/style.css';
@import '~/assets/signup/fonts/material-icon/css/material-design-iconic-font.min.css';
</style>
