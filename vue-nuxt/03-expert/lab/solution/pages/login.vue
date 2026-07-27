<script setup>
const auth = useAuthStore()

function go(role) {
  auth.loginAs(role)
  return navigateTo('/dashboard')
}
</script>

<template>
  <main class="mx-auto max-w-lg px-4 py-12">
    <h1 class="text-2xl font-semibold">Login</h1>
    <p class="mt-2 text-slate-600">เลือก role สำหรับ lab (จำลอง session ใน Pinia)</p>
    <div class="mt-6 flex flex-wrap gap-3">
      <button
        type="button"
        class="rounded-md bg-slate-900 px-4 py-2 text-sm text-white"
        @click="go('admin')"
      >
        Login as admin
      </button>
      <button
        type="button"
        class="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm"
        @click="go('viewer')"
      >
        Login as viewer
      </button>
    </div>
  </main>
</template>
