type Kpi = { label: string; value: string };

export function KpiGrid({ items }: { items: Kpi[] }) {

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.label}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {item.label}
          </p>
          <p className="mt-2 text-2xl font-bold text-teal-800">{item.value}</p>
        </article>
      ))}
    </section>
  );
}
