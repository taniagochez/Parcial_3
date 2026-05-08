import { c as createComponent } from './astro-component_qX7jQV2U.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead } from './params-and-props_CgVkSr_h.mjs';
import { r as renderComponent } from './ssr-function_I1qGpvUG.mjs';
import { $ as $$MainLayout } from './MainLayout_Hb2OyVvR.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-3xl">Home Page</h1> ` })}`;
}, "D:/Proyectos/Parcial_3/src/pages/index.astro", void 0);

const $$file = "D:/Proyectos/Parcial_3/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
