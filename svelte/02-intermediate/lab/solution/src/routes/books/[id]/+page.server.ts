import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getBook } from '$lib/server/books';

export const load: PageServerLoad = async ({ params }) => {
  const book = getBook(params.id);
  if (!book) {
    error(404, 'ไม่พบหนังสือเล่มนี้');
  }
  return { book };
};
