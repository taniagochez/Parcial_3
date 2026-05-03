// auth.config.ts
import { defineConfig } from 'auth-astro';
import Google from '@auth/core/providers/google';
import Credentials from '@auth/core/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db, User } from 'astro:db';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export default defineConfig({
  adapter: DrizzleAdapter(db),
  providers: [
    // Login con Google
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),

    // Login con email y password
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const users = await db
          .select()
          .from(User)
          .where(eq(User.email, credentials.email as string));

        const user = users[0];
        if (!user || !user.password) return null;

        const passwordMatch = bcrypt.compareSync(
          credentials.password as string,
          user.password
        );

        if (!passwordMatch) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',   // tu página de login personalizada
    error: '/login',
  },
});