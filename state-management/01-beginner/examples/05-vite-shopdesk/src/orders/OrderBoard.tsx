import { useQuery } from '@tanstack/react-query';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectOrder,
  selectSelectedOrderId,
  selectStatusFilter,
  setStatusFilter,
  type OrderStatusFilter,
} from '../store/uiSlice';
import { fetchOrders, orderKeys } from './api';

export function OrderBoard() {
  const status = useAppSelector(selectStatusFilter);
  const selectedId = useAppSelector(selectSelectedOrderId);
  const dispatch = useAppDispatch();

  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: orderKeys.list(status),
    queryFn: () => fetchOrders(status),
  });

  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <p className="eyebrow">Server State · TanStack Query</p>
          <h2>ออเดอร์</h2>
        </div>
        <label className="filter">
          สถานะ
          <select
            value={status}
            onChange={(e) => dispatch(setStatusFilter(e.target.value as OrderStatusFilter))}
          >
            <option value="all">ทั้งหมด</option>
            <option value="paid">ชำระแล้ว</option>
            <option value="pending">รอดำเนินการ</option>
          </select>
        </label>
      </header>

      <p className="meta">
        queryKey: <code>{JSON.stringify(orderKeys.list(status))}</code>
        {isFetching ? ' · sync…' : ''}
      </p>

      {isPending ? <p className="status">กำลังโหลด…</p> : null}
      {isError ? <p className="status status--error">{(error as Error).message}</p> : null}

      <ul className="order-list">
        {data?.map((order) => {
          const active = order.id === selectedId;
          return (
            <li key={order.id}>
              <button
                type="button"
                className={active ? 'order-row order-row--active' : 'order-row'}
                onClick={() => dispatch(selectOrder(order.id))}
              >
                <span className="order-row__id">{order.id}</span>
                <span>{order.customer}</span>
                <span>฿{order.total.toLocaleString('th-TH')}</span>
                <span className={`badge badge--${order.status}`}>{order.status}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="hint">
        คลิกแถวจะ <code>dispatch(selectOrder)</code> เก็บแค่ id ใน RTK — ไม่ copy object ทั้งก้อน
      </p>
    </section>
  );
}
