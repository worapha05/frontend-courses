import { defineStore } from 'pinia';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);

  const count = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0));

  const total = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0));

  function add(product: Omit<CartItem, 'qty'>) {
    const existing = items.value.find((i) => i.id === product.id);
    if (existing) {
      existing.qty += 1;
      return;
    }
    items.value.push({ ...product, qty: 1 });
  }

  function remove(id: number) {
    items.value = items.value.filter((i) => i.id !== id);
  }

  function clear() {
    items.value = [];
  }

  return { items, count, total, add, remove, clear };
});
