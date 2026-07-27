import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** รวม class แบบมีเงื่อนไข แล้วยุบ utilities ที่ชนกัน */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
