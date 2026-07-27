const PRODUCTS = [
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
  const id = Number(getRouterParam(event, 'id'));
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' });
  }
  return product;
});
