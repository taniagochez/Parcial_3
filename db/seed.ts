import { db, Role, User } from 'astro:db';
import { v4 as UUID } from "uuid";

export default async function seed() {
  const roles = [
    { id: 'admin', name: 'Administrador' },
    { id: 'user', name: 'Usuario del sistema' },
  ];

  const user1 = {
    id: UUID(),
    name: 'Admin',
    email: 'admin@parcial.com',
    direccion: 'San Marcos',
    password: null, 
    role: 'admin',
  };

  const user2 = {
    id: UUID(),
    name: 'Usuario',
    email: 'user@parcial.com',
    direccion: 'Nejapa',
    password: null,
    role: 'user',
  };

  await db.insert(Role).values(roles);
  await db.insert(User).values([user1, user2]);
}