export default defineEventHandler(() => {
  return {
    message: 'Hello from Nitro server/api/hello.ts',
    at: new Date().toISOString(),
  };
});
