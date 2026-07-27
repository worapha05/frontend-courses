import { writable } from 'svelte/store';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

function createCart() {
  const { subscribe, update, set } = writable<CartItem[]>([]);

  return {
    subscribe,
    add(product: { id: string; name: string; price: number }) {
      update((items) => {
        const found = items.find((i) => i.id === product.id);
        if (found) {
          return items.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
        }
        return [...items, { ...product, qty: 1 }];
      });
    },
    remove(id: string) {
      update((items) => items.filter((i) => i.id !== id));
    },
    setQty(id: string, qty: number) {
      update((items) => {
        if (qty <= 0) return items.filter((i) => i.id !== id);
        return items.map((i) => (i.id === id ? { ...i, qty } : i));
      });
    },
    clear: () => set([]),
  };
}

export const cart = createCart();
