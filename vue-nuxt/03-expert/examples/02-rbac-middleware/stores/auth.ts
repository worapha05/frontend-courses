import { defineStore } from 'pinia';

export type Role = 'admin' | 'editor' | 'viewer';

export type AuthUser = {
  id: string;
  name: string;
  role: Role;
};

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null);

  function loginAs(role: Role) {
    user.value = {
      id: `u-${role}`,
      name: role.toUpperCase(),
      role,
    };
  }

  function logout() {
    user.value = null;
  }

  const isAuthenticated = computed(() => user.value != null);

  return { user, isAuthenticated, loginAs, logout };
});
