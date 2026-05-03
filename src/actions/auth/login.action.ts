import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { auth } from '../../lib/auth';

export const loginUser = defineAction({
  accept: 'form',
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ email, password, remember_me }, context) => {
    const { cookies, request } = context;

    // Verificar credenciales con Better Auth
    const response = await auth.api.signInEmail({
      body: { email, password },
      headers: request.headers,
    });

    if (!response) {
      throw new Error('Credenciales incorrectas');
    }

    // Manejar cookie de "recuérdame"
    if (remember_me) {
      cookies.set('email', email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        path: '/',
      });
    } else {
      cookies.delete('email', { path: '/' });
    }

    return { success: true };
  },
});