import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { db, User } from 'astro:db';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { signIn } from 'auth-astro/client';

export const loginUser = defineAction({
  accept: 'form',
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ email, password, remember_me }, { cookies }) => {
    // Cookies (igual que antes)
    if (remember_me) {
      cookies.set('email', email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        path: '/',
      });
    } else {
      cookies.delete('email', { path: '/' });
    }

    // Verificar usuario en AstroDB
    const users = await db.select().from(User).where(eq(User.email, email));
    const user = users[0];

    if (!user || !user.password) {
      throw new Error('No existe una cuenta con este email');
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      throw new Error('Email o contraseña incorrectos');
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  },
});