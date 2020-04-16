<template>
  <div class="card artist-card ml-2" style="width: 18rem;">
    <nuxt-link :to="`artists/${artist.id}`">
      <img class="card-img-top" src="/artist.jpeg" alt="Card image cap" />
      <div class="card-body">
        <p class="card-text text-dark">
          {{ artist.first_name }} {{ artist.last_name }}
        </p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['artist']
}
</script>

<style scoped>
.artist-card:hover {
  transform: translateY(-10px);
}
</style>
