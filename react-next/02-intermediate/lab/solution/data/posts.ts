export type Post = {
  slug: string;
  title: string;
  body: string;
};

export const posts: Post[] = [
  {
    slug: 'rsc-first',
    title: 'เริ่มจาก Server Components',
    body: 'ดึงข้อมูลบน server แล้วค่อยส่งส่วนที่ต้อง interact ไปยัง client',
  },
  {
    slug: 'choose-caching',
    title: 'เลือก Cache ให้ถูก',
    body: 'SSR สำหรับข้อมูลส่วนตัว, SSG สำหรับหน้าคงที่, ISR สำหรับข้อมูลที่เปลี่ยนเป็นพัก ๆ',
  },
  {
    slug: 'route-handlers',
    title: 'Route Handlers',
    body: 'ใช้เมื่อต้องการ HTTP API จริง — webhook, mobile client หรือ third-party',
  },
];

export function getPost(slug: string): Post | undefined {

  return posts.find((p) => p.slug === slug);
}
