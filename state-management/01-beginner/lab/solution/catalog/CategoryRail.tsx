import { useQuery } from '@apollo/client';

import { GET_CATEGORIES } from './apolloClient';

type CategoriesData = {
  continents: Array<{ code: string; name: string }>;
};

export function CategoryRail() {
  const { data, loading, error } = useQuery<CategoriesData>(GET_CATEGORIES);

  if (loading) return <p>โหลดหมวดหมู่…</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <nav aria-label="catalog categories">
      <h2>หมวดสินค้า (demo)</h2>
      <ul>
        {data?.continents.map((c) => (
          <li key={c.code}>{c.name}</li>
        ))}
      </ul>
    </nav>
  );
}
