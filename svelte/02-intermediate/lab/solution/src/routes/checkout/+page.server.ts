import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { placeOrder, type OrderItem } from '$lib/server/orders';

function parseItems(raw: FormDataEntryValue | null): OrderItem[] {
  if (!raw || typeof raw !== 'string') return [];
  try {
    const parsed = JSON.parse(raw) as OrderItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i) =>
        typeof i?.id === 'string' &&
        typeof i?.title === 'string' &&
        typeof i?.price === 'number' &&
        typeof i?.qty === 'number' &&
        i.qty > 0,
    );
  } catch {
    return [];
  }
}

export const actions: Actions = {
  place: async ({ request }) => {
    const fd = await request.formData();
    const name = String(fd.get('name') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const items = parseItems(fd.get('items'));

    const errors: { name?: string; email?: string; items?: string } = {};

    if (!name) errors.name = 'กรุณากรอกชื่อ';
    if (!email) {
      errors.email = 'กรุณากรอกอีเมล';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    }
    if (items.length === 0) {
      errors.items = 'ตะกร้าว่าง ไม่สามารถสั่งซื้อได้';
    }

    if (errors.name || errors.email || errors.items) {
      return fail(400, { name, email, errors });
    }

    const order = placeOrder({ name, email, items });
    return {
      success: true,
      orderId: order.id,
      total: order.total,
    };
  },
};
