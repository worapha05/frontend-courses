import { useStore } from 'react-redux';
import { useSyncExternalStore } from 'react';
import { selectIsSelected, type PulseRootState } from './store';

export function useIsOrderSelected(orderId: string) {
  const store = useStore<PulseRootState>();
  return useSyncExternalStore(
    store.subscribe,
    () => selectIsSelected(store.getState(), orderId),
    () => selectIsSelected(store.getState(), orderId),
  );
}
