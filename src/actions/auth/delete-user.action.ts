import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { db, eq, User } from 'astro:db';

export const deleteUser = defineAction({
  accept: 'form',
  input: z.object({
    id: z.string(),
  }),
  handler: async ({ id }) => {
    const existing = await db.select().from(User).where(eq(User.id, id));
    if (!existing.length) throw new Error('Usuario no encontrado');

    await db.delete(User).where(eq(User.id, id));

    return { success: true };
  },
});