<template>
  <div class="wrap">
    <nav>
      <NuxtLink to="/">Catalog</NuxtLink> ·
      <NuxtLink to="/cart">Cart</NuxtLink>
    </nav>
    <NuxtPage />
  </div>
</template>

<style>
.wrap {
  font-family: ui-sans-serif, system-ui, sans-serif;
  max-width: 40rem;
  margin: 2rem auto;
  padding: 0 1rem;
}
</style>
