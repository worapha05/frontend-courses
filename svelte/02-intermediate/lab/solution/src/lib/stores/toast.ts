import { writable } from 'svelte/store';

export type Toast = {
  id: number;
  message: string;
};

function createToasts() {
  const { subscribe, update } = writable<Toast[]>([]);
  let seq = 1;

  return {
    subscribe,
    push(message: string, ms = 2200) {
      const id = seq++;
      update((list) => [...list, { id, message }]);
      setTimeout(() => {
        update((list) => list.filter((t) => t.id !== id));
      }, ms);
    },
    dismiss(id: number) {
      update((list) => list.filter((t) => t.id !== id));
    },
  };
}

export const toasts = createToasts();
