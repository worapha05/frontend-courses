<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<div class="shell">
  <header class="nav">
    <a class="brand" href="/">Task Manager · Form Actions</a>
  </header>
  {@render children()}
</div>
