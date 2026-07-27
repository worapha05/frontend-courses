export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  runtimeConfig: {
    upstreamBase: 'https://jsonplaceholder.typicode.com',
    // ใน production ใส่ผ่าน NUXT_UPSTREAM_TOKEN
    upstreamToken: '',
  },
});
