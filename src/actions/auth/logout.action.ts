import { defineAction } from 'astro:actions';
import { auth } from '@/lib/auth';

export const logout = defineAction({
  accept: 'json',
  handler: async (_, { request }) => {
    await auth.api.signOut({ headers: request.headers });
    return { ok: true };
  },
});