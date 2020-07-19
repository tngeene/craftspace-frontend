<template>
  <header>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <section class="signup fadeInUp animated">
      <div class="container mt-5">
        <div class="signup-content">
          <div class="signup-form my-auto">
            <h2 class="form-title">Checkout</h2>
            <form
              id="checkout-form"
              method="post"
              class="checkout-form"
              @submit.prevent="checkout"
            >
              <div v-if="!isAuthenticated" class="guest-form">
                <div class="form-group">
                  <label for="first name"
                    ><i class="zmdi zmdi-account material-icons-name"></i
                  ></label>
                  <input
                    id="f_name"
                    v-model="guest.firstname"
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
                    v-model="guest.last_name"
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
                    v-model="guest.email"
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
                    v-model="guest.phone_number"
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                  />
                </div>
              </div>

              <div v-if="isAuthenticated" class="form-group">
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
              <button type="submit" class="form-submit bg-dark">
                confirm payment of {{ totalCost }}
              </button>
              <div v-if="!isAuthenticated" class="checkout-sign-in mt-2 d-flex">
                <p>Already a member?</p>
                <nuxt-link to="/login" class="signup-image-link"
                  >Login to checkout</nuxt-link
                >
              </div>
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
            <div class="payment-methods">
              <figure class="payment-methods">
                <h6>Accepted payment methods</h6>
                <img src="~/assets/img/mpesa.png" alt="mpesa" class="w-25" />
              </figure>
            </div>
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
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      guest: {
        firstname: '',
        lastname: '',
        phone_number: '',
        email: ''
      },
      order_items: [],
      order_total: [],
      phone_number: '',
      isHidden: true
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    cart() {
      return this.$store.getters['cart/cart']
    },
    cartTotal() {
      return this.$store.getters['cart/cartTotal']
    },
    totalCost() {
      return Object.values(this.cart)
        .reduce((sum, el) => sum + el.quantities * el.price, 0)
        .toFixed(2)
    }
  },
  // methods for posting checkout info to db
  methods: {
    async checkout() {
      try {
        const orderItems = []
        const cart = JSON.parse(JSON.stringify(this.cart))
        // eslint-disable-next-line prefer-const
        for (let productId in cart) {
          const product = cart[productId]
          orderItems.push({
            product: { id: product.id, quantities: product.quantities }
          })
        }
        await this.$axios.post('orders/add', {
          first_name: this.guest.firstname,
          last_name: this.guest.lastname,
          email: this.guest.email,
          order_items: orderItems,
          order_total: parseInt(this.totalCost),
          phone_number: this.phone_number || this.guest.phone_number
        })
        this.$store.commit('cart/clearCart')
        this.$toast.success('Order Succesfully Placed')
        this.$router.push('/home')
      } catch (e) {
        // this.error = e.response.data.detail
        this.$toast.global.my_error() // Using custom toast
        this.$toast.error('Could not place order :(')
      }
    }
  },
  head() {
    return {
      title: 'Craftspace | Checkout'
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
