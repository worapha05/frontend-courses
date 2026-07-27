import './style.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <header class="flex items-center justify-between gap-4 border-b border-stone-200 px-6 py-4 dark:border-brand-800">
    <p class="font-display text-xl font-bold">Windlab</p>
    <button
      id="theme"
      type="button"
      class="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
    >
      สลับ Dark Mode
    </button>
  </header>

  <main class="mx-auto grid max-w-3xl gap-6 px-6 py-10">
    <section class="panel">
      <h1 class="font-display text-3xl font-bold xs:text-4xl">
        Custom theme จาก tailwind.config.js
      </h1>
      <p class="mt-3 text-stone-600 dark:text-brand-100">
        สี <code class="rounded bg-stone-100 px-1 dark:bg-brand-950">brand.*</code>,
        breakpoint <code class="rounded bg-stone-100 px-1 dark:bg-brand-950">xs</code>,
        และ dark mode แบบ <code class="rounded bg-stone-100 px-1 dark:bg-brand-950">class</code>
      </p>
      <div class="mt-6 h-24 w-full max-w-md rounded-xl bg-[conic-gradient(at_top_left,_#99f6e4,_#0d9488,_#115e59)]">
        <!-- arbitrary value สำหรับ gradient one-off -->
      </div>
    </section>
  </main>
`;

document.getElementById('theme').addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
});
