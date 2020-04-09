<template>
  <header>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <div class="text-box">
      <h1>In love with art?</h1>
      <vue-typed-js
        :strings="[
          'Learn about and collect art from leading and upcoming artists in Kenya',
          'Sell works from your collection',
          'Discover what is happening in the art space in and around Nairobi'
        ]"
        :fade-out="true"
        :loop="true"
        :auto-insert-css="true"
      >
        <p class="mt-3"><span class="typing"></span></p>
      </vue-typed-js>
      <p class="mt-3">Art meets tech ❤️ 🎨 ️</p>
      <nuxt-link class="btn btn-outline-primary btn-large" to="/home">
        Explore <span class="ml-2">&rarr;</span>
      </nuxt-link>
    </div>
  </header>
</template>
<script>
export default {
  layout: 'landing',
  head() {
    return {
      title: 'Craftspace'
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
    url('/masks.jpg');
  background-position: center;
  background-size: cover;
  position: relative;
}
.text-box {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  color: #fff;
}
.text-box h1 {
  font-family: cursive;
  font-size: 5rem;
}
.text-box p {
  font-size: 2rem;
  font-weight: lighter;
  font-family: cursive;
}
</style>
