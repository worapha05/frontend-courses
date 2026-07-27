export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  routeRules: {
    '/dashboard/**': { ssr: false },
  },
});
