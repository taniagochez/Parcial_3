import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { db, User } from 'astro:db';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { v4 as UUID } from 'uuid';

export const registerUser = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ name, email, password, remember_me }, { cookies }) => {
    // Cookies (igual que antes)
    if (remember_me) {
      cookies.set('name', name, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        path: '/',
      });
      cookies.set('email', email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        path: '/',
      });
    } else {
      cookies.delete('email', { path: '/' });
      cookies.delete('name', { path: '/' });
    }

    // Verificar si ya existe
    const existing = await db.select().from(User).where(eq(User.email, email));
    if (existing.length > 0) {
      throw new Error('El correo ya está en uso');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    await db.insert(User).values({
      id: UUID(),
      name,
      email,
      password: hashedPassword,
      role: 'user',
    });

    return {
      success: true,
      message: `¡Bienvenido ${name}! Tu cuenta ha sido creada exitosamente.`,
      user: { email, name },
    };
  },
});