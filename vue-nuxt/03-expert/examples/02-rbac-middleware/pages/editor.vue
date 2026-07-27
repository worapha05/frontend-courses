<script setup>
definePageMeta({
  middleware: ['auth', 'rbac'],
  roles: ['admin', 'editor'],
})

const auth = useAuthStore()
</script>

<template>
  <main>
    <h1>Editor Workspace</h1>
    <p>Accessible by admin + editor · current: {{ auth.user?.role }}</p>
  </main>
</template>
