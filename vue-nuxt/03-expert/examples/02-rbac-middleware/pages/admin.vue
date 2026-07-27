<script setup>
definePageMeta({
  middleware: ['auth', 'rbac'],
  roles: ['admin'],
})

const auth = useAuthStore()
const { data, error, refresh } = await useFetch('/api/admin/stats', {
  key: 'admin-stats',
  headers: computed(() => ({
    'x-demo-role': auth.user?.role ?? '',
  })),
})
</script>

<template>
  <main>
    <h1>Admin Panel</h1>
    <p>Hello {{ auth.user?.name }}</p>
    <pre v-if="data">{{ data }}</pre>
    <p v-if="error" class="err">API: {{ error.statusCode }} {{ error.statusMessage }}</p>
    <button type="button" @click="refresh()">Refresh API</button>
    <button type="button" @click="auth.logout()">Logout</button>
  </main>
</template>

<style scoped>
.err {
  color: #b00020;
}
button {
  margin-right: 0.5rem;
  cursor: pointer;
}
</style>
