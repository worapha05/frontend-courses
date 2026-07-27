import { defineStore } from 'pinia';

export type Role = 'admin' | 'viewer';

export type AuthUser = {
  id: string;
  name: string;
  role: Role;
};

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null);

  const isAuthenticated = computed(() => user.value != null);

  function loginAs(role: Role) {
    user.value = {
      id: `u-${role}`,
      name: role === 'admin' ? 'Admin User' : 'Viewer User',
      role,
    };
  }

  function logout() {
    user.value = null;
  }

  return { user, isAuthenticated, loginAs, logout };
});
