export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  category: string;
};

const books: Book[] = [
  {
    id: 'b1',
    title: 'เขียนโค้ดให้ผู้อ่าน',
    author: 'ณัฐวุฒิ โค้ดดี',
    price: 320,
    category: 'พัฒนาซอฟต์แวร์',
    description: 'หลักการตั้งชื่อ โครงสร้างไฟล์ และการรีวิวโค้ดที่ทีมเข้าใจตรงกัน',
  },
  {
    id: 'b2',
    title: 'Svelte จากศูนย์',
    author: 'พิมพ์ใจ รันไทม์',
    price: 450,
    category: 'Frontend',
    description: 'Runes, stores, และ SvelteKit สำหรับสร้างแอปจริงทีละชั้น',
  },
  {
    id: 'b3',
    title: 'ออกแบบ API ที่ทนทาน',
    author: 'วิชัย เน็ตเวิร์ก',
    price: 390,
    category: 'Backend',
    description: 'สัญญาของ endpoint, การจัดการ error และ version API',
  },
  {
    id: 'b4',
    title: 'TypeScript ในงานประจำวัน',
    author: 'อรทัย สตริกต์',
    price: 360,
    category: 'ภาษา',
    description: 'type ที่ช่วยทีม ไม่ใช่ type ที่ขัดขวาง — พร้อมแบบฝึกหัดสั้น ๆ',
  },
  {
    id: 'b5',
    title: 'ร้านค้าออนไลน์มือใหม่',
    author: 'กมล ช้อปปิ้ง',
    price: 280,
    category: 'ธุรกิจ',
    description: 'ตะกร้า สั่งซื้อ และการตรวจ form ที่ลูกค้ากรอกจริง',
  },
];

export function listBooks(): Book[] {
  return books;
}

export function getBook(id: string): Book | undefined {
  return books.find((b) => b.id === id);
}
