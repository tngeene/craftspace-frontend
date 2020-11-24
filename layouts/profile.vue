<template>
  <div>
    <NavBar />
    <SideNav />
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import NavBar from '~/components/NavBar'
import Footer from '~/components/Footer'
import SideNav from '~/components/SideNav'
export default {
  components: {
    NavBar,
    Footer,
    SideNav
  }
}
</script>
<style></style>
