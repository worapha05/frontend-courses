export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

const PRODUCTS: Product[] = [
  { id: 'kb-1', name: 'Mechanical Keyboard', price: 3200, stock: 15 },
  { id: 'mon-1', name: '27" 4K Monitor', price: 12900, stock: 6 },
  { id: 'hub-1', name: 'USB-C Hub', price: 1500, stock: 40 },
  { id: 'tab-1', name: 'Drawing Tablet', price: 8500, stock: 9 },
];

export function listProducts(): Product[] {

  return PRODUCTS.map((p) => ({ ...p }));
}

export function getProduct(id: string): Product | undefined {
  const found = PRODUCTS.find((p) => p.id === id);
  return found ? { ...found } : undefined;
}
