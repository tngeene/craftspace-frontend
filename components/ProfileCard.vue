<template>
  <div class="card mb-3" style="max-width: 1000px;">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="profile.photo" class="card-img" alt="" />
      </div>
      <div class="col-md-8 text-center my-auto">
        <div class="card-body">
          <h5 class="card-title"></h5>
          <p class="card-text">
            <i class="fa fa-info"></i>
            {{ profile.bio }}
          </p>
          <p>
            <i class="fa fa-map"></i>
            {{ profile.county }}
          </p>
          <p>
            <i class="fa fa-calendar"></i>
            {{ profile.created_on }}
          </p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileCard',
  // eslint-disable-next-line vue/require-prop-types
  props: ['profile'],
  data() {
    return {
      rating: 0
    }
  },
  methods: {
    setRating(rating) {
      this.rating = rating
    }
  }
}
</script>

<style scoped>
b-card img-src {
  height: 191px !important;
  width: 275px !important;
}
</style>
