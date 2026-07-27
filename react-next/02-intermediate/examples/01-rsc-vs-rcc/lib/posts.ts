export type Post = {
  id: string;
  title: string;
  excerpt: string;
  likes: number;
};

/** จำลองการอ่านจาก DB บน server — ห้ามเรียกจาก Client Component โดยตรง */
export async function getServerPosts(): Promise<Post[]> {
  await new Promise((r) => setTimeout(r, 150));

  return [
    {
      id: 'p1',
      title: 'Server Components คือค่าเริ่มต้น',
      excerpt: 'ดึงข้อมูลใกล้แหล่งข้อมูล ลด JS ที่ส่งไป browser',
      likes: 12,
    },
    {
      id: 'p2',
      title: 'Client Components เฉพาะจุดที่ต้องโต้ตอบ',
      excerpt: 'useState / onClick อยู่ในใบของต้นไม้ UI',
      likes: 8,
    },
  ];
}
