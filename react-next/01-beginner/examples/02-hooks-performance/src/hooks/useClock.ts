import { useEffect, useState } from 'react';

/** นาฬิกาที่ update ทุก `intervalMs` พร้อม cleanup ชัดเจน */
export function useClock(intervalMs = 1000): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  return now;
}
