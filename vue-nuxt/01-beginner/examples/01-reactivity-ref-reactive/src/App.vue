<script setup>
import { ref, reactive, toRefs, isRef, isReactive } from 'vue'

// --- ref: เหมาะกับ primitive และค่าที่ reassign ทั้งก้อน ---
const count = ref(0)
const label = ref('clicks')

function bump() {
  count.value += 1
}

// --- reactive: Proxy ของ object ---
const profile = reactive({
  name: 'Ann',
  stats: { score: 10 },
})

function bumpScore() {
  profile.stats.score += 5
}

// ❌ destructure ธรรมดาทำลาย reactivity
let brokenScore = profile.stats.score

// ✅ toRefs คง reactivity ไว้
const { name } = toRefs(profile)

function rename() {
  name.value = name.value === 'Ann' ? 'Bee' : 'Ann'
}

// แสดงชนิดเพื่อตรวจใน UI
const diagnostics = {
  countIsRef: isRef(count),
  profileIsReactive: isReactive(profile),
}
</script>

<template>
  <main class="page">
    <h1>Vue 3 Reactivity — <code>ref</code> vs <code>reactive</code></h1>

    <section>
      <h2>ref</h2>
      <p>{{ label }}: <strong>{{ count }}</strong></p>
      <button type="button" @click="bump">+1</button>
      <p class="hint">ใน template ไม่ต้องใช้ <code>.value</code></p>
    </section>

    <section>
      <h2>reactive</h2>
      <p>{{ profile.name }} — score: <strong>{{ profile.stats.score }}</strong></p>
      <button type="button" @click="bumpScore">score +5</button>
      <button type="button" @click="rename">rename via toRefs</button>
    </section>

    <section>
      <h2>กับดัก destructure</h2>
      <p>
        brokenScore (snapshot): <strong>{{ brokenScore }}</strong>
        — ไม่ตาม score จริง
      </p>
      <p>
        name จาก toRefs: <strong>{{ name }}</strong>
      </p>
    </section>

    <pre>{{ diagnostics }}</pre>
  </main>
</template>

<style>
.page {
  font-family: ui-sans-serif, system-ui, sans-serif;
  max-width: 40rem;
  margin: 2rem auto;
  padding: 0 1rem;
  line-height: 1.5;
}
section {
  border-top: 1px solid #ddd;
  padding: 1rem 0;
}
button {
  margin-right: 0.5rem;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
}
.hint {
  color: #555;
  font-size: 0.9rem;
}
code {
  background: #f3f3f3;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
}
</style>
