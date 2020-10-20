<template>
  <header>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <section class="signup fadeInUp animated">
      <div class="container mt-5">
        <div class="signup-content">
          <div class="signup-form my-auto">
            <h2 class="form-title">Reset Password</h2>
            <form
              id="password-reset-form"
              method="post"
              class="password-reset-form"
              @submit.prevent="setPassword"
            >
              <div class="form-group">
                <label for="password"
                  ><i class="zmdi zmdi-account-box-o"></i
                ></label>
                <input
                  id="new-password"
                  v-model="password"
                  type="password"
                  name="New Password"
                  placeholder="New Password"
                />
              </div>
              <div class="form-group">
                <label for="Confirm Password"
                  ><i class="zmdi zmdi-account-box-o"></i
                ></label>
                <input
                  id="confirm-password"
                  v-model="confirm_password"
                  type="password"
                  name="Confirm Password"
                  placeholder="New Password"
                />
              </div>
              <button type="submit" class="form-submit bg-dark">
                Confirm New Password
              </button>
            </form>
          </div>
          <div class="checkoout-image py-3">
            <figure class="checkout-img">
              <img
                src="~/assets/img/online_payment.png"
                width="380px"
                height="380px"
                alt="checkout image"
                class="img-fluid"
              />
            </figure>
            <nuxt-link to="/login" class="signup-image-link"
              >&copy; Craftspace</nuxt-link
            >
          </div>
        </div>
      </div>
    </section>
  </header>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      confirm_password: ''
    }
  },
  methods: {
    async setPassword() {
      await this.$axios
        .post('auth/users/reset_password_confirm/', {
          uid: this.$route.params.uid,
          token: this.$route.params.token,
          new_password: this.password
        })
        .then((response) => {
          if (response.status === 201) {
            this.$router.push('/login')
            this.$toast.success(
              'Password successfully set. You can now login to your account.'
            )
          }
        })
        .catch((error) => {
          if (error.response) this.$toast.show(`${error.response.data.detail}`)
        })
    }
  },
  head() {
    return {
      title: 'Craftspace | Password Reset'
    }
  }
}
</script>

<style scoped>
body {
  min-height: 100vh;
  background-image: url('/img/estate.jpg');
  background-position: center;
  background-size: cover;
  position: relative;
}
.product-card {
  box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.6);
}
</style>
