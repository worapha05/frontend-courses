export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

/** Shared cart state ในไฟล์ .svelte.ts — ใช้ runes นอก component ได้ */
export const cart = $state<{ items: CartItem[] }>({
  items: [
    { id: '1', name: 'Svelte Stickers', price: 120, qty: 2 },
    { id: '2', name: 'Rune Notebook', price: 250, qty: 1 },
  ],
});

export function addItem(name: string, price: number) {
  const existing = cart.items.find((i) => i.name === name);
  if (existing) {
    existing.qty += 1;
    return;
  }
  cart.items.push({
    id: crypto.randomUUID(),
    name,
    price,
    qty: 1,
  });
}

export function removeItem(id: string) {
  const index = cart.items.findIndex((i) => i.id === id);
  if (index !== -1) cart.items.splice(index, 1);
}

export function clearCart() {
  cart.items = [];
}
