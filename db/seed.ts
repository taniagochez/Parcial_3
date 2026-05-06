import { db, Role, User, eq } from 'astro:db';
import { auth } from '../src/lib/auth';

export default async function seed() {
  const roles = [
    { id: 'admin', name: 'Administrador' },
    { id: 'user', name: 'Usuario del sistema' },
  ];

  await db.insert(Role).values(roles);

  const users = [
    // Admins con nombres reales
    { name: 'Admin',            email: 'admin@parcial.com',     password: '123456', role: 'admin', direccion: 'San Marcos' },
    { name: 'Eunice López',     email: 'eunice@parcial.com',    password: '123456', role: 'admin', direccion: 'Santa Tecla' },
    { name: 'Katherine de León',email: 'katherine@parcial.com', password: '123456', role: 'admin', direccion: 'Antiguo Cuscatlán' },
    { name: 'Tania Garay',      email: 'tania@parcial.com',     password: '123456', role: 'admin', direccion: 'Soyapango' },
    { name: 'Cristian Parada',  email: 'cristian@parcial.com',  password: '123456', role: 'admin', direccion: 'Apopa' },
    { name: 'Luis Mejía',       email: 'luis@parcial.com',      password: '123456', role: 'admin', direccion: 'Ilopango' },
    // Usuarios normales
    { name: 'Usuario',          email: 'user@parcial.com',      password: '123456', role: 'user',  direccion: 'Nejapa' },
    { name: 'Amanda Escoto',    email: 'amanda@parcial.com',    password: '123456', role: 'user',  direccion: 'Mejicanos' },
    { name: 'Carlos Rivas',     email: 'carlos@parcial.com',    password: '123456', role: 'user',  direccion: 'San Salvador' },
    { name: 'María Hernández',  email: 'maria@parcial.com',     password: '123456', role: 'user',  direccion: 'Cuscatancingo' },
    { name: 'Jorge Portillo',   email: 'jorge@parcial.com',     password: '123456', role: 'user',  direccion: 'Ciudad Delgado' },
    { name: 'Sofía Castillo',   email: 'sofia@parcial.com',     password: '123456', role: 'user',  direccion: 'San Martín' },
    { name: 'Diego Fuentes',    email: 'diego@parcial.com',     password: '123456', role: 'user',  direccion: 'Tonacatepeque' },
    { name: 'Valeria Morales',  email: 'valeria@parcial.com',   password: '123456', role: 'user',  direccion: 'Panchimalco' },
    { name: 'René Gutiérrez',   email: 'rene@parcial.com',      password: '123456', role: 'user',  direccion: 'Rosario de Mora' },
  ];

  for (const u of users) {
    await auth.api.signUpEmail({
      body: { name: u.name, email: u.email, password: u.password },
    });

    await db.update(User)
      .set({ role: u.role, direccion: u.direccion })
      .where(eq(User.email, u.email));
  }

  console.log('✅ Seed completado con 15 usuarios');
}