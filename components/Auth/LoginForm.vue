<template>
  <section class="sign-in fadeInUp animated">
    <div class="container mt-5">
      <div class="signin-content">
        <div class="signin-image">
          <figure>
            <img
              src="~/assets/signup/images/signin-image.jpg"
              alt="sign in image"
            />
          </figure>
          <nuxt-link to="/register" class="signup-image-link"
            >Create an account</nuxt-link
          >
        </div>

        <div class="signin-form">
          <h2 v-if="!isVisible" class="form-title">Sign In</h2>
          <h2 v-else class="form-title">Reset Password</h2>
          <form
            v-if="!isVisible"
            id="login-form"
            method="post"
            class="register-form"
            @submit.prevent="login"
          >
            <div class="form-group">
              <label for="your_name"
                ><i class="zmdi zmdi-account material-icons-name"></i
              ></label>
              <input
                id="email"
                v-model="email"
                type="text"
                name="email"
                placeholder="Email"
              />
            </div>
            <div class="form-group">
              <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
              <input
                id="your_pass"
                v-model="password"
                type="password"
                name="your_pass"
                placeholder="Password"
              />
            </div>
            <div class="small mt-2">
              <p>
                Forgot Password?
                <small
                  style="color: #faaf40; cursor: pointer;"
                  @click="isVisible = !isVisible"
                  >Click Here to reset</small
                >
              </p>

              <br />
            </div>
            <div class="form-group form-button">
              <input
                id="signin"
                type="submit"
                name="signin"
                class="form-submit bg-dark"
                value="Log in"
              />
            </div>
          </form>

          <form
            v-if="isVisible"
            id="password-reset-form"
            method="post"
            class="register-form"
            @submit.prevent="SendPasswordResetEmail"
          >
            <div class="form-group">
              <label for="your_name"
                ><i class="zmdi zmdi-account material-icons-name"></i
              ></label>
              <input
                id="pass-reset-email"
                v-model="password_reset_email"
                type="text"
                name="email"
                placeholder="Email"
              />
            </div>

            <div class="form-group form-button">
              <input
                id="send-recovery-email"
                type="submit"
                name="signin"
                class="form-submit bg-dark"
                :value="submit"
              />
            </div>
            <div class="small mt-2">
              <p
                style="color: #faaf40; cursor: pointer;"
                @click="isVisible = !isVisible"
              >
                Cancel
              </p>

              <br />
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'guest',
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      password_reset_email: '',
      isVisible: false,
      submit: 'Send Password Reset Link'
    }
  },

  methods: {
    async login() {
      try {
        this.$toast.show('Logging in...')
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        this.$toast.success('Successfully authenticated')
        this.$router.push('/profile')
      } catch (e) {
        this.$toast.error('Unable to login with provided credentials')
      }
    },
    async SendPasswordResetEmail() {
      this.submit = 'Sending Recovery Link'
      await this.$axios
        .post('auth/users/reset_password/', {
          email: this.password_reset_email
        })
        .then((response) => {
          if (response.status === 204) {
            this.$toast.success(
              'A password recovery email has been sent to your email'
            )
            window.location.reload(true)
          }
        })
        .catch((error) => {
          if (error.response) {
            this.$toast.show(`${error.response.data.detail}`)
          }
        })
    }
  }
}
</script>

<style scoped>
@import '@/assets/signup/css/style.css';
@import '~/assets/signup/fonts/material-icon/css/material-design-iconic-font.min.css';
</style>
