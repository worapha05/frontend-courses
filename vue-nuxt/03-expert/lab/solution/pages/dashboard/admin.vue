<script setup>
definePageMeta({
  middleware: ['auth', 'rbac'],
  roles: ['admin'],
})

const auth = useAuthStore()
const days = ref(7)

const { data, error, pending, refresh } = await useFetch('/api/admin/report', {
  key: 'admin-report',
  query: { days },
  watch: [days],
  headers: computed(() => ({
    'x-demo-role': auth.user?.role ?? '',
  })),
})
</script>

<template>
  <main class="mx-auto max-w-3xl px-4 py-8">
    <h1 class="text-2xl font-semibold tracking-tight">Admin Report</h1>
    <p class="mt-1 text-sm text-slate-600">
      Cached Nitro handler · admin only (page + API)
    </p>

    <label class="mt-4 inline-flex items-center gap-2 text-sm">
      Range (days)
      <input
        v-model.number="days"
        type="number"
        min="1"
        max="90"
        class="w-20 rounded-md border border-slate-300 px-2 py-1"
      />
    </label>
    <button
      type="button"
      class="ml-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm"
      @click="refresh()"
    >
      Refresh
    </button>

    <p v-if="pending" class="mt-4 text-slate-500">Loading…</p>
    <p v-else-if="error" class="mt-4 text-red-700">
      {{ error.statusCode }} — {{ error.statusMessage || error.message }}
    </p>
    <pre
      v-else
      class="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white p-4 text-sm"
    >{{ data }}</pre>

    <NuxtLink to="/dashboard" class="mt-6 inline-block text-sm underline">
      ← Back to orders
    </NuxtLink>
  </main>
</template>
