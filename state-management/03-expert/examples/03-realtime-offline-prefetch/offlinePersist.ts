import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

/**
 * Offline-first skeleton
 * - persist cache ลง storage
 * - ตั้ง buster/version เมื่อ schema เปลี่ยน
 *
 * หมายเหตุ: ใน SSR/Node ไม่มี localStorage — ใช้เฉพาะฝั่ง browser
 */
export function createPersistedQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 24 * 60 * 60_000,
        staleTime: 60_000,
        networkMode: 'offlineFirst',
      },
      mutations: {
        networkMode: 'offlineFirst',
      },
    },
  });

  if (typeof window !== 'undefined') {
    const persister = createSyncStoragePersister({
      storage: window.localStorage,
      key: 'BOOTCAMP_RQ_CACHE',
    });

    persistQueryClient({
      queryClient,
      persister,
      maxAge: 24 * 60 * 60_000,
      buster: 'v1',
    });
  }

  return queryClient;
}
