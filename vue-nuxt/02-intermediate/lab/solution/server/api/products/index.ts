import { PRODUCTS } from '../../utils/products';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const q = String(query.q ?? '').toLowerCase();
  const category = String(query.category ?? 'all');

  let items = PRODUCTS;
  if (category !== 'all') {
    items = items.filter((p) => p.category === category);
  }
  if (q) {
    items = items.filter((p) => p.name.toLowerCase().includes(q));
  }

  return {
    items: items.map(({ id, name, category, price }) => ({
      id,
      name,
      category,
      price,
    })),
  };
});
