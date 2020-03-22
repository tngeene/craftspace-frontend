<template>
  <header>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=yes"
    />
    <!-- Sign in  Form -->
    <section class="sign-in">
      <div class="container">
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
            <h2 class="form-title">Sign In</h2>
            <Notification v-if="error" :message="error" />
            <form
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
              <div class="form-group">
                <input
                  id="remember-me"
                  type="checkbox"
                  name="remember-me"
                  class="agree-term"
                />
                <label for="remember-me" class="label-agree-term"
                  ><span><span></span></span>Remember me</label
                >
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
          </div>
        </div>
      </div>
    </section>
  </header>
</template>

<script>
import Notification from '~/components/Notification'

export default {
  middleware: 'guest',
  components: {
    Notification
  },

  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })

        this.$router.push('/profile')
      } catch (e) {
        this.error = e.response.data.detail
      }
    }
  },
  head() {
    return {
      title: 'Craftspace | Login'
    }
  }
}
</script>
<style>
header {
  min-height: 100vh;
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.9),
      rgba(0, 0, 0, 0.4)
    ),
    url('/gray-metal-cube.jpg');
  background-position: center center;
  background-size: cover;
  position: relative;
}
.label {
  color: #fff;
}
</style>

<style scoped>
@import '@/assets/signup/css/style.css';
@import '~/assets/signup/fonts/material-icon/css/material-design-iconic-font.min.css';
</style>
