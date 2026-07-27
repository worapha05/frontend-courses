export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();
  const roles = to.meta.roles as string[] | undefined;
  if (!roles?.length) return;

  if (!auth.user) {
    return navigateTo('/login');
  }

  if (!roles.includes(auth.user.role)) {
    return navigateTo('/forbidden');
  }
});
