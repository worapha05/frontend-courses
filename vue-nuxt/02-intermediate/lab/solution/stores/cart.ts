import { defineStore } from 'pinia';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);

  const count = computed(() => items.value.reduce((s, i) => s + i.qty, 0));
  const total = computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0));

  function add(product: { id: number; name: string; price: number }) {
    const found = items.value.find((i) => i.id === product.id);
    if (found) {
      found.qty += 1;
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
