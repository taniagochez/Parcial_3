import type { APIRoute } from 'astro';
import { db, User } from 'astro:db';

export const GET: APIRoute = async ({ locals }) => {
  const { user, isLoggedIn } = locals as any;

  if (!isLoggedIn || user?.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
  }

  const users = await db.select().from(User);
  return new Response(JSON.stringify(users), {
    headers: { 'Content-Type': 'application/json' },
  });
};