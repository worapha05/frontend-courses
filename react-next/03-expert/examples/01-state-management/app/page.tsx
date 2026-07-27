import { StateDemo } from '@/components/StateDemo';

export default function HomePage() {
  return (
    <main>
      <h1>State at Scale</h1>
      <p style={{ color: '#64748b' }}>
        Zustand สำหรับ domain state ที่ต้อง persist · Redux Toolkit สำหรับ UI conventions ของทีมใหญ่
      </p>
      <StateDemo />
    </main>
  );
}
