export type Product = {
  id: string;
  name: string;
  stock: number;
};

const PRODUCTS: Product[] = [
  { id: '1', name: 'Notebook', stock: 12 },
  { id: '2', name: 'Mouse', stock: 40 },
  { id: '3', name: 'Headset', stock: 7 },
];

export type ProductsPayload = {
  fetchedAt: string;
  products: Array<Product & { viewNonce: number }>;
};

/**
 * อ่านข้อมูลตรงจาก data layer — ใช้ใน RSC / build ได้
 * (อย่า fetch กลับมาที่ /api ของตัวเองตอน prerender)
 */
export function getProductsPayload(): ProductsPayload {

  return {
    fetchedAt: new Date().toISOString(),
    products: PRODUCTS.map((p) => ({
      ...p,
      viewNonce: Math.floor(Math.random() * 10_000),
    })),
  };
}

/**
 * จำลอง network fetch + cache options ของ Next.js
 * ใช้ absolute URL ไม่ได้ตอน build → เรียก data layer แล้วห่อด้วย Promise
 * เพื่อให้หน้า SSR/SSG/ISR ยังสาธิต cache semantics ผ่าน dynamic/revalidate ได้
 */
export async function getProducts(): Promise<ProductsPayload> {
  await new Promise((r) => setTimeout(r, 80));

  return getProductsPayload();
}
