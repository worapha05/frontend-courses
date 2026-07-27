import { QueryClient } from '@tanstack/react-query';

/**
 * แยก default ตามชนิดข้อมูล — ดีกว่าใช้ค่าเดียวทั้งแอป
 */
export function createAdvancedQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10_000,
        gcTime: 10 * 60_000,
        retry: 2,
        refetchOnReconnect: true,
      },
    },
  });
}

/** นโยบายแนะนำต่อชนิดข้อมูล */
export const cachePolicies = {
  /** ราคา / stock ที่เปลี่ยนบ่อย */
  realtime: { staleTime: 0, gcTime: 60_000 },
  /** list หน้าแอดมินที่ผู้ใช้สลับไปมา */
  list: { staleTime: 30_000, gcTime: 15 * 60_000 },
  /** master data */
  reference: { staleTime: 60 * 60_000, gcTime: 24 * 60 * 60_000 },
} as const;
