<script lang="ts">
  import { enhance } from '$app/forms';

  let { data, form } = $props();
</script>

<svelte:head>
  <title>Task Manager — Form Actions</title>
</svelte:head>

<main>
  <h1>รายการงาน</h1>
  <p class="muted">named actions + <code>fail()</code> + <code>use:enhance</code></p>

  <div class="card" style="margin-top: 1rem">
    {#if form?.success}
      <div class="success">บันทึกสำเร็จ ({form.action})</div>
    {/if}

    <form class="create" method="POST" action="?/create" use:enhance>
      <input
        type="text"
        name="title"
        placeholder="ชื่องานใหม่…"
        value={form?.title ?? ''}
        aria-invalid={form?.missing || form?.tooShort ? 'true' : undefined}
      />
      <button type="submit">สร้าง</button>
    </form>

    {#if form?.missing}
      <p class="error">กรุณากรอกชื่องาน</p>
    {/if}
    {#if form?.tooShort}
      <p class="error">ชื่องานต้องมีอย่างน้อย 3 ตัวอักษร</p>
    {/if}
  </div>

  <div class="card" style="margin-top: 1rem">
    {#if data.tasks.length === 0}
      <p class="muted">ยังไม่มีงาน</p>
    {:else}
      {#each data.tasks as task (task.id)}
        <div class={`task${task.done ? ' done' : ''}`}>
          <span class="title">{task.title}</span>
          <div class="actions">
            <form method="POST" action="?/toggle" use:enhance>
              <input type="hidden" name="id" value={task.id} />
              <button class="ghost" type="submit">
                {task.done ? 'ยังไม่เสร็จ' : 'เสร็จแล้ว'}
              </button>
            </form>
            <form method="POST" action="?/delete" use:enhance>
              <input type="hidden" name="id" value={task.id} />
              <button class="danger" type="submit">ลบ</button>
            </form>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</main>
