import { c as createComponent } from './astro-component_qX7jQV2U.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead } from './params-and-props_CgVkSr_h.mjs';
import { r as renderComponent } from './ssr-function_I1qGpvUG.mjs';
import { r as renderScript } from './script_tDPncAlc.mjs';
import { $ as $$AuthLayout } from './AuthLayout_C-hvBGCj.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": "login" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex justify-center self-center z-10"> <div class="p-12 bg-[#111118] mx-auto rounded-2xl w-100 border border-[#2a2a3d] shadow-2xl shadow-purple-950/40"> <div class="mb-4"> <h3 class="font-semibold text-2xl text-white">Ingresar</h3> </div> <form class="space-y-5"> <div class="space-y-2"> <label class="text-sm font-medium text-purple-300 tracking-wide">Email</label> <input class="w-full text-base px-4 py-2 bg-[#1a1a2e] border border-[#3b3b5c] text-white placeholder-[#555577] rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors" type="email" name="email" placeholder="mail@gmail.com"> </div> <div class="space-y-2"> <label class="mb-5 text-sm font-medium text-purple-300 tracking-wide">Password</label> <input class="w-full content-center text-base px-4 py-2 bg-[#1a1a2e] border border-[#3b3b5c] text-white placeholder-[#555577] rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors" type="password" name="password" placeholder="Enter your password"> </div> <div class="flex items-center justify-between"> <div class="flex items-center"> <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 accent-purple-500 border-[#3b3b5c] rounded"> <label for="remember_me" class="ml-2 block text-sm text-gray-400">Recuerdame</label> </div> <div class="text-sm"> <a href="/register" class="text-purple-400 hover:text-purple-300 transition-colors">¿No tienes cuenta?</a> </div> </div> <div> <button type="submit" id="btn-submit" class="w-full flex justify-center bg-purple-600 hover:bg-purple-500 disabled:bg-purple-900 disabled:text-purple-700 text-white p-3 rounded-full tracking-wide font-semibold shadow-lg shadow-purple-900/50 cursor-pointer transition ease-in duration-300">
Ingresar
</button> <div class="flex flex-1 w-full my-3 items-center gap-2"> <div class="w-full border-t border-[#2a2a3d]"></div> <span class="text-xs text-[#444466] whitespace-nowrap">o</span> <div class="w-full border-t border-[#2a2a3d]"></div> </div> <button type="button" id="btn-google" class="disabled:bg-[#1a1a2e] disabled:text-[#444466] w-full flex justify-center bg-[#1a1a2e] hover:bg-[#222240] border border-[#3b3b5c] hover:border-purple-600 text-gray-300 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-300">
Ingresar con Google
</button> </div> </form> <div class="pt-5 text-center text-[#444466] text-xs"> <span>Copyright © 2021-2022 <a href="https://codepen.io/uidesignhub" rel="" target="_blank" title="Ajimon" class="text-purple-700 hover:text-purple-500 transition-colors">AJI</a></span> </div> </div> </div> ` })} ${renderScript($$result, "D:/Proyectos/Parcial_3/src/pages/login.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Proyectos/Parcial_3/src/pages/login.astro", void 0);

const $$file = "D:/Proyectos/Parcial_3/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
