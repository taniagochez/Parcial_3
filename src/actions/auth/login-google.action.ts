import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

// Con Auth.js, Google se maneja directo desde el cliente
// Esta action ya no hace lógica de Firebase, solo es un proxy
export const loginWithGoogle = defineAction({
  accept: 'json',
  input: z.any(),
  handler: async () => {
    // El signIn con Google se dispara desde el cliente con auth-astro
    // Ver nota abajo sobre cómo llamarlo desde el frontend
    return { ok: true };
  },
});