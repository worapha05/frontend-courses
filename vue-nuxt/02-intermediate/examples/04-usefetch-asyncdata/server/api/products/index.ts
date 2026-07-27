type Product = {
  id: number;
  name: string;
  category: 'gear' | 'desk';
  price: number;
  description: string;
  stock: number;
};

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Keyboard',
    category: 'gear',
    price: 2890,
    description: 'Hot-swap mechanical keyboard',
    stock: 12,
  },
  {
    id: 2,
    name: 'Monitor Arm',
    category: 'desk',
    price: 1590,
    description: 'Gas-spring single arm',
    stock: 7,
  },
  {
    id: 3,
    name: 'Desk Mat',
    category: 'desk',
    price: 690,
    description: '900×400mm desk mat',
    stock: 30,
  },
  {
    id: 4,
    name: 'Headset',
    category: 'gear',
    price: 3490,
    description: 'Wireless ANC headset',
    stock: 4,
  },
];

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

  return { items: items.map(({ description, stock, ...rest }) => rest) };
});
