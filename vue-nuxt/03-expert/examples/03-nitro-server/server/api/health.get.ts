export default defineEventHandler(() => {
  return {
    ok: true,
    service: 'vue-nuxt-bootcamp-nitro',
    at: new Date().toISOString(),
  };
});
