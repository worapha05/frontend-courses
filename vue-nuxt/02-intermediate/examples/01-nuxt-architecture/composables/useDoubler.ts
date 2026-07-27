export function useDoubler(n: number) {
  return computed(() => n * 2);
}
