export default defineEventHandler((event) => {
  // Demo: อ่าน role จาก header ที่ client ส่งมา
  // Production จริงต้อง verify session/JWT ฝั่ง server
  const role = getHeader(event, 'x-demo-role');
  if (role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Admin only' });
  }
  return {
    users: 1280,
    revenue: 482_000,
    generatedAt: new Date().toISOString(),
  };
});
