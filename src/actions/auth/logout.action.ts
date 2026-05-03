import { defineAction } from 'astro:actions';
import { signOut } from 'auth-astro/server';

export const logout = defineAction({
  accept: 'json',
  handler: async (_, { request }) => {
    await signOut(request, { redirect: false });
    return { ok: true };
  },
});