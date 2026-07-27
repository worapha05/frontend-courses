<template>
  <div class="wrap">
    <header>
      <NuxtLink to="/">Home</NuxtLink> ·
      <NuxtLink to="/admin">Admin</NuxtLink> ·
      <NuxtLink to="/editor">Editor</NuxtLink> ·
      <NuxtLink to="/login">Login</NuxtLink>
    </header>
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
header {
  margin-bottom: 1.25rem;
}
</style>
