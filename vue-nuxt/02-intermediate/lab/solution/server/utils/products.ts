export type Product = {
  id: number;
  name: string;
  category: 'gear' | 'desk' | 'audio';
  price: number;
  description: string;
  stock: number;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Mechanical Keyboard',
    category: 'gear',
    price: 2890,
    description: 'Hot-swap TKL keyboard',
    stock: 12,
  },
  {
    id: 2,
    name: 'Quiet Mouse',
    category: 'gear',
    price: 990,
    description: 'Silent click mouse',
    stock: 20,
  },
  {
    id: 3,
    name: 'Monitor Arm',
    category: 'desk',
    price: 1590,
    description: 'Gas spring arm',
    stock: 8,
  },
  {
    id: 4,
    name: 'Desk Mat',
    category: 'desk',
    price: 690,
    description: '900×400 desk mat',
    stock: 40,
  },
  {
    id: 5,
    name: 'Studio Headphones',
    category: 'audio',
    price: 4490,
    description: 'Closed-back monitoring',
    stock: 6,
  },
  {
    id: 6,
    name: 'USB Microphone',
    category: 'audio',
    price: 3290,
    description: 'Cardioid USB mic',
    stock: 10,
  },
];
