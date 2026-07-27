import { writable } from 'svelte/store';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
};

function createCart() {
  const { subscribe, update, set } = writable<CartItem[]>([]);

  return {
    subscribe,
    add(book: { id: string; title: string; price: number }) {
      update((items) => {
        const found = items.find((i) => i.id === book.id);
        if (found) {
          return items.map((i) => (i.id === book.id ? { ...i, qty: i.qty + 1 } : i));
        }
        return [...items, { ...book, qty: 1 }];
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
