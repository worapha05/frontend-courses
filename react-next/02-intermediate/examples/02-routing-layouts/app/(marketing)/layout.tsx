export default function MarketingLayout({ children }: { children: React.ReactNode }) {

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1rem' }}>
      <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
        Route group <code>(marketing)</code> — ไม่ปรากฏใน URL แต่แยก layout ได้
      </p>
      {children}
    </div>
  );
}
