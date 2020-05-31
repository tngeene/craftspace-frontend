<template>
  <main>
    <section class="section">
      <div class="container">
        <nuxt-link to="/art" class="back-to-shopping text-weight-bold">
          &#8592; Back to Collection</nuxt-link
        >
        <div class="box">
          <h1 class="title text-center">
            Your Cart
          </h1>
          <hr />
          <div v-for="product in cart" :key="product.id" class="box">
            <article class="media cart-item">
              <div class="float-left">
                <figure class="image cart-image">
                  <img :src="product.picture" class="w-25 h-25" alt="" />
                </figure>
              </div>
              <div class="media-content">
                <div class="content">
                  <h2 class="text-bold text-center">
                    {{ product.name }}
                  </h2>
                  <p class="is-size-5 float-right">
                    ksh {{ product.price }} x {{ product.quantities }}
                  </p>
                  <button
                    class="btn btn-sm btn-outline-danger float-right"
                    @click="removeItem(product)"
                  >
                    Remove Item
                  </button>
                </div>
              </div>
              <div class="float-right">
                <div class="content">
                  <h2 class="text-weight-bold">
                    ksh {{ product.price * product.quantities }}
                  </h2>
                </div>
              </div>
            </article>
          </div>
          <hr v-if="cartTotal" />
          <h1 v-if="cartTotal" class="title text-center">
            Total : ksh {{ totalCost }}
          </h1>
          <nuxt-link
            v-if="cartTotal"
            to="/checkout"
            class="btn btn-outline-success btn-md ml-auto mr-auto"
            >Checkout</nuxt-link
          >
          <div v-if="!cartTotal" class="box text-center">
            <article class="emptyCart">
              <h1 class="title">Cart is empty</h1>
            </article>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
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
  }
}
</script>
