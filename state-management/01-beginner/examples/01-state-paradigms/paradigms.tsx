/**
 * Example 01 — State Paradigms
 * เปรียบเทียบ Client State / Server State และ Local / Global แบบโค้ดสั้น ๆ
 */
import { useState } from 'react';

// ─── Client State: Local ─────────────────────────────────────────────────────
export function ProductCard({ name }: { name: string }) {
  // ใช้แค่ component นี้ → local เพียงพอ
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article>
      <h3>{name}</h3>
      <button type="button" onClick={() => setIsExpanded((v) => !v)}>
        {isExpanded ? 'ย่อ' : 'ขยาย'}
      </button>
      {isExpanded ? <p>รายละเอียดสินค้า…</p> : null}
    </article>
  );
}

// ─── Client State: Global (conceptual shape) ─────────────────────────────────
/** UI / workflow ที่หลายหน้าแชร์ — เหมาะกับ RTK / Context / Zustand */
export type UiClientState = {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  activeModal: 'none' | 'login' | 'checkout';
};

export const initialUiState: UiClientState = {
  theme: 'light',
  sidebarOpen: true,
  activeModal: 'none',
};

// ─── Server State: shape ที่ควรอยู่ใน Query/Apollo cache ไม่ใช่ Redux ────────
export type Product = {
  id: string;
  name: string;
  price: number;
  updatedAt: string;
};

export type ProductsQueryKey = readonly ['products', { q: string; page: number }];

export function productsQueryKey(q: string, page: number): ProductsQueryKey {
  return ['products', { q, page }] as const;
}

/**
 * Anti-pattern: copy server list เข้า client store เป็น source of truth
 * ทำให้ต้อง sync เองทุกครั้งที่ refetch / invalidate
 */
export type AntiPatternRootState = {
  products: Product[]; // ❌ อย่าทำแบบนี้เป็นค่าเริ่มต้น
  productsLoading: boolean;
  productsError: string | null;
};

/**
 * Recommended: แยกความรับผิดชอบ
 * - Client store เก็บ filters / selection
 * - Server cache เก็บ products ตาม queryKey
 */
export type RecommendedClientState = {
  filters: { q: string; page: number };
  selectedProductId: string | null;
};

export function decideStateHome(input: {
  kind: 'ui-flag' | 'api-list' | 'selection' | 'form-draft';
}): 'local-client' | 'global-client' | 'server-cache' {
  switch (input.kind) {
    case 'ui-flag':
      return 'local-client'; // หรือ global-client ถ้าแชร์ข้าม layout
    case 'selection':
      return 'global-client'; // หรือ local ถ้าระยะสั้นในหน้าเดียว
    case 'form-draft':
      return 'local-client';
    case 'api-list':
      return 'server-cache';
  }
}
