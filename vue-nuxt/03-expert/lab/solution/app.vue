<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <NuxtLink to="/" class="font-semibold tracking-tight">Ops Dashboard</NuxtLink>
        <nav class="flex gap-4 text-sm">
          <NuxtLink to="/dashboard">Orders</NuxtLink>
          <NuxtLink to="/dashboard/admin">Admin Report</NuxtLink>
          <NuxtLink to="/login">Login</NuxtLink>
        </nav>
      </div>
    </header>
    <NuxtPage />
  </div>
</template>
