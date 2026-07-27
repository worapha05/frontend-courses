type Stat = { label: string; value: string };

export function DashboardGrid({ stats }: { stats: Stat[] }) {

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => (
        <article
          key={s.label}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{s.label}</p>
          <p className="mt-2 text-2xl font-bold text-teal-800">{s.value}</p>
        </article>
      ))}
    </section>
  );
}
