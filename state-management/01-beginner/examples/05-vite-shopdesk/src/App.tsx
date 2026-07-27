import { useAppDispatch, useAppSelector } from './store/hooks';
import {
  clearSelection,
  selectSelectedOrderId,
  selectSidebarOpen,
  toggleSidebar,
} from './store/uiSlice';

import { OrderBoard } from './orders/OrderBoard';
import { CategoryRail } from './catalog/CategoryRail';

export function App() {
  const sidebarOpen = useAppSelector(selectSidebarOpen);
  const selectedId = useAppSelector(selectSelectedOrderId);
  const dispatch = useAppDispatch();

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <p className="brand">ShopDesk</p>
          <p className="tagline">Beginner · RTK + React Query + Apollo</p>
        </div>
        <div className="topbar__actions">
          <button type="button" className="btn" onClick={() => dispatch(toggleSidebar())}>
            {sidebarOpen ? 'ซ่อน Sidebar' : 'แสดง Sidebar'}
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            disabled={!selectedId}
            onClick={() => dispatch(clearSelection())}
          >
            เคลียร์ selection
          </button>
        </div>
      </header>

      <div className="legend">
        <span className="pill pill--client">Client State → Redux Toolkit</span>
        <span className="pill pill--server">Server State → Query / Apollo</span>
      </div>

      <div className={sidebarOpen ? 'layout' : 'layout layout--full'}>
        {sidebarOpen ? <CategoryRail /> : null}
        <main className="main">
          <OrderBoard />
          <aside className="panel panel--detail">
            <p className="eyebrow">Client State · RTK</p>
            <h2>รายละเอียดที่เลือก</h2>
            <p className="selected">
              selectedOrderId: <strong>{selectedId ?? '—'}</strong>
            </p>
            <p className="hint">
              ค่านี้มาจาก <code>useAppSelector</code> — ไม่ได้เก็บ orders[] ใน store
            </p>
          </aside>
        </main>
      </div>
    </div>
  );
}
