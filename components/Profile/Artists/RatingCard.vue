<template>
  <div>
    <div class="text-center py-4 mr-2">
      <div>
        <label for>Average Rating from {{ ratings }} ratings</label>
        <b-form-rating
          v-model="average_rating"
          variant="info"
          class="mb-2"
          readonly
          no-border
        ></b-form-rating>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'RatingForm',
  middleware: 'auth',
  // eslint-disable-next-line vue/require-prop-types
  props: ['artistProfile'],
  data() {
    return {
      average_rating: '',
      profile_id: '',
      ratings: ''
    }
  },
  computed: {
    ...mapGetters(['loggedInUser', 'isAuthenticated'])
  },
  mounted() {
    this.getAverageRating(this.loggedInUser.id)
  },
  methods: {
    getAverageRating(id) {
      try {
        this.$axios.get(`artists/profiles/?user=${id}`).then((response) => {
          if (response.status === 200) {
            this.average_rating = response.data[0].average_rating
            this.ratings = response.data[0].ratings
            this.profile_id = response.data[0].id
          }
        })
      } catch (e) {
        this.$toast.error('Could not get average rating at this time')
      }
    }
  }
}
</script>
