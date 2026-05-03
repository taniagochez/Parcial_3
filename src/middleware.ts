import { defineMiddleware } from 'astro:middleware';
import { getSession } from 'auth-astro/server';

const privateRoutes = ['/protected'];
const notAuthenticatedRoutes = ['/login', '/register'];

export const onRequest = defineMiddleware(async ({ url, request, locals, redirect }, next) => {
  const session = await getSession(request);
  const user = session?.user;

  locals.isLoggedIn = !!session;

  if (user) {
    locals.user = {
      avatar: user.image ?? '',
      email: user.email ?? '',
      name: user.name ?? '',
      emailVerified: !!(user as any).emailVerified,
      role: (user as any).role ?? 'user',
    };
  }

  // Ruta privada sin sesión → redirige al home/login
  if (!session && privateRoutes.includes(url.pathname)) {
    return redirect('/login');
  }

  // Ya autenticado intentando ir a login/register → redirige
  if (session && notAuthenticatedRoutes.includes(url.pathname)) {
    return redirect('/protected');
  }

  return next();
});