import { db, Role, User } from 'astro:db';
import { v4 as UUID} from "uuid";
import bcrypt from 'bcryptjs';

// https://astro.build/db/seed
export default async function seed() {
	// TODO
	const roles = [
		{id: 'admin', name : 'Administrador' },
		{id: 'user', name : 'Usuario del sistema' },
	];
	const user1 = {
		id : UUID(),
		name: 'Luis',
		email: 'luisamaya1518@gmail.com',
		password: bcrypt.hashSync('123456'),
		role: 'admin',
	};
	const user2 = {
		id : UUID(),
		name: 'Luis Fernando',
		email: 'wmejiaguidos23@gmail.com',
		password: bcrypt.hashSync('123456'),
		role: 'user',
	};

	await db.insert(Role).values(roles)
	await db.insert(User).values([user1, user2])
}
