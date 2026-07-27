import { QueryClient } from '@tanstack/react-query';

/**
 * สร้าง QueryClient หนึ่งครั้งต่อแอป (หรือต่อ test scope)
 * ค่า default ระดับ beginner — ปรับละเอียดใน Intermediate
 */
export function createAppQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000, // 30s ถือว่ายังสด
        gcTime: 5 * 60_000, // เก็บ cache 5 นาทีหลังไม่มีผู้ subscribe
        retry: 1,
        refetchOnWindowFocus: true,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}
