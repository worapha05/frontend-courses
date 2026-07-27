import { Provider } from 'react-redux';
import type { ReactNode } from 'react';

import { store } from './store';
import { useAppDispatch, useAppSelector } from './hooks';
import { addItem, selectCartCount } from './cartSlice';
import { toggleSidebar, selectSidebarOpen } from './uiSlice';

export function AppStoreProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

/** ตัวอย่าง component ที่ใช้ dispatch + selector */
export function CartBadge() {
  const count = useAppSelector(selectCartCount);
  const sidebarOpen = useAppSelector(selectSidebarOpen);
  const dispatch = useAppDispatch();

  return (
    <div>
      <span>สินค้าในตะกร้า: {count}</span>
      <span>Sidebar: {sidebarOpen ? 'เปิด' : 'ปิด'}</span>
      <button
        type="button"
        onClick={() => dispatch(addItem({ productId: 'p1', name: 'Notebook' }))}
      >
        เพิ่มสินค้า
      </button>
      <button type="button" onClick={() => dispatch(toggleSidebar())}>
        สลับ Sidebar
      </button>
    </div>
  );
}
