/**
 * ป้องกัน flash + hydration mismatch จาก dark mode
 *
 * วิธีที่แนะนำ:
 * 1) เก็บ preference ใน cookie ที่ server อ่านได้
 * 2) หรือใส่ inline script เล็ก ๆ ใน <head> ก่อน paint เพื่อตั้ง class บน <html>
 * 3) อย่าใช้ useEffect อย่างเดียวเป็นแหล่งความจริงของ theme แรก — จะวูบ
 */

export const antiFlashScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (preferDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (_) {}
})();
`;

/** ใช้ใน Next.js: <Script id="theme-init" strategy="beforeInteractive">{antiFlashScript}</Script> */
export function describeNoFlashStrategy() {
  return {
    serverReadable: 'cookie',
    clientBeforePaint: 'inline script in head',
    avoid: 'useEffect-only theme bootstrap',
  };
}
