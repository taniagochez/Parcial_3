import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { db, eq, User } from 'astro:db';
import { v4 as UUID } from 'uuid';
import bcrypt from 'bcryptjs';

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
    const existingUser = existing.find(u => u.email === email);
    if (existingUser) {
      throw new Error('Ya existe un usuario con ese email');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: UUID(),
      name,
      email,
      password: hashedPassword,
      direccion: direccion ?? null,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(User).values(newUser);

    return { name, email };
  },
});