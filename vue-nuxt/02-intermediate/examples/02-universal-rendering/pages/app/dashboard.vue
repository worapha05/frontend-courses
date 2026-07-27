<script setup>
const mountedAt = ref('')

onMounted(() => {
  mountedAt.value = new Date().toLocaleTimeString()
})
</script>

<template>
  <main>
    <h1>Dashboard (CSR)</h1>
    <p>
      Route นี้อยู่ใต้ <code>/app/**</code> → <code>ssr: false</code>
      render เฉพาะฝั่ง client
    </p>
    <p v-if="mountedAt">Client mounted at {{ mountedAt }}</p>
  </main>
</template>
