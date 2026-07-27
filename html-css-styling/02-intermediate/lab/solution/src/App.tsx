import { useState } from 'react';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Modal } from './components/Modal';

export default function App() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const error = email.length > 0 && !email.includes('@') ? 'อีเมลไม่ถูกต้อง' : undefined;

  return (
    <main className="mx-auto grid max-w-lg gap-6 px-6 py-10">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Harbor UI — App</h1>
          <p className="text-stone-600 dark:text-stone-400">
            สี brand ตรงกับ SASS ($color-brand / brand-700)
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => document.documentElement.classList.toggle('dark')}
        >
          Dark
        </Button>
      </header>

      <Input
        label="อีเมลทีม"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
        placeholder="crew@harbor.example"
      />

      {/* className="px-2" ทับ size md ได้เพราะ cn() ใช้ twMerge */}
      <div className="flex flex-wrap gap-2">
        <Button className="px-2" onClick={() => setOpen(true)}>
          เชิญเข้าทีม
        </Button>
        <Button variant="ghost">ยกเลิก</Button>
        <Button variant="danger" size="sm">
          ลบคำเชิญ
        </Button>
      </div>

      <Modal open={open} title="ส่งคำเชิญ?" onClose={() => setOpen(false)}>
        <p className="mb-4 text-stone-600 dark:text-stone-300">
          จะส่งคำเชิญไปที่ <strong>{email || '—'}</strong>
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            ปิด
          </Button>
          <Button onClick={() => setOpen(false)}>ยืนยัน</Button>
        </div>
      </Modal>
    </main>
  );
}
