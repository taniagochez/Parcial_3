import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { db, eq, User } from 'astro:db';

export const editUser = defineAction({
  accept: 'form',
  input: z.object({
    id: z.string(),
    name: z.string().min(1, 'El nombre es requerido'),
    email: z.string().email('Email inválido'),
    direccion: z.string().optional(),
    role: z.string().default('user'),
  }),
  handler: async ({ id, name, email, direccion, role }) => {
    const existing = await db.select().from(User).where(eq(User.id, id));
    if (!existing.length) throw new Error('Usuario no encontrado');

    await db.update(User)
      .set({ name, email, direccion: direccion ?? null, role, updatedAt: new Date() })
      .where(eq(User.id, id));

    return { name, email };
  },
});