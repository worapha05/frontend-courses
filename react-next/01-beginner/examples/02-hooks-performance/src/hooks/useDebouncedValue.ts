import { useEffect, useState } from 'react';

/** คืนค่าที่ “นิ่ง” หลังผู้ใช้หยุดพิมพ์เป็นเวลา delayMs */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(id);
  }, [value, delayMs]);

  return debounced;
}
