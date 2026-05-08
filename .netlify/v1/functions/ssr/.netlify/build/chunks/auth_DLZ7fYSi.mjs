import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { d as db, V as Verification, A as Account, S as Session, U as User } from './_astro_db_5sXTZHNR.mjs';

const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: User,
      session: Session,
      account: Account,
      verification: Verification
    }
  }),
  secret: "mi_clave_super_secreta_12345",
  baseURL: "https://equipo1parcial3.netlify.app",
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6
  },
  socialProviders: {
    google: {
      clientId: "50735340681-4ai8e9vm5cb3bpcdj19md3la9b2oq8c2.apps.googleusercontent.com",
      clientSecret: "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"
    }
  },
  // 👇 Esto le dice a Better Auth que incluya el campo role en la sesión
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        required: false
      },
      direccion: {
        type: "string",
        required: false
      }
    }
  }
});

export { auth };
