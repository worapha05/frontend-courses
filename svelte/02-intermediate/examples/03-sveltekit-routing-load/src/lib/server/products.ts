export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
};

const products: Product[] = [
  {
    id: 'sku-1',
    name: 'กระบอกน้ำสแตนเลส',
    price: 450,
    description: 'เก็บความเย็นได้นาน 12 ชม. เหมาะพกพาทุกวัน',
  },
  {
    id: 'sku-2',
    name: 'สมุดโน้ต A5',
    price: 120,
    description: 'กระดาษหนา 100 แกรม เขียนลื่น ไม่ซึม',
  },
  {
    id: 'sku-3',
    name: 'ปากกาเจล 0.5',
    price: 35,
    description: 'หมึกแห้งเร็ว สีเข้ม อ่านง่าย',
  },
  {
    id: 'sku-4',
    name: 'กระเป๋าผ้าแคนวาส',
    price: 290,
    description: 'ทนทาน ซักได้ ใส่ของจุใจ',
  },
];

export function listProducts(): Product[] {
  return products;
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
