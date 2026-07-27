import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { pulseStore, type PulseDispatch } from './grid/store';
import { toggleSelected } from './grid/gridUiSlice';
import { useIsOrderSelected } from './grid/useIsOrderSelected';
import { usePackOrderMutation, usePulseOrders, prefetchOrderDetail } from './orders/hooks';
import { bindPulseSocket, createPulseSocket } from './sync/realtime';
import { createPulseQueryClient } from './sync/persist';

const queryClient = createPulseQueryClient();
const socket = createPulseSocket();

function OrderRow({
  id,
  customer,
  total,
  status,
}: {
  id: string;
  customer: string;
  total: number;
  status: string;
}) {
  const selected = useIsOrderSelected(id);
  const dispatch = useDispatch<PulseDispatch>();
  const pack = usePackOrderMutation();
  const qc = useQueryClient();

  return (
    <tr
      data-selected={selected}
      onMouseEnter={() => {
        void prefetchOrderDetail(qc, id);
      }}
    >
      <td>
        <input type="checkbox" checked={selected} onChange={() => dispatch(toggleSelected(id))} />
      </td>
      <td>{id}</td>
      <td>{customer}</td>
      <td>{total}</td>
      <td>{status}</td>
      <td>
        <button
          type="button"
          disabled={status === 'packed' || pack.isPending}
          onClick={() => pack.mutate(id)}
        >
          Pack
        </button>
        {pack.isError && pack.variables === id ? (
          <span role="alert">{(pack.error as Error).message}</span>
        ) : null}
      </td>
    </tr>
  );
}

function Board() {
  const { data = [], isPending, isError, error } = usePulseOrders();
  const qc = useQueryClient();

  useEffect(() => bindPulseSocket(qc, socket), [qc]);

  return (
    <section>
      <header>
        <h1>PulseBoard</h1>
        <button
          type="button"
          onClick={() =>
            socket.emit({
              type: 'order.updated',
              order: {
                id: 'A-100',
                customer: 'Ann',
                total: 900,
                status: 'cancelled',
              },
            })
          }
        >
          จำลอง realtime: ยกเลิก A-100
        </button>
      </header>

      {isPending ? <p>โหลด…</p> : null}
      {isError ? <p>{(error as Error).message}</p> : null}

      <table>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>ลูกค้า</th>
            <th>ยอด</th>
            <th>สถานะ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((o) => (
            <OrderRow key={o.id} {...o} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function PulseBoardApp() {
  return (
    <Provider store={pulseStore}>
      <QueryClientProvider client={queryClient}>
        <Board />
      </QueryClientProvider>
    </Provider>
  );
}
