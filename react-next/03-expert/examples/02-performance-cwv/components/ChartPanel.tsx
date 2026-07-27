'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <p style={{ color: '#64748b' }}>กำลังโหลดกราฟ (code-split)...</p>,
  ssr: false,
});

export function ChartPanel() {
  const [open, setOpen] = useState(false);

  return (
    <section
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        padding: '1rem',
      }}
    >
      <h2 style={{ marginTop: 0 }}>Dynamic Import</h2>
      <button type="button" onClick={() => setOpen((v) => !v)}>
        {open ? 'ซ่อนกราฟ' : 'โหลดกราฟเมื่อต้องการ'}
      </button>
      <div style={{ marginTop: '1rem' }}>{open ? <HeavyChart /> : null}</div>
    </section>
  );
}
