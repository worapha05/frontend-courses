import type { QueryClient } from '@tanstack/react-query';
import { applyRemoteOrderPatch, pulseKeys, type PulseOrder } from '../orders/api';

export type PulseSocketEvent = {
  type: 'order.updated';
  order: PulseOrder;
};

export function createPulseSocket() {
  const listeners = new Set<(evt: PulseSocketEvent) => void>();
  return {
    on(handler: (evt: PulseSocketEvent) => void) {
      listeners.add(handler);
    },
    off(handler: (evt: PulseSocketEvent) => void) {
      listeners.delete(handler);
    },
    emit(evt: PulseSocketEvent) {
      applyRemoteOrderPatch(evt.order);
      for (const l of listeners) l(evt);
    },
  };
}

export function bindPulseSocket(
  queryClient: QueryClient,
  socket: ReturnType<typeof createPulseSocket>,
) {
  const handler = (evt: PulseSocketEvent) => {
    queryClient.setQueryData(pulseKeys.detail(evt.order.id), evt.order);
    queryClient.setQueryData<PulseOrder[]>(pulseKeys.list, (old = []) => {
      const exists = old.some((o) => o.id === evt.order.id);
      if (!exists) return [evt.order, ...old];
      return old.map((o) => (o.id === evt.order.id ? evt.order : o));
    });
  };
  socket.on(handler);
  return () => socket.off(handler);
}
