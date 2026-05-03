import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

// Google se maneja directo desde el cliente con authClient.signIn.social
export const loginWithGoogle = defineAction({
  accept: 'json',
  input: z.any(),
  handler: async () => {
    return { ok: true };
  },
});