<script lang="ts">
  import StatusPanel from './components/StatusPanel.svelte';
  import UserList from './components/UserList.svelte';
  import UserPromise from './components/UserPromise.svelte';
  import { users } from './lib/users';

  let selectedId = $state(users[0]?.id ?? 'u1');
  let showEmpty = $state(false);

  const list = $derived(showEmpty ? [] : users);
</script>

<main>
  <h1>Templating & Components</h1>
  <p class="lead">ประกอบ {`{#each}`} / {`{#if}`} / {`{#await}`} ในคอมโพเนนต์ย่อย</p>

  <label class="toggle">
    <input type="checkbox" bind:checked={showEmpty} />
    จำลองรายการว่าง (ทดสอบ {`{:else}`})
  </label>

  <div class="grid">
    <UserList users={list} />
    <StatusPanel users={users} />
  </div>

  <section class="picker card">
    <h2>เลือก user สำหรับ await</h2>
    <div class="row">
      {#each users as user (user.id)}
        <button class:active={selectedId === user.id} onclick={() => (selectedId = user.id)}>
          {user.name}
        </button>
      {/each}
      <button class:active={selectedId === 'missing'} onclick={() => (selectedId = 'missing')}>
        Missing (error)
      </button>
    </div>
  </section>

  <UserPromise userId={selectedId} />
</main>

<style>
  h1 {
    margin: 0 0 0.35rem;
    font-size: 1.55rem;
  }

  .lead {
    color: #475569;
    margin: 0 0 1rem;
  }

  .toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    margin-bottom: 1rem;
    color: #334155;
  }

  .grid {
    display: grid;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  @media (min-width: 640px) {
    .grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 1rem 1.15rem;
    margin-bottom: 1rem;
  }

  h2 {
    margin: 0 0 0.65rem;
    font-size: 1.05rem;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  button {
    cursor: pointer;
    border: 1px solid #cbd5e1;
    background: #f8fafc;
    border-radius: 8px;
    padding: 0.35rem 0.7rem;
  }

  button.active {
    background: #0f766e;
    border-color: #0f766e;
    color: #fff;
  }
</style>
