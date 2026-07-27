import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UiState = {
  denseMode: boolean;
  sidebarCollapsed: boolean;
  toggleDense: () => void;
  toggleSidebar: () => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      denseMode: false,
      sidebarCollapsed: false,
      toggleDense: () => set((s) => ({ denseMode: !s.denseMode })),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
    }),
    { name: 'rn-expert-lab-ui' },
  ),
);
