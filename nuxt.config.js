export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    // '@/assets/main/css//bootstrap.min.css',
    // '@/assets/main/css/slick-theme.css',
    // '@/assets/main/css/slick.css',
    // '@/assets/main/css/nouislider.min.css',
    '@/assets/main/css/style.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [`~/plugins/vue-typed`],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
    '@neneos/nuxt-animate.css'
  ],
  // toast settings
  toast: {
    position: 'top-center',
    duration: 10000,
    register: [
      // Register custom toasts
      {
        name: 'my_error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ],
    action: [
      {
        text: 'Cancel',
        onClick: (e, toastObject) => {
          toastObject.goAway(0)
        }
      },
      {
        text: 'Undo',
        // router navigation
        push: {
          name: 'somewhere',
          // this will prevent toast from closing
          dontClose: true
        }
      }
    ]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://127.0.0.1:8000/api/v1/'
  },
  auth: {
    localStorage: false,
    cookie: {
      options: {
        expires: 7 // sets the user to be locked out after 7 days of inactivity
      }
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'auth/jwt/create/',
            method: 'post',
            propertyName: 'access'
          },
          user: { url: 'auth/users/me/', method: 'get', propertyName: false },
          logout: false,
          tokenType: 'Token',
          tokenRequired: true
        }
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
