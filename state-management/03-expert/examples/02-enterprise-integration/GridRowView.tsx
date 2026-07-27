import { useQuery } from '@tanstack/react-query';
import { useStore } from 'react-redux';
import type { RootState } from './store';
import { selectIsRowSelected } from './store';
import { useSyncExternalStore } from 'react';

export type GridRow = {
  id: string;
  name: string;
  amount: number;
  status: 'open' | 'closed';
};

async function fetchGridPage(): Promise<GridRow[]> {
  await new Promise((r) => setTimeout(r, 100));
  return Array.from({ length: 50 }, (_, i) => ({
    id: `R-${i + 1}`,
    name: `แถว ${i + 1}`,
    amount: (i + 1) * 100,
    status: i % 2 === 0 ? 'open' : 'closed',
  }));
}

/** Server rows อยู่ใน RQ — ไม่ copy เข้า Redux */
export function useGridRows() {
  return useQuery({
    queryKey: ['grid', 'page', 1],
    queryFn: fetchGridPage,
    staleTime: 30_000,
    select: (rows) => rows, // จุดขยาย: select เฉพาะ field ที่ตารางใช้
  });
}

/**
 * Subscribe เฉพาะแถวนี้ว่าถูกเลือกหรือไม่
 * ใช้ getState + subscribe แทน useSelector ทั้ง selectedIds array
 * เพื่อลด re-render เมื่อ selection อื่นเปลี่ยน (pattern ขั้นสูง)
 */
export function useIsRowSelected(rowId: string) {
  const store = useStore<RootState>();
  return useSyncExternalStore(
    store.subscribe,
    () => selectIsRowSelected(store.getState(), rowId),
    () => selectIsRowSelected(store.getState(), rowId),
  );
}

export function GridRowView({ row }: { row: GridRow }) {
  const selected = useIsRowSelected(row.id);
  return (
    <tr data-selected={selected}>
      <td>{row.id}</td>
      <td>{row.name}</td>
      <td>{row.amount}</td>
      <td>{row.status}</td>
    </tr>
  );
}
