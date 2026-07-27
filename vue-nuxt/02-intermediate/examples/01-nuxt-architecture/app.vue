<template>
  <div class="app">
    <header>
      <NuxtLink to="/">Home</NuxtLink>
      ·
      <NuxtLink to="/about">About</NuxtLink>
    </header>
    <NuxtPage />
  </div>
</template>

<style>
.app {
  font-family: ui-sans-serif, system-ui, sans-serif;
  max-width: 40rem;
  margin: 2rem auto;
  padding: 0 1rem;
}
header {
  margin-bottom: 1.5rem;
}
a {
  color: inherit;
}
</style>
