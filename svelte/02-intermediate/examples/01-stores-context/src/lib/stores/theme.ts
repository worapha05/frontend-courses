import { writable } from 'svelte/store';

export type ThemeMode = 'light' | 'dark';

export const theme = writable<ThemeMode>('light');

export function toggleTheme() {
  theme.update((mode) => (mode === 'light' ? 'dark' : 'light'));
}
