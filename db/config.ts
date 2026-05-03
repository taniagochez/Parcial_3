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
    password: column.text({ optional: true }),
    image: column.text({ optional: true }),
    direccion: column.text({ optional: true }),
    role: column.text({ references: () => Role.columns.id, default: 'user' }),
    createdAt: column.date({ default: new Date() }),
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
    idToken: column.text({ optional: true }),
    accessTokenExpiresAt: column.date({ optional: true }),
    refreshTokenExpiresAt: column.date({ optional: true }),
    scope: column.text({ optional: true }),
    expiresAt: column.date({ optional: true }),
    password: column.text({ optional: true }),
    createdAt: column.date({ optional: true }),
    updatedAt: column.date({ optional: true }),
  },
});

export const Session = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    userId: column.text({ references: () => User.columns.id }),
    token: column.text({ unique: true }),
    expiresAt: column.date(),
    ipAddress: column.text({ optional: true }),
    userAgent: column.text({ optional: true }),
    createdAt: column.date({ optional: true }),
    updatedAt: column.date({ optional: true }),
  },
});

export const Verification = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    identifier: column.text(),
    value: column.text(),
    expiresAt: column.date(),
    createdAt: column.date({ optional: true }),
    updatedAt: column.date({ optional: true }),
  },
});

export default defineDb({
  tables: { Role, User, Account, Session, Verification },
});