<script setup>
definePageMeta({
  middleware: ['auth'],
})

const auth = useAuthStore()
const { data, pending } = await useFetch('/api/orders', { key: 'ops-orders' })
const rows = computed(() => data.value?.items ?? [])
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-8">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Orders</h1>
        <p class="text-sm text-slate-600">
          {{ auth.user?.name }} · {{ auth.user?.role }}
        </p>
      </div>
      <div class="flex gap-2">
        <NuxtLink
          to="/dashboard/admin"
          class="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
        >
          Admin Report
        </NuxtLink>
        <button
          type="button"
          class="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
          @click="auth.logout(); navigateTo('/login')"
        >
          Logout
        </button>
      </div>
    </div>

    <p v-if="pending" class="text-slate-500">Loading orders…</p>
    <OrdersGrid v-else :rows="rows" />
  </main>
</template>
