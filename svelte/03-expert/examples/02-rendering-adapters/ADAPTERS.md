# Adapters ใน SvelteKit — คู่มือสั้น (ภาษาไทย)

ไฟล์นี้คู่กับ `svelte.config.js` ในตัวอย่างนี้

## adapter-auto (ค่าเริ่มต้น)

- ตรวจจับ host จาก CI/environment (เช่น Vercel, Netlify, Cloudflare)
- เหมาะตอน **เริ่ม project / workshop**
- ไม่ควรพึ่งเป็นคำตอบสุดท้ายของ production ที่ต้องการ deterministic deploy

```js
import adapter from '@sveltejs/adapter-auto';
kit: {
  adapter: adapter();
}
```

## adapter-node

- สร้าง Node.js server (`build/handler.js` หรือ script ตาม version)
- เหมาะกับ **Docker, VPS, PM2, Kubernetes**
- รองรับ SSR + Form Actions + `hooks.server.ts` เต็มรูปแบบ

```js
import adapter from '@sveltejs/adapter-node';
kit: {
  adapter: adapter({ out: 'build' });
}
```

## adapter-static

- สร้างไฟล์นิ่ง (HTML/CSS/JS) สำหรับ CDN
- ต้อง **prerender** หน้าให้ครบ หรือกำหนด `fallback` สำหรับ SPA
- **ไม่มี** Node runtime → `+page.server.ts` / server hooks ใช้บน host นี้ไม่ได้ (ยกเว้นมี API แยก)

```js
import adapter from '@sveltejs/adapter-static';
kit: {
  adapter: adapter({
    pages: 'build',
    assets: 'build',
    fallback: '200.html', // สำหรับเส้นทาง client-only
    precompress: false,
  });
}
```

## adapter-vercel

- ปรับ output ให้เข้ากับ Vercel Serverless / Edge
- ใช้เมื่อทีม deploy บน Vercel เป็นหลัก
- ยังใช้ SSR และ dynamic routes ได้ตามแพลนของ Vercel

```js
import adapter from '@sveltejs/adapter-vercel';
kit: {
  adapter: adapter();
}
```

## การเลือกแบบเร็ว

| คำถาม                              | คำตอบ                                |
| ---------------------------------- | ------------------------------------ |
| ไซต์เอกสาร / marketing ล้วน?       | `adapter-static` + prerender         |
| ต้องการ SSR + auth cookies บน VPS? | `adapter-node`                       |
| อยู่บน Vercel?                     | `adapter-vercel` หรือ `adapter-auto` |
| ยังไม่รู้ host?                    | `adapter-auto` ชั่วคราว              |

## กับกลยุทธ์เรนเดอร์ในตัวอย่างนี้

| Route            | กลยุทธ์                 | หมายเหตุกับ adapter                          |
| ---------------- | ----------------------- | -------------------------------------------- |
| `/marketing`     | `prerender = true`      | ทำงานได้ดีกับทุก adapter รวม static          |
| `/news`          | SSR + `+page.server.ts` | ต้องมี Node/serverless runtime               |
| `/app/dashboard` | `ssr = false`           | บน static ใช้กับ fallback; บน Node ยังรันได้ |

> สลับ adapter ใน `svelte.config.js` ด้วยการ uncomment แล้วรัน `npm run build` เพื่อดู output ที่ต่างกัน
