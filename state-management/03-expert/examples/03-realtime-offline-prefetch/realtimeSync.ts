import type { QueryClient } from '@tanstack/react-query';

export type OrderEvent = {
  type: 'order.updated' | 'order.created';
  order: { id: string; status: string; total: number };
};

/**
 * ต่อ websocket แล้วเขียนเข้า React Query cache โดยตรง
 * ในของจริงใช้ WebSocket / SSE / GraphQL subscription
 */
export function bindOrderSocket(
  queryClient: QueryClient,
  socket: {
    on: (event: string, handler: (payload: OrderEvent) => void) => void;
    off: (event: string, handler: (payload: OrderEvent) => void) => void;
  },
) {
  const handler = (evt: OrderEvent) => {
    queryClient.setQueryData(['orders', evt.order.id], evt.order);

    // list อาจเรียงใหม่ — invalidate แบบเฉพาะเจาะจงดีกว่าล้างทั้งโลก
    void queryClient.invalidateQueries({ queryKey: ['orders', 'list'] });
  };

  socket.on('order', handler);
  return () => socket.off('order', handler);
}

/** mock socket สำหรับทดลองใน unit/lab */
export function createMockOrderSocket() {
  const listeners = new Set<(payload: OrderEvent) => void>();
  return {
    on(_event: string, handler: (payload: OrderEvent) => void) {
      listeners.add(handler);
    },
    off(_event: string, handler: (payload: OrderEvent) => void) {
      listeners.delete(handler);
    },
    emit(payload: OrderEvent) {
      for (const l of listeners) l(payload);
    },
  };
}
