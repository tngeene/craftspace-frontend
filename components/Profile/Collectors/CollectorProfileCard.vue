<template>
  <div class="col-md-4 mb-3">
    <div
      v-if="profile && loggedInUser.membership_type === 'Collector'"
      class="card profile-card shadow-sm mb-3"
    >
      <img
        class="card-img-top"
        src="/img/art-background.jpg"
        alt="Card image cap"
      />
      <div v-show="profile.photo" class="mx-auto profile-photo">
        <b-avatar :src="profile.photo" size="7rem"></b-avatar>
      </div>
      <div v-show="!profile.photo" class="mx-auto profile-photo">
        <i class="fa fa-user-circle fa-5x mb-2" />
      </div>
      <div class="card-body">
        <div class="text-center">
          <h2 class="text-capitalize py-2">
            {{ profile.user.first_name + ' ' + profile.user.last_name }}
          </h2>
        </div>
        <div class="text-center">
          <p>
            <strong
              ><i class="fa fa-phone fa-rotate-90" aria-hidden="true"></i
            ></strong>
            {{ profile.user.phone_number }}
          </p>
          <p>
            <strong><i class="fa fa-envelope" aria-hidden="true"></i></strong>
            {{ profile.user.email }}
          </p>
          <p>
            <strong
              ><i class="fa fa-map-pin" aria-hidden="true"></i>
              {{ profile.county }}
            </strong>
          </p>
          <p>
            <strong
              ><i class="fa fa-briefcase" aria-hidden="true"></i> Status:
            </strong>
            <span class="text-success">Active</span>
          </p>
          <div class="mt-5"></div>
        </div>
      </div>
    </div>
    <div v-else class="mb-3">
      <b-card>
        <b-skeleton animation="fade" width="85%"></b-skeleton>
        <b-skeleton animation="fade" width="55%"></b-skeleton>
        <b-skeleton animation="fade" width="70%"></b-skeleton>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CollectorProfileCard',
  middleware: 'auth',
  data() {
    return {
      profile: ''
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  mounted() {
    setTimeout(() => {
      this.getCollectorProfile(this.loggedInUser.id)
    }, 1000)
  },
  methods: {
    async getCollectorProfile(id) {
      await this.$axios
        .get(`collectors/profiles/?user=${id}`)
        .then((response) => {
          if (response.status === 200) {
            this.profile = response.data[0]
          }
        })
        .catch((error) => {
          if (error.response) this.$toast.show(`${error.response.data.detail}`)
        })
    }
  }
}
</script>
