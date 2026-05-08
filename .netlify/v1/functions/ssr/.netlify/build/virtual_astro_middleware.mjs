import { e as defineMiddleware, ad as sequence } from './chunks/params-and-props_CgVkSr_h.mjs';
import '@astrojs/internal-helpers/path';
import 'piccolore';
import 'clsx';
import '@astrojs/internal-helpers/object';

const privateRoutes = ["/protected"];
const notAuthenticatedRoutes = ["/login", "/register"];
const onRequest$1 = defineMiddleware(async ({ url, request, locals, redirect }, next) => {
  const { auth } = await import('./chunks/auth_DLZ7fYSi.mjs');
  const session = await auth.api.getSession({ headers: request.headers });
  locals.isLoggedIn = !!session;
  if (session?.user) {
    locals.user = {
      avatar: session.user.image ?? "",
      email: session.user.email,
      name: session.user.name,
      emailVerified: session.user.emailVerified,
      role: session.user.role ?? "user"
    };
  }
  if (!session && privateRoutes.includes(url.pathname)) {
    return redirect("/login");
  }
  if (session && notAuthenticatedRoutes.includes(url.pathname)) {
    return redirect("/protected");
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
