<script setup>
useSeoMeta({ title: 'Hybrid Rendering Demo' })
</script>

<template>
  <main>
    <h1>Hybrid Rendering</h1>
    <p>
      หน้านี้ตั้ง <code>prerender: true</code> ใน <code>routeRules</code> —
      สร้าง HTML ตอน build
    </p>
    <ul>
      <li><code>/</code>, <code>/marketing</code> → SSG</li>
      <li><code>/news</code> → SWR 30s</li>
      <li><code>/app/**</code> → CSR (<code>ssr: false</code>)</li>
    </ul>
  </main>
</template>
