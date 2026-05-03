import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { auth } from '@/lib/auth';

export const registerUser = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ name, email, password, remember_me }, { cookies }) => {
    if (remember_me) {
      cookies.set('name', name, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), path: '/' });
      cookies.set('email', email, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), path: '/' });
    } else {
      cookies.delete('email', { path: '/' });
      cookies.delete('name', { path: '/' });
    }

    const result = await auth.api.signUpEmail({
      body: { name, email, password },
    });

    if (!result) throw new Error('Error al crear la cuenta');

    return {
      success: true,
      message: `¡Bienvenido ${name}! Tu cuenta ha sido creada.`,
    };
  },
});