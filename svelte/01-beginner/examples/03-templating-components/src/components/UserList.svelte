<script lang="ts">
  import type { User } from '../lib/users';

  interface Props {
    users: User[];
  }

  let { users }: Props = $props();
</script>

<section class="panel">
  <h2>UserList — {`{#each}`} + keys</h2>
  <ul>
    {#each users as user (user.id)}
      <li>
        <strong>{user.name}</strong>
        <span class="role">{user.role}</span>
      </li>
    {:else}
      <li class="empty">ยังไม่มีผู้ใช้</li>
    {/each}
  </ul>
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

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.4rem 0;
    border-bottom: 1px solid #f1f5f9;
  }

  li:last-child {
    border-bottom: none;
  }

  .role {
    color: #64748b;
    font-size: 0.9rem;
  }

  .empty {
    color: #94a3b8;
    justify-content: center;
  }
</style>
