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

import ArtistProfileForm from '~/components/Artists/ArtistProfileForm'
import CollectorProfileForm from '~/components/Collectors/CollectorProfileForm'

export default {
  middleware: 'auth',
  components: {
    ArtistProfileForm,
    CollectorProfileForm
  },
  computed: {
    ...mapGetters(['loggedInUser'])
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
