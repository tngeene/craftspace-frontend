<template>
  <header class="cart-body">
    <div class="row d-flex justify-content-center my-4">
      <div class="card custom-card">
        <div class="row">
          <div class="col mt-2">
            <nuxt-link to="/art" class="back-to-shopping text-weight-bold">
              &#8592; Back to Collection</nuxt-link
            >
            <div class="container row">
              <div class="col-12 cart-title">
                <h3 class="font-weight-lighter">Your Cart</h3>
              </div>

              <div
                v-for="product in cart"
                :key="product.id"
                class="row col-12 align-items-md-center"
              >
                <div class="col-4">
                  <img
                    :src="product.picture"
                    height="400px"
                    width="250px"
                    class="mb-2 p-2"
                    alt=""
                  />
                </div>
                <div class="col-6 text-center">
                  <h4>{{ product.name }}</h4>
                  <small>{{ product.price }} x {{ product.quantities }}</small>
                  <p>{{ product.category }}</p>
                  <p>By {{ product.uploaded_by }}</p>
                </div>
                <div class="col-2">
                  <h6 class="text-weight-bold">
                    ksh {{ product.price * product.quantities }}
                  </h6>
                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="removeItem(product)"
                  >
                    Remove Item
                  </button>
                </div>
              </div>
              <div class="col-9 text-center mx-auto mb-2">
                <hr v-if="cartTotal" />
                <h2 v-if="cartTotal" class="title font-weight-lighter">
                  Total : ksh {{ totalCost }}
                </h2>
                <nuxt-link
                  v-if="cartTotal"
                  to="/checkout"
                  class="btn btn-outline-success btn-md"
                  >Checkout</nuxt-link
                >
                <div v-if="!cartTotal" class="box text-center">
                  <article class="emptyCart">
                    <h2 class="title font-weight-lighter">Cart is empty 😟</h2>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// import CartDetails from '~/components/CartDetails'
export default {
  // components: { CartDetails },
  data() {
    return {
      success: false
    }
  },
  computed: {
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
  methods: {
    removeItem(item) {
      this.$store.commit('cart/removeItem', item)
      this.$toast.success('Item Removed from Cart')
    }
  },
  head() {
    return {
      title: 'Craftspace | Cart'
    }
  }
}
</script>
