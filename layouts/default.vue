<template>
  <div>
    <NavBar />
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import NavBar from '../components/Navbar'
import Footer from '~/components/Footer'
export default {
  components: {
    NavBar,
    Footer
  }
}
</script>
<style></style>
