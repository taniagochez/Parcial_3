import { defineConfig } from 'astro/config';
import netlify from "@astrojs/netlify";
import db from "@astrojs/db";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [db()],
  output: "server",
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()]
  }
});