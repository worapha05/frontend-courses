'use client';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { setDense, store, toggleSidebar, type RootState } from '@/store/reduxStore';
import { useCartStore } from '@/store/cartStore';

const CATALOG = [
  { id: 'kb', name: 'Keyboard' },
  { id: 'ms', name: 'Mouse' },
  { id: 'hd', name: 'Headset' },
];

function StatePlayground() {
  const items = useCartStore((s) => s.items);
  const add = useCartStore((s) => s.add);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);
  const totalQty = useCartStore((s) => s.items.reduce((n, i) => n + i.qty, 0));

  const sidebarOpen = useSelector((s: RootState) => s.ui.sidebarOpen);
  const dense = useSelector((s: RootState) => s.ui.dense);
  const dispatch = useDispatch();

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      {sidebarOpen ? (
        <aside
          style={{
            width: 180,
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            padding: '0.75rem',
          }}
        >
          <strong>RTK Sidebar</strong>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>state จาก Redux Toolkit</p>
        </aside>
      ) : null}

      <div style={{ flex: 1 }}>
        <section
          style={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            padding: dense ? '0.5rem' : '1rem',
            marginBottom: '1rem',
          }}
        >
          <h2 style={{ marginTop: 0 }}>UI Controls (Redux Toolkit)</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button type="button" onClick={() => dispatch(toggleSidebar())}>
              Toggle sidebar
            </button>
            <button type="button" onClick={() => dispatch(setDense(!dense))}>
              Dense: {dense ? 'on' : 'off'}
            </button>
          </div>
        </section>

        <section
          style={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            padding: dense ? '0.5rem' : '1rem',
          }}
        >
          <h2 style={{ marginTop: 0 }}>Cart (Zustand + persist)</h2>
          <p>รวม {totalQty} ชิ้น</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {CATALOG.map((p) => (
              <button key={p.id} type="button" onClick={() => add(p)}>
                + {p.name}
              </button>
            ))}
            <button type="button" onClick={clear}>
              Clear
            </button>
          </div>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name} × {item.qty}{' '}
                <button type="button" onClick={() => remove(item.id)}>
                  ลบ
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export function StateDemo() {

  return (
    <Provider store={store}>
      <StatePlayground />
    </Provider>
  );
}
