<script lang="ts">
  import { fetchUser } from '../lib/users';

  interface Props {
    userId: string;
  }

  let { userId }: Props = $props();

  // สร้าง promise ใหม่เมื่อ userId เปลี่ยน
  const promise = $derived(fetchUser(userId));
</script>

<section class="panel">
  <h2>UserPromise — {`{#await}`}</h2>

  {#await promise}
    <p class="loading">กำลังโหลด user…</p>
  {:then user}
    <article>
      <strong>{user.name}</strong>
      <p>{user.role} · {user.status}</p>
    </article>
  {:catch error}
    <p class="error">{error instanceof Error ? error.message : 'เกิดข้อผิดพลาด'}</p>
  {/await}
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

  article p {
    margin: 0.25rem 0 0;
    color: #64748b;
  }

  .loading {
    color: #0f766e;
    margin: 0;
  }

  .error {
    color: #b91c1c;
    margin: 0;
  }
</style>
