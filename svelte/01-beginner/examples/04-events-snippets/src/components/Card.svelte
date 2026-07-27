<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title: string;
    children: Snippet;
    footer?: Snippet;
  }

  let { title, children, footer }: Props = $props();
</script>

<article class="card">
  <header>
    <h3>{title}</h3>
  </header>
  <div class="body">
    {@render children()}
  </div>
  {#if footer}
    <footer>
      {@render footer()}
    </footer>
  {/if}
</article>

<style>
  .card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  header {
    padding: 0.75rem 1rem;
    background: #f0fdfa;
    border-bottom: 1px solid #ccfbf1;
  }

  h3 {
    margin: 0;
    font-size: 1rem;
  }

  .body {
    padding: 0.9rem 1rem;
    flex: 1;
  }

  footer {
    padding: 0.65rem 1rem;
    border-top: 1px solid #e2e8f0;
    background: #f8fafc;
  }
</style>
