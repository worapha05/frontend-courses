<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>หนังสือ — Bookshop</title>
</svelte:head>

<main>
  <h1>หนังสือทั้งหมด</h1>
  <p class="muted">โหลดจาก mock DB ฝั่ง server (`$lib/server/books.ts`)</p>

  <div class="grid books">
    {#each data.books as book (book.id)}
      <a class="card book-card" href={`/books/${book.id}`}>
        <span class="category">{book.category}</span>
        <strong>{book.title}</strong>
        <span class="muted">{book.author}</span>
        <span class="price">฿{book.price.toLocaleString('th-TH')}</span>
      </a>
    {/each}
  </div>
</main>
