<<<<<<< HEAD
=======
// db/config.ts
>>>>>>> 185f928c8736297284b556e13f867da641738b7b
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
<<<<<<< HEAD
    name: column.text(),
    email: column.text({ unique: true }),
    emailVerified: column.boolean({ default: false }),
    password: column.text({ optional: true }),
    image: column.text({ optional: true }),
    role: column.text({ default: 'user' }),
    createdAt: column.date({ default: new Date() }),
    updatedAt: column.date({ default: new Date() }),
=======
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
>>>>>>> 185f928c8736297284b556e13f867da641738b7b
  },
});

export const Session = defineTable({
  columns: {
<<<<<<< HEAD
    id: column.text({ primaryKey: true }),
    userId: column.text({ references: () => User.columns.id }),
    token: column.text({ unique: true }),
    expiresAt: column.date(),
    ipAddress: column.text({ optional: true }),
    userAgent: column.text({ optional: true }),
    createdAt: column.date({ default: new Date() }),
    updatedAt: column.date({ default: new Date() }),
  },
});

export const Account = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    userId: column.text({ references: () => User.columns.id }),
    accountId: column.text(),
    providerId: column.text(),
    accessToken: column.text({ optional: true }),
    refreshToken: column.text({ optional: true }),
    expiresAt: column.date({ optional: true }),
    password: column.text({ optional: true }),
    createdAt: column.date({ default: new Date() }),
    updatedAt: column.date({ default: new Date() }),
  },
});

export const Verification = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    identifier: column.text(),
    value: column.text(),
    expiresAt: column.date(),
    createdAt: column.date({ default: new Date() }),
    updatedAt: column.date({ default: new Date() }),
=======
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
>>>>>>> 185f928c8736297284b556e13f867da641738b7b
  },
});

export default defineDb({
<<<<<<< HEAD
  tables: { Role, User, Session, Account, Verification },
=======
  tables: { Role, User, Account, Session, VerificationToken },
>>>>>>> 185f928c8736297284b556e13f867da641738b7b
});