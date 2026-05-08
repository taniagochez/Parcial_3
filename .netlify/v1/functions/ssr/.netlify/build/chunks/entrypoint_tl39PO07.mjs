import { p as pipelineSymbol, A as AstroError, a as ActionCalledFromServerError } from './params-and-props_CgVkSr_h.mjs';
import { c as createActionsProxy, d as defineAction } from './ssr-function_BJTbz0Ql.mjs';
import '@astrojs/internal-helpers/path';
import * as z from 'zod/v4';
import { auth as auth$1 } from './auth_DLZ7fYSi.mjs';
import { d as db, U as User, A as Account, S as Session } from './_astro_db_5sXTZHNR.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

createActionsProxy({
  handleAction: async (param, path, context) => {
    const pipeline = context ? Reflect.get(context, pipelineSymbol) : void 0;
    if (!pipeline) {
      throw new AstroError(ActionCalledFromServerError);
    }
    const action = await pipeline.getAction(path);
    if (!action) throw new Error(`Action not found: ${path}`);
    return action.bind(context)(param);
  }
});

const loginWithGoogle = defineAction({
  accept: "json",
  input: z.any(),
  handler: async () => {
    return { ok: true };
  }
});

const loginUser = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional()
  }),
  handler: async ({ email, password, remember_me }, context) => {
    const { cookies, request } = context;
    const response = await auth$1.api.signInEmail({
      body: { email, password },
      headers: request.headers
    });
    if (!response) {
      throw new Error("Credenciales incorrectas");
    }
    if (remember_me) {
      cookies.set("email", email, {
        expires: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 365),
        path: "/"
      });
    } else {
      cookies.delete("email", { path: "/" });
    }
    return { success: true };
  }
});

const logout = defineAction({
  accept: "json",
  handler: async (_, { request }) => {
    await auth$1.api.signOut({ headers: request.headers });
    return { ok: true };
  }
});

const registerUser = defineAction({
  accept: "form",
  input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional()
  }),
  handler: async ({ name, email, password, remember_me }, { cookies }) => {
    if (remember_me) {
      cookies.set("name", name, { expires: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 365), path: "/" });
      cookies.set("email", email, { expires: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 365), path: "/" });
    } else {
      cookies.delete("email", { path: "/" });
      cookies.delete("name", { path: "/" });
    }
    const result = await auth$1.api.signUpEmail({
      body: { name, email, password }
    });
    if (!result) throw new Error("Error al crear la cuenta");
    return {
      success: true,
      message: `¡Bienvenido ${name}! Tu cuenta ha sido creada.`
    };
  }
});

const createUser = defineAction({
  accept: "form",
  input: z.object({
    name: z.string().min(1, "El nombre es requerido"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    direccion: z.string().optional(),
    role: z.string().default("user")
  }),
  handler: async ({ name, email, password, direccion, role }) => {
    const existing = await db.select().from(User).where(eq(User.email, email));
    if (existing.length) throw new Error("Ya existe un usuario con ese email");
    await auth$1.api.signUpEmail({
      body: { name, email, password }
    });
    await db.update(User).set({
      role,
      direccion: direccion ?? null,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(User.email, email));
    return { name, email };
  }
});

const editUser = defineAction({
  accept: "form",
  input: z.object({
    id: z.string(),
    name: z.string().min(1, "El nombre es requerido"),
    email: z.string().email("Email inválido"),
    direccion: z.string().optional(),
    role: z.string().default("user")
  }),
  handler: async ({ id, name, email, direccion, role }) => {
    const existing = await db.select().from(User).where(eq(User.id, id));
    if (!existing.length) throw new Error("Usuario no encontrado");
    await db.update(User).set({ name, email, direccion: direccion ?? null, role, updatedAt: /* @__PURE__ */ new Date() }).where(eq(User.id, id));
    return { name, email };
  }
});

const deleteUser = defineAction({
  accept: "form",
  input: z.object({
    id: z.string()
  }),
  handler: async ({ id }) => {
    const existing = await db.select().from(User).where(eq(User.id, id));
    if (!existing.length) throw new Error("Usuario no encontrado");
    await db.delete(Account).where(eq(Account.userId, id));
    await db.delete(Session).where(eq(Session.userId, id));
    await db.delete(User).where(eq(User.id, id));
    return { success: true };
  }
});

const auth = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  createUser,
  deleteUser,
  editUser,
  loginUser,
  loginWithGoogle,
  logout,
  registerUser
}, Symbol.toStringTag, { value: 'Module' }));

const server = {
  // actions
  // Auth
  registerUser,
  logout,
  loginUser,
  loginWithGoogle,
  auth,
  editUser,
  deleteUser
};

export { server };
