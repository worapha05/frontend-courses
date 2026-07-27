'use client';

/**
 * คอมโพเนนต์ “หนัก” จำลอง — ในโปรดักชันอาจเป็น chart library
 * โหลดผ่าน next/dynamic เพื่อไม่บล็อก LCP ของหน้าแรก
 */
export default function HeavyChart() {
  const bars = [40, 70, 55, 90, 35, 80, 60];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 8,
        height: 160,
        padding: '1rem',
        background: '#0f172a',
        borderRadius: 8,
      }}
      aria-label="ตัวอย่างกราฟ"
    >
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${h}%`,
            background: 'linear-gradient(180deg, #2dd4bf, #0f766e)',
            borderRadius: 4,
          }}
        />
      ))}
    </div>
  );
}
