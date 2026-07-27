import { useQuery } from '@apollo/client';

import { GET_CATEGORIES } from './apolloClient';

type CategoriesData = {
  continents: Array<{ code: string; name: string }>;
};

export function CategoryRail() {
  const { data, loading, error } = useQuery<CategoriesData>(GET_CATEGORIES);

  return (
    <nav className="panel panel--aside" aria-label="catalog categories">
      <p className="eyebrow">Server State · Apollo</p>
      <h2>หมวด (demo)</h2>
      <p className="meta">GraphQL public API ใช้แทน catalog</p>

      {loading ? <p className="status">โหลดหมวด…</p> : null}
      {error ? <p className="status status--error">{error.message}</p> : null}

      <ul className="category-list">
        {data?.continents.map((c) => (
          <li key={c.code}>
            <span className="code">{c.code}</span>
            {c.name}
          </li>
        ))}
      </ul>
    </nav>
  );
}
