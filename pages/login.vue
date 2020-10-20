<template>
  <header>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=yes"
    />
    <!-- Sign in  Form -->
    <LoginForm />
  </header>
</template>

<script>
import LoginForm from '~/components/Auth/LoginForm'
export default {
  middleware: 'guest',
  components: { LoginForm },
  head() {
    return {
      title: 'Craftspace | Login'
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
</style>
