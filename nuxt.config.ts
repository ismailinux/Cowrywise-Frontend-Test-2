
export default defineNuxtConfig({
  // plugins: ['~/plugins/vue-touch.client.js'],
  plugins: [
    '~/plugins/vue-touch.client.js'
  ],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  runtimeConfig: {
    public: {
      unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY
    }
  },
})

