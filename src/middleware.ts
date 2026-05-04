import { defineMiddleware } from 'astro:middleware';

const privateRoutes = ['/protected'];
const notAuthenticatedRoutes = ['/login', '/register'];

export const onRequest = defineMiddleware(async ({ url, request, locals, redirect }, next) => {
  const { auth } = await import('./lib/auth');
  
  const session = await auth.api.getSession({ headers: request.headers });

  locals.isLoggedIn = !!session;

  if (session?.user) {
    locals.user = {
      avatar: session.user.image ?? '',
      email: session.user.email,
      name: session.user.name,
      emailVerified: session.user.emailVerified,
      role: (session.user as any).role ?? 'user',
    } as any;
  }

  if (!session && privateRoutes.includes(url.pathname)) {
    return redirect('/login');
  }

  if (session && notAuthenticatedRoutes.includes(url.pathname)) {
    return redirect('/protected');
  }

  return next();
});