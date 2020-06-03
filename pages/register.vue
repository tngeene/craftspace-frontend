<template>
  <header>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <section class="signup fadeInUp animated">
      <div class="container mt-5">
        <div class="signup-content">
          <div class="signup-form mt-2">
            <h2 class="form-title">Sign up</h2>
            <Notification v-if="error" :message="error" />
            <form
              id="register-form"
              method="post"
              class="register-form"
              @submit.prevent="register"
            >
              <div class="form-group">
                <label for="first name"
                  ><i class="zmdi zmdi-account material-icons-name"></i
                ></label>
                <input
                  id="f_name"
                  v-model="firstname"
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  required
                />
              </div>
              <div class="form-group">
                <label for="name"
                  ><i class="zmdi zmdi-account material-icons-name"></i
                ></label>
                <input
                  id="l_name"
                  v-model="lastname"
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div class="form-group">
                <label for="email"><i class="zmdi zmdi-email"></i></label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="phone_number"
                  ><i class="zmdi zmdi-account-box-phone"></i
                ></label>
                <input
                  id="phone_number"
                  v-model="phone_number"
                  type="text"
                  name="phone_number"
                  placeholder="Phone Number"
                />
              </div>
              <div class="form-group">
                <label for="membership_type"
                  ><i class="zmdi zmdi-account-o"></i
                ></label>
                <b-form-select
                  id="membership_type"
                  v-model="membership_type"
                  :options="options"
                  type="select"
                  name="membership_type"
                  placeholder="Account type"
                />
              </div>
              <div class="form-group">
                <label for="password"><i class="zmdi zmdi-lock"></i></label>
                <input
                  id="pass"
                  v-model="password"
                  type="password"
                  name="pass"
                  placeholder="Password"
                />
              </div>
              <!-- <div class="form-group">
                <label for="re-pass"
                  ><i class="zmdi zmdi-lock-outline"></i
                ></label>
                <input
                  id="re_pass"
                  type="password"
                  name="re_pass"
                  placeholder="Repeat your password"
                />
              </div>
              <div class="form-group">
                <input
                  id="agree-term"
                  type="checkbox"
                  name="agree-term"
                  class="agree-term"
                />
                <label for="agree-term" class="label-agree-term"
                  ><span><span></span></span>I agree all statements in
                  <a href="#" class="term-service">Terms of service</a></label
                >
              </div> -->
              <div class="form-group form-button">
                <input
                  id="signup"
                  type="submit"
                  name="signup"
                  class="form-submit bg-dark"
                  value="Register"
                />
              </div>
            </form>
          </div>
          <div class="signup-image">
            <figure>
              <img
                src="~/assets/signup/images/signup-image.jpg"
                alt="sign up image"
              />
            </figure>
            <nuxt-link to="/login" class="signup-image-link"
              >I am already member</nuxt-link
            >
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
      firstname: '',
      lastname: '',
      phone_number: '',
      membership_type: null,
      options: [
        { value: 'Artist', text: 'Artist' },
        { value: 'Collector', text: 'Collector' }
      ],
      password: '',
      error: null
    }
  },
  // methods for handling user registration, makes an api call to django register api
  methods: {
    async register() {
      try {
        this.$toast.show('Registering...')
        await this.$axios.post('auth/users/', {
          email: this.email,
          first_name: this.firstname,
          last_name: this.lastname,
          phone_number: this.phone_number,
          membership_type: this.membership_type,
          password: this.password
        })
        this.$toast.success('Registration Successful! Proceed with Login.')
        this.$router.push('/login')
      } catch (e) {
        this.error = e.response.data.detail
        this.$toast.global.my_error() // Using custom toast
        this.$toast.error('Error while Registering :(')
      }
    }
  },
  head() {
    return {
      title: 'Craftspace | register'
    }
  }
}
</script>

<style scoped>
header {
  min-height: 100vh;
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.9),
      rgba(0, 0, 0, 0.4)
    ),
    url('/img/masai.jpg');
  background-position: center center;
  background-size: cover;
  position: relative;
  overflow: hidden;
}
.label {
  color: #fff;
}
</style>
<style scoped>
@import '@/assets/signup/css/style.css';
@import '~/assets/signup/fonts/material-icon/css/material-design-iconic-font.min.css';
</style>
