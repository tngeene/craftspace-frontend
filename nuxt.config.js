const env = require('dotenv').config()
export default {
  mode: 'universal',
  target: 'server',
  env: env.parsed,
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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'img/icon.png' },
      {
        rel: 'stylesheet',
        href: 'css/font-awesome.min.css'
      },
      {
        rel: 'stylesheet',
        href:
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
      }
    ],
    script: [
      { src: 'https://use.fontawesome.com/releases/v5.0.8/js/all.js' },
      {
        src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'
      },
      {
        src:
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js'
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js'
      },
      {
        src:
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: `#243B55`,
    continuous: true,
    duration: 5000
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/main.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    `~/plugins/vue-typed`,
    `~/plugins/vue-star-ratings`,
    `~/plugins/vue-moment`,
    { src: '~/plugins/vuex-persistedstate', ssr: false }
  ],
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
    '@neneos/nuxt-animate.css',
    '@nuxtjs/dotenv'
  ],
  // toast settings
  toast: {
    position: 'top-right',
    duration: 4000,
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
        text: 'Close',
        onClick: (e, toastObject) => {
          toastObject.goAway(0)
        }
      }
    ]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.baseAPIUrl
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'auth/token/login/',
            method: 'post',
            propertyName: 'auth_token'
          },
          user: {
            url: 'auth/users/me/',
            method: 'get',
            propertyName: false
          },
          logout: {
            url: 'auth/token/logout/',
            method: 'post'
          }
        },
        tokenType: 'Token',
        tokenRequired: true
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
