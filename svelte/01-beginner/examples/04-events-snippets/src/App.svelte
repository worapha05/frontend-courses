<script lang="ts">
  import ActionButton from './components/ActionButton.svelte';
  import Card from './components/Card.svelte';
  import SearchField from './components/SearchField.svelte';

  type Article = {
    id: string;
    title: string;
    summary: string;
    tag: string;
  };

  const articles: Article[] = [
    {
      id: 'a1',
      title: 'Svelte 5 Runes',
      summary: 'แนะนำ $state, $derived และ $effect',
      tag: 'reactivity'
    },
    {
      id: 'a2',
      title: 'Snippets 101',
      summary: 'ส่ง children / footer แบบ type-safe',
      tag: 'components'
    },
    {
      id: 'a3',
      title: 'Events ใน Svelte 5',
      summary: 'ใช้ onclick / oninput แทน on:click',
      tag: 'events'
    },
    {
      id: 'a4',
      title: 'Bindable props',
      summary: '$bindable สำหรับ two-way binding',
      tag: 'props'
    }
  ];

  let query = $state('');
  let selectedId = $state<string | null>(null);
  let message = $state('ยังไม่ได้เลือกบทความ');

  const filtered = $derived(
    articles.filter((a) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.tag.toLowerCase().includes(q)
      );
    })
  );

  function selectArticle(id: string, title: string) {
    selectedId = id;
    message = `เลือก: ${title}`;
  }

  function clearSearch() {
    query = '';
    selectedId = null;
    message = 'ล้างการค้นหาแล้ว';
  }
</script>

<main>
  <h1>Events & Snippets</h1>
  <p class="lead">ค้นหา → กรองการ์ด → เลือกด้วย callback prop</p>

  <div class="toolbar">
    <SearchField bind:value={query} label="ค้นหาบทความ" placeholder="เช่น runes, snippets…" />
    <ActionButton label="Clear" onclick={clearSearch} disabled={!query && !selectedId} />
  </div>

  <p class="status">{message}</p>

  <div class="grid">
    {#each filtered as article (article.id)}
      <Card title={article.title}>
        <p>{article.summary}</p>
        <p class="tag">#{article.tag}</p>

        {#snippet footer()}
          <ActionButton
            label={selectedId === article.id ? 'Selected' : 'Select'}
            disabled={selectedId === article.id}
            onclick={() => selectArticle(article.id, article.title)}
          />
        {/snippet}
      </Card>
    {:else}
      <p class="empty">ไม่พบบทความที่ตรงกับ “{query}”</p>
    {/each}
  </div>
</main>

<style>
  h1 {
    margin: 0 0 0.35rem;
    font-size: 1.55rem;
  }

  .lead {
    color: #475569;
    margin: 0 0 1.25rem;
  }

  .toolbar {
    display: grid;
    gap: 0.75rem;
    align-items: end;
    margin-bottom: 0.75rem;
  }

  @media (min-width: 520px) {
    .toolbar {
      grid-template-columns: 1fr auto;
    }
  }

  .status {
    color: #0f766e;
    font-size: 0.95rem;
    margin: 0 0 1rem;
  }

  .grid {
    display: grid;
    gap: 0.85rem;
  }

  @media (min-width: 560px) {
    .grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .tag {
    margin: 0.5rem 0 0;
    color: #64748b;
    font-size: 0.85rem;
  }

  .empty {
    grid-column: 1 / -1;
    color: #94a3b8;
    text-align: center;
    padding: 2rem 1rem;
    background: #fff;
    border: 1px dashed #cbd5e1;
    border-radius: 10px;
  }

  p {
    margin: 0;
  }
</style>
