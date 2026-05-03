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
<<<<<<< HEAD
		direccion: 'San Marcos',
=======
>>>>>>> 185f928c8736297284b556e13f867da641738b7b
		password: bcrypt.hashSync('123456'),
		role: 'admin',
	};
	const user2 = {
		id : UUID(),
		name: 'Luis Fernando',
		email: 'wmejiaguidos23@gmail.com',
<<<<<<< HEAD
		direccion: 'Nejapa',
=======
>>>>>>> 185f928c8736297284b556e13f867da641738b7b
		password: bcrypt.hashSync('123456'),
		role: 'user',
	};

	await db.insert(Role).values(roles)
	await db.insert(User).values([user1, user2])
}
