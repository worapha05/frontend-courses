<script setup>
const auth = useAuthStore()
</script>

<template>
  <main>
    <h1>RBAC Demo</h1>
    <p v-if="auth.user">
      Signed in as <strong>{{ auth.user.name }}</strong> ({{ auth.user.role }})
    </p>
    <p v-else>ยังไม่ได้ login</p>
    <ul>
      <li><NuxtLink to="/admin">/admin</NuxtLink> — roles: admin</li>
      <li><NuxtLink to="/editor">/editor</NuxtLink> — roles: admin, editor</li>
    </ul>
  </main>
</template>
