import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

export function createPulseQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10_000,
        gcTime: 24 * 60 * 60_000,
        networkMode: 'offlineFirst',
      },
      mutations: {
        networkMode: 'offlineFirst',
      },
    },
  });

  if (typeof window !== 'undefined') {
    persistQueryClient({
      queryClient,
      persister: createSyncStoragePersister({
        storage: window.localStorage,
        key: 'PULSEBOARD_RQ',
      }),
      maxAge: 24 * 60 * 60_000,
      buster: 'pulse-v1',
    });
  }

  return queryClient;
}
