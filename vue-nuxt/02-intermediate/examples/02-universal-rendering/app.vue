<template>
  <div class="wrap">
    <nav>
      <NuxtLink to="/">Home (SSG)</NuxtLink> ·
      <NuxtLink to="/marketing">Marketing (SSG)</NuxtLink> ·
      <NuxtLink to="/news">News (SWR)</NuxtLink> ·
      <NuxtLink to="/app/dashboard">Dashboard (CSR)</NuxtLink>
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
  line-height: 1.8;
}
</style>
