export function useAdminApi() {
  const auth = useAuthStore();

  return {
    fetchStats: () =>
      $fetch('/api/admin/stats', {
        headers: {
          'x-demo-role': auth.user?.role ?? '',
        },
      }),
  };
}
