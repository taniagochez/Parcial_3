// db/config.ts
import { column, defineDb, defineTable } from 'astro:db';

export const Role = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
  },
});

export const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text({ optional: true }),
    email: column.text({ unique: true }),
    emailVerified: column.date({ optional: true }),
    password: column.text({ optional: true }), // para login email/password
    image: column.text({ optional: true }),
    role: column.text({ references: () => Role.columns.id, default: 'user' }),
    createdAt: column.date({ default: new Date() }),
  },
});

// Tablas requeridas por Auth.js
export const Account = defineTable({
  columns: {
    userId: column.text({ references: () => User.columns.id }),
    type: column.text(),
    provider: column.text(),
    providerAccountId: column.text(),
    refresh_token: column.text({ optional: true }),
    access_token: column.text({ optional: true }),
    expires_at: column.number({ optional: true }),
    token_type: column.text({ optional: true }),
    scope: column.text({ optional: true }),
    id_token: column.text({ optional: true }),
    session_state: column.text({ optional: true }),
  },
});

export const Session = defineTable({
  columns: {
    sessionToken: column.text({ primaryKey: true }),
    userId: column.text({ references: () => User.columns.id }),
    expires: column.date(),
  },
});

export const VerificationToken = defineTable({
  columns: {
    identifier: column.text(),
    token: column.text(),
    expires: column.date(),
  },
});

export default defineDb({
  tables: { Role, User, Account, Session, VerificationToken },
});