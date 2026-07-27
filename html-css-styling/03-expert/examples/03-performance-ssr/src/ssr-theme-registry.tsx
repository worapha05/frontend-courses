/**
 * ตัวอย่างแนวคิดสำหรับ Next.js App Router + MUI
 * (อ้างอิง pattern — ปรับตามเวอร์ชัน @mui/material-nextjs ที่ทีมใช้)
 *
 * app/layout.tsx โดยประมาณ:
 *   <AppRouterCacheProvider>
 *     <ThemeProvider theme={theme}>
 *       <CssBaseline />
 *       {children}
 *     </ThemeProvider>
 *   </AppRouterCacheProvider>
 */

export const SSR_THEME_CHECKLIST = [
  'ใช้ cache provider ของ MUI สำหรับ App Router',
  'theme ถูกสร้างนอก render หรือ memo ให้เสถียร',
  'CssBaseline อยู่ภายใต้ ThemeProvider',
  'ไม่สุ่ม id ของ emotion คนละแบบระหว่าง server/client',
  'ทดสอบ production build เพื่อจับ hydration warning',
] as const;

export function assertSsrReady(flags: Record<string, boolean>) {
  const missing = SSR_THEME_CHECKLIST.filter((_, i) => {
    const key = [
      'cacheProvider',
      'stableTheme',
      'cssBaseline',
      'stableClassIds',
      'prodBuildTested',
    ][i];
    return !flags[key];
  });
  return { ok: missing.length === 0, missing };
}
