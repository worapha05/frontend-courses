import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectOrder, selectStatusFilter, setStatusFilter, type OrderStatusFilter } from '../store/uiSlice';
import { fetchOrders, orderKeys } from './api';

export function OrderBoard() {
  const status = useAppSelector(selectStatusFilter);
  const dispatch = useAppDispatch();

  const { data, isPending, isError, error } = useQuery({
    queryKey: orderKeys.list(status),
    queryFn: () => fetchOrders(status),
  });

  return (
    <section>
      <header>
        <h2>ออเดอร์</h2>
        <select
          value={status}
          onChange={(e) => dispatch(setStatusFilter(e.target.value as OrderStatusFilter))}
        >
          <option value="all">ทั้งหมด</option>
          <option value="paid">ชำระแล้ว</option>
          <option value="pending">รอดำเนินการ</option>
        </select>
      </header>

      {isPending ? <p>กำลังโหลด…</p> : null}
      {isError ? <p>{(error as Error).message}</p> : null}

      <ul>
        {data?.map((order) => (
          <li key={order.id}>
            <button type="button" onClick={() => dispatch(selectOrder(order.id))}>
              {order.id} — {order.customer} — ฿{order.total} ({order.status})
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
