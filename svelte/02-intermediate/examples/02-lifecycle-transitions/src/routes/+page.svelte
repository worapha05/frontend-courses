<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  type Notice = { id: number; message: string };

  let seconds = $state(0);
  let notices = $state<Notice[]>([]);
  let nextId = $state(1);

  const progress = tweened(0, { duration: 500, easing: cubicOut });

  let intervalId: ReturnType<typeof setInterval> | undefined;

  onMount(() => {
    intervalId = setInterval(() => {
      seconds += 1;
    }, 1000);

    // cleanup ของ onMount (เทียบเท่า onDestroy สำหรับ timer นี้)
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  });

  onDestroy(() => {
    // ตัวอย่าง cleanup เพิ่มเติมเมื่อถอด component
    console.log('Demo page destroyed — timers already cleared');
  });

  function pushNotice() {
    const id = nextId++;
    notices = [...notices, { id, message: `แจ้งเตือน #${id} · เวลา ${seconds}s` }];
  }

  function dismiss(id: number) {
    notices = notices.filter((n) => n.id !== id);
  }

  async function animateProgress(target: number) {
    await progress.set(target);
  }
</script>

<svelte:head>
  <title>Lifecycle & Transitions</title>
</svelte:head>

<main>
  <h1>Lifecycle & Transitions</h1>
  <p class="muted">onMount / onDestroy · fly/fade · tweened progress</p>

  <section class="panel">
    <h2>Timer จาก onMount</h2>
    <div class="timer">{seconds}s</div>
    <p class="muted">นับทุกวินาทีหลัง mount ฝั่ง client · cleanup ใน return ของ onMount</p>
  </section>

  <section class="panel">
    <h2>Progress ด้วย tweened</h2>
    <p class="muted">ค่าปัจจุบัน: {Math.round($progress)}%</p>
    <div class="progress-track">
      <div class="progress-fill" style={`width: ${$progress}%`}></div>
    </div>
    <div class="actions">
      <button type="button" onclick={() => animateProgress(25)}>25%</button>
      <button type="button" onclick={() => animateProgress(60)}>60%</button>
      <button type="button" onclick={() => animateProgress(100)}>100%</button>
      <button class="ghost" type="button" onclick={() => animateProgress(0)}>รีเซ็ต</button>
    </div>
  </section>

  <section class="panel">
    <h2>Notifications + transitions</h2>
    <button type="button" onclick={pushNotice}>เพิ่มแจ้งเตือน</button>

    <div class="notifications">
      {#each notices as notice (notice.id)}
        <div
          class="toast"
          in:fly={{ y: -12, duration: 220 }}
          out:fade={{ duration: 180 }}
          animate:flip={{ duration: 200 }}
        >
          <span>{notice.message}</span>
          <button class="ghost" type="button" onclick={() => dismiss(notice.id)}>ปิด</button>
        </div>
      {/each}
    </div>

    {#if notices.length === 0}
      <p class="muted" style="margin-top: 0.85rem">ยังไม่มีแจ้งเตือน</p>
    {/if}
  </section>
</main>
