<template>
  <div>
    <div class="text-center py-4 mr-2">
      <div v-if="!isAuthenticated">
        <label for>Average Rating</label>
        <b-form-rating
          v-model="average_rating"
          variant="info"
          class="mb-2"
          readonly
          no-border
        ></b-form-rating>
      </div>
      <div v-else>
        <label for>Rate Artist</label>
        <form @submit.prevent="postRating">
          <b-input-group>
            <b-form-rating
              v-model="rating"
              no-border
              variant="warning"
            ></b-form-rating>
            <b-input-group-append>
              <b-button type="submit" class="btn-info"
                >Submit</b-button
              ></b-input-group-append
            >
          </b-input-group>
        </form>
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
      profile: '',
      rating: '',
      average_rating: ''
    }
  },
  computed: {
    ...mapGetters(['loggedInUser', 'isAuthenticated'])
  },
  mounted() {
    this.getAverageRating(this.artistProfile.id)
  },
  methods: {
    async postRating() {
      this.$toast.show('Posting Rating')
      try {
        await this.$axios
          .post('artists/profiles/post-rating/', {
            profile: this.artistProfile.id,
            rating: this.rating
          })
          .then((response) => {
            if (response.status === 201) {
              this.$toast.success(`${response.data.detail}`)
              // window.location.reload(true)
            } else {
              this.$toast.error(`${response.data.detail}`)
            }
          })
      } catch (e) {
        this.$toast.error(`${this.response.data.detail}`)
      }
    },
    getAverageRating(id) {
      try {
        this.$axios.get(`artists/profiles/${id}/`).then((response) => {
          if (response.status === 200) {
            this.average_rating = response.data.average_rating
          }
        })
      } catch (e) {
        this.$toast.error('Could not get average rating at this time')
      }
    }
  }
}
</script>
