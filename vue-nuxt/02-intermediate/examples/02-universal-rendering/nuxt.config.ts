export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  routeRules: {
    '/': { prerender: true },
    '/marketing': { prerender: true },
    '/news': { swr: 30 },
    '/app/**': { ssr: false },
  },
});
