<template>
  <div class="wrap">
    <nav>
      <NuxtLink to="/">Home</NuxtLink> ·
      <NuxtLink to="/report">Cached report</NuxtLink> ·
      <NuxtLink to="/proxy">Proxy demo</NuxtLink>
    </nav>
    <NuxtPage />
  </div>
</template>

<style>
.wrap {
  font-family: ui-sans-serif, system-ui, sans-serif;
  max-width: 42rem;
  margin: 2rem auto;
  padding: 0 1rem;
}
nav {
  margin-bottom: 1.25rem;
}
</style>
