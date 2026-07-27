<template>
  <div class="shell">
    <header class="top">
      <NuxtLink to="/" class="brand">Mini Shop</NuxtLink>
      <nav>
        <NuxtLink to="/">Catalog</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/cart"><CartBadge /></NuxtLink>
      </nav>
    </header>
    <NuxtPage />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', ui-sans-serif, system-ui, sans-serif;
  background: #f6f7f9;
  color: #15202b;
}
.shell {
  max-width: 52rem;
  margin: 0 auto;
  padding: 1.25rem;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.brand {
  font-weight: 700;
  text-decoration: none;
  color: inherit;
  font-size: 1.15rem;
}
nav {
  display: flex;
  gap: 1rem;
  align-items: center;
}
nav a {
  color: inherit;
  text-decoration: none;
}
nav a.router-link-active {
  font-weight: 700;
}
</style>
