<template>
  <div class="container-fluid">
    <div class="row mt-2 mb-2">
      <div class="col-12 col-md-6">
        <img :src="profile.photo" class="w-100" alt="" />
      </div>
      <div class="col-12 col-md-6 my-auto text-center">
        <h2 class="user-title">{{ profile.user }}</h2>
        <span> {{ profile.county }} </span>
        <p>{{ profile.bio }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtistProfile',
  // eslint-disable-next-line vue/require-prop-types
  props: ['profile']
  //   data() {
  //     return {
  //       rating: 0
  //     }
  //   },
  //   methods: {
  //     setRating(rating) {
  //       this.rating = rating
  //     }
  //   }
}
</script>
