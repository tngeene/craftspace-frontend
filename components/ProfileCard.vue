<template>
  <b-card
    :profile="profile"
    :img-src="profile.photo"
    img-alt="profile photo"
    img-left
    class="mb-3 artist-card"
  >
    <b-card-text class="artist-profile">
      <p>
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
      <div class="d-flex justify-content-between">
        <star-rating
          v-model="rating"
          :show-rating="true"
          :max-rating="5"
          :star-size="20"
          :increment="0.5"
          @rating-selected="setRating"
        ></star-rating>
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
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
