import { db, Role, User, eq } from 'astro:db';
import { auth } from '../src/lib/auth';

export default async function seed() {
  const roles = [
    { id: 'admin', name: 'Administrador' },
    { id: 'user', name: 'Usuario del sistema' },
  ];

  await db.insert(Role).values(roles);

  // Usar la API de Better Auth para que ella misma hashee con scrypt
  await auth.api.signUpEmail({
    body: {
      name: 'Admin',
      email: 'admin@parcial.com',
      password: '123456',
    },
  });

  await auth.api.signUpEmail({
    body: {
      name: 'Usuario',
      email: 'user@parcial.com',
      password: '123456',
    },
  });

  // Luego actualizar el rol del admin directamente en la DB
  // porque Better Auth asigna 'user' por defecto
  await db.update(User)
    .set({ role: 'admin', direccion: 'San Marcos' })
    .where(eq(User.email, 'admin@parcial.com'));

  await db.update(User)
    .set({ direccion: 'Nejapa' })
    .where(eq(User.email, 'user@parcial.com'));

  console.log('✅ Seed completado');
}