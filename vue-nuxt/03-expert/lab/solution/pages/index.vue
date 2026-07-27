<script setup>
const auth = useAuthStore()
</script>

<template>
  <main class="mx-auto max-w-3xl px-4 py-12">
    <h1 class="text-3xl font-semibold tracking-tight">Enterprise Ops Dashboard</h1>
    <p class="mt-3 text-slate-600">
      Lab รวม Data Grid + RBAC + Nitro cached report
    </p>
    <p class="mt-2 text-sm text-slate-500">
      สถานะ:
      <span v-if="auth.user">{{ auth.user.name }} ({{ auth.user.role }})</span>
      <span v-else>ยังไม่ได้ login</span>
    </p>
    <div class="mt-6 flex gap-3">
      <NuxtLink
        to="/login"
        class="rounded-md bg-slate-900 px-4 py-2 text-sm text-white"
      >
        Login
      </NuxtLink>
      <NuxtLink
        to="/dashboard"
        class="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm"
      >
        Open Dashboard
      </NuxtLink>
    </div>
  </main>
</template>
