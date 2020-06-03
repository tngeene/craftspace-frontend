<template>
  <header>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <div v-if="loggedInUser.membership_type === 'Artist'">
      <ArtistProfileForm />
    </div>
    <div v-if="loggedInUser.membership_type === 'Collector'">
      <CollectorProfileForm />
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

import ArtistProfileForm from '~/components/ArtistProfileForm'
import CollectorProfileForm from '~/components/CollectorProfileForm'

export default {
  middleware: 'auth',
  components: {
    ArtistProfileForm,
    CollectorProfileForm
  },
  data() {
    return {
      bio: '',
      county: '',
      birth_place: '',
      photo: '',
      billing_address: ''
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  // methods for posting checkout info to db
  methods: {
    async postArtistProfile() {
      try {
        await this.$axios.post('artists/profile/add', {
          bio: this.bio,
          county: this.county,
          birth_place: this.birth_place,
          photo: this.photo
        })
        this.$toast.success('Profile Succesfully Updated')
        this.$router.push('/home')
      } catch (e) {
        // this.error = e.response.data.detail
        this.$toast.global.my_error() // Using custom toast
        this.$toast.error('Could not  Update Profile :(')
      }
    },
    async postCollectoProfile() {
      try {
        await this.$axios.post('collectors/profile', {
          bio: this.bio,
          county: this.county,
          birth_place: this.birth_place,
          billing_address: this.billing_address,
          photo: this.photo
        })
        this.$toast.success('Profile Succesfully Updated')
        this.$router.push('/home')
      } catch (e) {
        // this.error = e.response.data.detail
        this.$toast.global.my_error() // Using custom toast
        this.$toast.error('Could not  Update Profile :(')
      }
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
