export function useProductFilters() {
  const q = ref('');
  const category = ref('all');

  return { q, category };
}
