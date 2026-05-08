import { db, Role, User, eq } from 'astro:db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

// Usar process.env en lugar de import.meta.env
const seedAuth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema: { user: User },
  }),
  secret: process.env.BETTER_AUTH_SECRET ?? 'mi_clave_super_secreta_12345',
  baseURL: process.env.BETTER_AUTH_URL ?? 'https://parcial3equipo1uls.netlify.app',
  emailAndPassword: { enabled: true, minPasswordLength: 6 },
  user: {
    additionalFields: {
      role: { type: 'string', defaultValue: 'user', required: false },
      direccion: { type: 'string', required: false },
    },
  },
});

export default async function seed() {
  const roles = [
    { id: 'admin', name: 'Administrador' },
    { id: 'user', name: 'Usuario del sistema' },
  ];

  await db.insert(Role).values(roles).onConflictDoNothing();

  const users = [
    { name: 'Admin', email: 'admin@parcial.com', password: '123456', role: 'admin', direccion: 'San Marcos' },
    { name: 'Eunice López', email: 'eunice@parcial.com', password: '123456', role: 'admin', direccion: 'Santa Tecla' },
    { name: 'Katherine de León', email: 'katherine@parcial.com', password: '123456', role: 'admin', direccion: 'Antiguo Cuscatlán' },
    { name: 'Tania Garay', email: 'tania@parcial.com', password: '123456', role: 'admin', direccion: 'Soyapango' },
    { name: 'Cristian Parada', email: 'cristian@parcial.com', password: '123456', role: 'admin', direccion: 'Apopa' },
    { name: 'Luis Mejía', email: 'luis@parcial.com', password: '123456', role: 'admin', direccion: 'Ilopango' },
    { name: 'Usuario', email: 'user@parcial.com', password: '123456', role: 'user', direccion: 'Nejapa' },
    { name: 'Amanda Escoto', email: 'amanda@parcial.com', password: '123456', role: 'user', direccion: 'Mejicanos' },
    { name: 'Carlos Rivas', email: 'carlos@parcial.com', password: '123456', role: 'user', direccion: 'San Salvador' },
    { name: 'María Hernández', email: 'maria@parcial.com', password: '123456', role: 'user', direccion: 'Cuscatancingo' },
    { name: 'Jorge Portillo', email: 'jorge@parcial.com', password: '123456', role: 'user', direccion: 'Ciudad Delgado' },
    { name: 'Sofía Castillo', email: 'sofia@parcial.com', password: '123456', role: 'user', direccion: 'San Martín' },
    { name: 'Diego Fuentes', email: 'diego@parcial.com', password: '123456', role: 'user', direccion: 'Tonacatepeque' },
    { name: 'Valeria Morales', email: 'valeria@parcial.com', password: '123456', role: 'user', direccion: 'Panchimalco' },
    { name: 'René Gutiérrez', email: 'rene@parcial.com', password: '123456', role: 'user', direccion: 'Rosario de Mora' },
  ];

  for (const u of users) {
    await seedAuth.api.signUpEmail({
      body: { name: u.name, email: u.email, password: u.password },
    }).catch(() => console.log(`Usuario ${u.email} ya existe, saltando...`));

    await db.update(User)
      .set({ role: u.role, direccion: u.direccion, emailVerified: Date.now(), })
      .where(eq(User.email, u.email));
  }

  console.log(' Seed completado con 15 usuarios');
}