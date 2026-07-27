<script lang="ts">
  import type { User, UserStatus } from '../lib/users';

  interface Props {
    users: User[];
  }

  let { users }: Props = $props();

  const counts = $derived({
    online: users.filter((u) => u.status === 'online').length,
    away: users.filter((u) => u.status === 'away').length,
    offline: users.filter((u) => u.status === 'offline').length
  });

  let focus = $state<UserStatus>('online');
</script>

<section class="panel">
  <h2>StatusPanel — {`{#if}`}</h2>

  <div class="tabs">
    <button class:active={focus === 'online'} onclick={() => (focus = 'online')}>
      Online ({counts.online})
    </button>
    <button class:active={focus === 'away'} onclick={() => (focus = 'away')}>
      Away ({counts.away})
    </button>
    <button class:active={focus === 'offline'} onclick={() => (focus = 'offline')}>
      Offline ({counts.offline})
    </button>
  </div>

  {#if focus === 'online'}
    <p class="ok">พร้อมทำงาน — {counts.online} คน</p>
  {:else if focus === 'away'}
    <p class="warn">ไม่อยู่หน้าจอ — {counts.away} คน</p>
  {:else}
    <p class="muted">ออฟไลน์ — {counts.offline} คน</p>
  {/if}
</section>

<style>
  .panel {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 1rem 1.15rem;
  }

  h2 {
    margin: 0 0 0.75rem;
    font-size: 1.05rem;
  }

  .tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.75rem;
  }

  button {
    cursor: pointer;
    border: 1px solid #cbd5e1;
    background: #f8fafc;
    border-radius: 999px;
    padding: 0.35rem 0.75rem;
    color: #334155;
  }

  button.active {
    background: #0f766e;
    border-color: #0f766e;
    color: #fff;
  }

  .ok {
    color: #047857;
    margin: 0;
  }

  .warn {
    color: #b45309;
    margin: 0;
  }

  .muted {
    color: #64748b;
    margin: 0;
  }
</style>
