<script setup>
const auth = useAuthStore()
const route = useRoute()
const redirect = computed(() => String(route.query.redirect ?? '/'))

function go(role) {
  auth.loginAs(role)
  return navigateTo(redirect.value)
}
</script>

<template>
  <main>
    <h1>Login (demo)</h1>
    <p>เลือก role เพื่อจำลอง session</p>
    <div class="actions">
      <button type="button" @click="go('admin')">Login as admin</button>
      <button type="button" @click="go('editor')">Login as editor</button>
      <button type="button" @click="go('viewer')">Login as viewer</button>
    </div>
  </main>
</template>

<style scoped>
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}
button {
  cursor: pointer;
  padding: 0.4rem 0.75rem;
}
</style>
