import Image from 'next/image';
import { ChartPanel } from '@/components/ChartPanel';

export default function HomePage() {
  return (
    <main>
      <h1>Performance & Core Web Vitals</h1>
      <p style={{ color: '#64748b' }}>
        `next/font` ลด CLS จากฟอนต์ · `next/image` คุม LCP · dynamic import ลด JS เริ่มต้น
      </p>

      <figure style={{ margin: '1.5rem 0', position: 'relative', aspectRatio: '16 / 9' }}>
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
          alt="Dashboard analytics atmosphere"
          fill
          priority
          sizes="(max-width: 800px) 100vw, 800px"
          style={{ objectFit: 'cover', borderRadius: 8 }}
        />
      </figure>

      <ChartPanel />

      <section style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#475569' }}>
        <h2>Checklist เร็ว ๆ</h2>
        <ul>
          <li>
            LCP: รูป hero ใช้ <code>priority</code> + ขนาดชัด
          </li>
          <li>INP: หลีกเลี่ยงงานหนักบน main thread ตอนคลิก</li>
          <li>CLS: จองที่ว่างให้รูป/ฟอนต์ก่อนโหลดเสร็จ</li>
        </ul>
      </section>
    </main>
  );
}
