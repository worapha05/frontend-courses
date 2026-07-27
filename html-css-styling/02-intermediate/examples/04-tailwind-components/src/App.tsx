import { useState } from 'react';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Modal } from './components/Modal';

export default function App() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const error = email && !email.includes('@') ? 'อีเมลไม่ถูกต้อง' : undefined;

  return (
    <main className="mx-auto grid max-w-lg gap-6 px-6 py-10">
      <header>
        <h1 className="text-2xl font-bold">Component Composition</h1>
        <p className="mt-1 text-stone-600">
          Button · Input · Modal ด้วย <code>clsx</code> + <code>tailwind-merge</code>
        </p>
      </header>

      <Input
        label="อีเมล"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        error={error}
      />

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => setOpen(true)}>เปิด Modal</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger" size="sm">
          Danger
        </Button>
      </div>

      <Modal open={open} title="ยืนยันการส่ง" onClose={() => setOpen(false)}>
        <p className="mb-4 text-stone-600">
          จะส่งข้อมูลไปที่ <strong>{email || '—'}</strong>
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            ยกเลิก
          </Button>
          <Button onClick={() => setOpen(false)}>ยืนยัน</Button>
        </div>
      </Modal>
    </main>
  );
}
