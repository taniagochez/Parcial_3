import './base_DXlYV7mF.mjs';
import { c as createComponent } from './astro-component_qX7jQV2U.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead } from './params-and-props_CgVkSr_h.mjs';
import { r as renderComponent } from './ssr-function_BJTbz0Ql.mjs';
import { $ as $$MainLayout } from './MainLayout_B4GdXu5U.mjs';
import { $ as $$Image } from './_astro_assets_Be9mZxm3.mjs';

const $$Protected = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Protected;
  const { user, isLoggedIn } = Astro2.locals;
  if (!isLoggedIn || !user) {
    return Astro2.redirect("/login");
  }
  const { avatar, email, emailVerified, name } = user;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="bg-gray-200 rounded-xl font-sans h-[600px] w-full flex flex-row justify-center items-center"> <div class="card w-96 mx-auto bg-white shadow-xl hover:shadow rounded"> ${avatar ? renderTemplate`${renderComponent($$result2, "Image", $$Image, { "class": "w-32 mx-auto rounded-full -mt-20 border-8 border-white", "src": avatar, "alt": `Avatar de ${name}`, "height": 128, "width": 128 })}` : renderTemplate`<div class="w-32 h-32 mx-auto rounded-full -mt-20 border-8 border-white bg-gray-300 flex justify-center items-center"> <span class="text-white text-3xl font-extrabold"> ${name.substring(0, 2)} </span> </div>`} <div class="text-center mt-2 text-3xl font-medium">${name}</div> <div class="text-center mt-2 font-light text-sm">${email}</div> <div class="text-center font-normal text-lg"> ${emailVerified ? "Email verificado" : "Email no verificado"} </div> <hr class="mt-8"> </div> </div> ` })}`;
}, "D:/Proyectos/Parcial_3/src/pages/protected.astro", void 0);

const $$file = "D:/Proyectos/Parcial_3/src/pages/protected.astro";
const $$url = "/protected";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Protected,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
