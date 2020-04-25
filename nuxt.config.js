require('dotenv').config()

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/dotenv'
  ],
  /*
  ** Nuxt.js modules
  */
 modules: [
  [
    '@nuxtjs/firebase',
    {
      config: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      },
      services: {
        auth: {
          initialize: {
            onAuthStateChangedAction: 'onAuthStateChanged'
          },
          ssr: true
        },
        firestore: true,
      }
    }
  ]
],
  /*
  ** Build configuration
  */
 build: {
  babel: {
    presets({ isServer }) {
      return [
        [
          require.resolve('@nuxt/babel-preset-app'),
          // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
          {
            buildTarget: isServer ? 'server' : 'client',
            corejs: { version: 3 }
          }
        ]
      ]
    }
  }
}
}
