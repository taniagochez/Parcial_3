import { c as createComponent } from './astro-component_qX7jQV2U.mjs';
import 'piccolore';
import { z as maybeRenderHead, Q as renderTemplate, a3 as addAttribute, b4 as renderHead, C as renderSlot } from './params-and-props_CgVkSr_h.mjs';
import { r as renderComponent } from './ssr-function_BJTbz0Ql.mjs';
import 'clsx';
import { r as renderScript } from './base_DXlYV7mF.mjs';

const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Navbar;
  const { isLoggedIn, user } = Astro2.locals;
  const isAdmin = user && user.role === "admin";
  return renderTemplate`${maybeRenderHead()}<nav class="flex justify-between px-20 py-5 items-center bg-white shadow-sm"> <h1 class="text-xl text-gray-800 font-bold">Astro Auth</h1> <div class="flex items-center gap-6"> <!-- Info del usuario logueado --> ${isLoggedIn && renderTemplate`<div class="text-right text-sm"> <p class="font-semibold text-gray-800">${user?.name}</p> <p class="text-gray-500 text-xs">${user?.role} — ${user?.email}</p> </div>`} <ul class="flex items-center space-x-6"> <li class="font-semibold text-gray-700"> <a href="/">Home</a> </li> ${isAdmin && renderTemplate`<li class="font-semibold text-gray-700"> <a href="/admin" class="text-green-600 hover:text-green-700">Admin</a> </li>`} ${!isLoggedIn ? renderTemplate`<li class="font-semibold text-gray-700"> <a href="/login">Ingresar</a> </li>` : renderTemplate`<li id="logout" class="font-semibold text-gray-700 cursor-pointer hover:text-red-500"> <a href="#">Salir</a> </li>`} </ul> </div> </nav> ${renderScript($$result, "D:/Proyectos/Parcial_3/src/components/shared/Navbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Proyectos/Parcial_3/src/components/shared/Navbar.astro", void 0);

const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title = "Auth Astro App" } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderComponent($$result, "Navbar", $$Navbar, {})} <main class="container m-auto max-w-3xl px-5"> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "D:/Proyectos/Parcial_3/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $ };
