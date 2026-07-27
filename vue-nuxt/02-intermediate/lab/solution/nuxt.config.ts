export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['@pinia/nuxt'],
  routeRules: {
    '/about': { prerender: true },
    '/cart': { ssr: false },
  },
});
