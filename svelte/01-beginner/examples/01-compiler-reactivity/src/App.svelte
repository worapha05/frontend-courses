<script lang="ts">
  // Compiler จะสร้างโค้ดอัปเดต text node / list โดยตรง — ไม่มี VDOM diff
  let count = $state(0);
  let doubled = $derived(count * 2);

  let items = $state<string[]>(['เรียนรู้ $state', 'ลอง $derived']);
  let draft = $state('');

  function addItem() {
    const text = draft.trim();
    if (!text) return;
    items.push(text);
    draft = '';
  }

  function removeItem(index: number) {
    items.splice(index, 1);
  }
</script>

<main>
  <h1>Compiler & Fine-grained Reactivity</h1>
  <p class="lead">ตัวอย่างนี้แสดงว่า state เปลี่ยนแล้ว UI อัปเดตตรงจุดที่ผูกไว้</p>

  <section class="card">
    <h2>Counter + $derived</h2>
    <p>count = <strong>{count}</strong></p>
    <p>doubled = <strong>{doubled}</strong></p>
    <div class="row">
      <button onclick={() => count++}>+1</button>
      <button onclick={() => (count = 0)}>Reset</button>
    </div>
  </section>

  <section class="card">
    <h2>List (fine-grained updates)</h2>
    <form
      class="row"
      onsubmit={(e) => {
        e.preventDefault();
        addItem();
      }}
    >
      <input bind:value={draft} placeholder="เพิ่มรายการ…" />
      <button type="submit">Add</button>
    </form>

    <ul>
      {#each items as item, i (item + i)}
        <li>
          <span>{item}</span>
          <button class="ghost" onclick={() => removeItem(i)}>ลบ</button>
        </li>
      {/each}
    </ul>
  </section>

  <aside class="note">
    <h3>Compiler vs Virtual DOM</h3>
    <ul>
      <li><strong>VDOM</strong> — runtime สร้าง tree ใหม่ แล้ว diff ก่อน patch DOM</li>
      <li><strong>Svelte compiler</strong> — ตอน build สร้าง statements อัปเดต node ที่เกี่ยวข้องโดยตรง</li>
      <li>ผลลัพธ์: overhead ต่ำลง และ dependency ชัดตั้งแต่ compile-time</li>
    </ul>
  </aside>
</main>

<style>
  h1 {
    margin: 0 0 0.35rem;
    font-size: 1.6rem;
  }

  .lead {
    margin: 0 0 1.5rem;
    color: #475569;
  }

  .card,
  .note {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 1.1rem 1.2rem;
    margin-bottom: 1rem;
  }

  .note {
    background: #ecfdf5;
    border-color: #a7f3d0;
  }

  h2,
  h3 {
    margin: 0 0 0.75rem;
    font-size: 1.05rem;
  }

  .row {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    align-items: center;
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: 8px;
    padding: 0.45rem 0.85rem;
    background: #0d9488;
    color: #fff;
  }

  button.ghost {
    background: transparent;
    color: #b91c1c;
    padding: 0.2rem 0.4rem;
  }

  input {
    flex: 1;
    min-width: 160px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 0.45rem 0.7rem;
  }

  ul {
    margin: 0.85rem 0 0;
    padding-left: 1.1rem;
  }

  li {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    align-items: center;
    margin-bottom: 0.35rem;
  }

  .note ul {
    padding-left: 1.15rem;
    margin: 0;
  }
</style>
