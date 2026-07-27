import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPulseOrder, fetchPulseOrders, packOrder, pulseKeys, type PulseOrder } from './api';

export function usePulseOrders() {
  return useQuery({
    queryKey: pulseKeys.list,
    queryFn: fetchPulseOrders,
    staleTime: 10_000,
  });
}

export function usePackOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: packOrder,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: pulseKeys.list });
      const previous = queryClient.getQueryData<PulseOrder[]>(pulseKeys.list);

      queryClient.setQueryData<PulseOrder[]>(pulseKeys.list, (old = []) =>
        old.map((o) => (o.id === id ? { ...o, status: 'packed' } : o)),
      );

      return { previous };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(pulseKeys.list, ctx.previous);
      }
    },
    onSettled: async (_data, _err, id) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: pulseKeys.list }),
        queryClient.invalidateQueries({ queryKey: pulseKeys.detail(id) }),
      ]);
    },
  });
}

export function prefetchOrderDetail(queryClient: ReturnType<typeof useQueryClient>, id: string) {
  return queryClient.prefetchQuery({
    queryKey: pulseKeys.detail(id),
    queryFn: () => fetchPulseOrder(id),
    staleTime: 60_000,
  });
}
