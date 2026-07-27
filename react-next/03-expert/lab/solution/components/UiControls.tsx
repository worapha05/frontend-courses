'use client';

import { useUiStore } from '@/store/uiStore';

type UiControlsProps = {
  logoutAction: () => Promise<void>;
};

export function UiControls({ logoutAction }: UiControlsProps) {
  const denseMode = useUiStore((s) => s.denseMode);
  const sidebarCollapsed = useUiStore((s) => s.sidebarCollapsed);
  const toggleDense = useUiStore((s) => s.toggleDense);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);

  if (sidebarCollapsed) {
    return (
      <button
        type="button"
        onClick={toggleSidebar}
        className="hidden h-fit rounded-md bg-white px-2 py-2 text-sm shadow-sm md:block"
        aria-label="ขยาย sidebar"
      >
        »
      </button>
    );
  }

  return (
    <aside className="hidden w-56 shrink-0 space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:block">
      <strong className="block">UI Prefs (Zustand)</strong>
      <button
        type="button"
        onClick={toggleDense}
        className="w-full rounded-md bg-slate-100 px-3 py-2 text-left text-sm font-semibold"
      >
        Dense: {denseMode ? 'ON' : 'OFF'}
      </button>
      <button
        type="button"
        onClick={toggleSidebar}
        className="w-full rounded-md bg-slate-100 px-3 py-2 text-left text-sm font-semibold"
      >
        Collapse sidebar
      </button>
      <form action={logoutAction}>
        <button
          type="submit"
          className="w-full rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white"
        >
          Logout
        </button>
      </form>
    </aside>
  );
}
