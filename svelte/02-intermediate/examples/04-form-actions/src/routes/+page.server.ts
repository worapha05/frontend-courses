import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { createTask, deleteTask, listTasks, toggleTask } from '$lib/server/tasks';

export const load: PageServerLoad = async () => {
  return { tasks: listTasks() };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const fd = await request.formData();
    const title = String(fd.get('title') ?? '').trim();

    if (!title) {
      return fail(400, { title, missing: true });
    }

    if (title.length < 3) {
      return fail(400, { title, tooShort: true });
    }

    createTask(title);
    return { success: true, action: 'create' as const };
  },

  toggle: async ({ request }) => {
    const fd = await request.formData();
    const id = String(fd.get('id') ?? '');
    const task = toggleTask(id);
    if (!task) {
      return fail(404, { message: 'ไม่พบงาน' });
    }
    return { success: true, action: 'toggle' as const };
  },

  delete: async ({ request }) => {
    const fd = await request.formData();
    const id = String(fd.get('id') ?? '');
    const ok = deleteTask(id);
    if (!ok) {
      return fail(404, { message: 'ไม่พบงาน' });
    }
    return { success: true, action: 'delete' as const };
  },
};
