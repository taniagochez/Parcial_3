import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { db, eq, User } from 'astro:db';
import { auth } from '../../lib/auth';

export const createUser = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    direccion: z.string().optional(),
    role: z.string().default('user'),
  }),
  handler: async ({ name, email, password, direccion, role }) => {
    // Verificar si el email ya existe
    const existing = await db.select().from(User).where(eq(User.email, email));
    if (existing.length) throw new Error('Ya existe un usuario con ese email');

    // Usar Better Auth para crear el usuario (hashea con scrypt)
    await auth.api.signUpEmail({
      body: { name, email, password },
    });

    // Actualizar rol y dirección que Better Auth no maneja
    await db.update(User)
      .set({ 
        role, 
        direccion: direccion ?? null,
        updatedAt: new Date(),
      })
      .where(eq(User.email, email));

    return { name, email };
  },
});