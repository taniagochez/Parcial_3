import { r as renderScript } from './base_DXlYV7mF.mjs';
import { c as createComponent } from './astro-component_qX7jQV2U.mjs';
import 'piccolore';
import { a3 as addAttribute, Q as renderTemplate, z as maybeRenderHead } from './params-and-props_CgVkSr_h.mjs';
import { r as renderComponent } from './ssr-function_BJTbz0Ql.mjs';
import { $ as $$MainLayout } from './MainLayout_B4GdXu5U.mjs';
import { d as db, U as User, R as Role } from './_astro_db_5sXTZHNR.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const { user, isLoggedIn } = Astro2.locals;
  if (!isLoggedIn || user?.role !== "admin") {
    return Astro2.redirect("/login");
  }
  const PAGE_SIZE = 5;
  const pageParam = Astro2.url.searchParams.get("page");
  const currentPage = Math.max(1, parseInt(pageParam ?? "1"));
  const allUsers = await db.select().from(User);
  const roles = await db.select().from(Role);
  const roleMap = Object.fromEntries(roles.map((r) => [r.id, r.name]));
  const totalUsers = allUsers.length;
  const totalPages = Math.ceil(totalUsers / PAGE_SIZE);
  const paginatedUsers = allUsers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const adminCount = allUsers.filter((u) => u.role === "admin").length;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Panel Admin" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="py-8"> <!-- Stats --> <div class="grid grid-cols-3 gap-4 mb-6"> <div class="bg-white rounded-xl shadow p-4 text-center"> <p class="text-sm text-gray-500">Total usuarios</p> <p class="text-3xl font-bold text-gray-800">${totalUsers}</p> </div> <div class="bg-white rounded-xl shadow p-4 text-center"> <p class="text-sm text-gray-500">Admins</p> <p class="text-3xl font-bold text-gray-800">${adminCount}</p> </div> <div class="bg-white rounded-xl shadow p-4 text-center"> <p class="text-sm text-gray-500">Página actual</p> <p class="text-3xl font-bold text-gray-800">${currentPage}/${totalPages}</p> </div> </div> <!-- Filtros + Botones --> <div class="flex flex-wrap items-center gap-3 mb-4"> <input id="filter-name" type="text" placeholder="Buscar por nombre..." class="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-48"> <select id="filter-role" class="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"> <option value="">Todos los roles</option> ${roles.map((r) => renderTemplate`<option${addAttribute(r.id, "value")}>${r.name}</option>`)} </select> <div class="flex gap-3 ml-auto"> <button id="btn-download-pdf" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition">
PDF
</button> <button id="btn-open-modal" class="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition">
+ Agregar usuario
</button> </div> </div> <!-- Tabla de usuarios --> <div class="bg-white rounded-xl shadow overflow-hidden"> <table id="users-table" class="w-full text-sm"> <thead class="bg-gray-100 text-gray-600 uppercase text-xs"> <tr> <th class="px-4 py-3 text-left">#</th> <th class="px-4 py-3 text-left">Nombre</th> <th class="px-4 py-3 text-left">Email</th> <th class="px-4 py-3 text-left">Rol</th> <th class="px-4 py-3 text-left">Creado</th> <th class="px-4 py-3 text-left">Acciones</th> </tr> </thead> <tbody> ${paginatedUsers.map((u, i) => renderTemplate`<tr class="border-t hover:bg-gray-50"> <td class="px-4 py-3 text-gray-500">${(currentPage - 1) * PAGE_SIZE + i + 1}</td> <td class="px-4 py-3 font-medium text-gray-800">${u.name ?? "—"}</td> <td class="px-4 py-3 text-gray-600">${u.email}</td> <td class="px-4 py-3"> <span${addAttribute(u.role === "admin" ? "px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700" : "px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600", "class")}> ${roleMap[u.role] ?? u.role} </span> </td> <td class="px-4 py-3 text-gray-500"> ${u.createdAt ? new Date(u.createdAt).toLocaleDateString("es-SV") : "—"} </td> <td class="px-4 py-3"> <div class="flex gap-2"> <button class="btn-edit bg-yellow-400 text-white text-xs px-3 py-1 rounded hover:bg-yellow-500"${addAttribute(u.id, "data-id")}${addAttribute(u.name ?? "", "data-name")}${addAttribute(u.email, "data-email")}${addAttribute(u.direccion ?? "", "data-direccion")}${addAttribute(u.role, "data-role")}>
Editar
</button> <button class="btn-delete bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"${addAttribute(u.id, "data-id")}${addAttribute(u.name ?? "", "data-name")}>
Eliminar
</button> </div> </td> </tr>`)} </tbody> </table> <!-- Footer tabla --> <div class="px-4 py-3 text-xs text-gray-500 border-t">
Mostrando ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, totalUsers)} de ${totalUsers} usuarios
</div> </div> <!-- Paginación --> <div class="flex justify-center items-center gap-2 mt-6"> ${currentPage > 1 && renderTemplate`<a${addAttribute("/admin?page=" + (currentPage - 1), "href")} class="px-3 py-1 border rounded hover:bg-gray-100">&#8249;</a>`} ${Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
    const isActive = p === currentPage;
    const cls = isActive ? "px-3 py-1 border rounded bg-green-600 text-white border-green-600" : "px-3 py-1 border rounded hover:bg-gray-100";
    return renderTemplate`<a${addAttribute("/admin?page=" + p, "href")}${addAttribute(cls, "class")}>${p}</a>`;
  })} ${currentPage < totalPages && renderTemplate`<a${addAttribute("/admin?page=" + (currentPage + 1), "href")} class="px-3 py-1 border rounded hover:bg-gray-100">&#8250;</a>`} </div> </div> ` })} <!-- Modal Crear Usuario --> <div id="modal" class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center"> <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"> <h2 class="text-xl font-bold text-gray-800 mb-4">Agregar usuario</h2> <form id="form-crear" class="space-y-4"> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label> <input type="text" name="name" required class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="John Doe"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Email</label> <input type="email" name="email" required class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="correo@ejemplo.com"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label> <input type="password" name="password" required class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="••••••••"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Dirección</label> <input type="text" name="direccion" class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="San Salvador"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Rol</label> <select name="role" class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"> ${roles.map((r) => renderTemplate`<option${addAttribute(r.id, "value")}>${r.name}</option>`)} </select> </div> <div id="form-error" class="text-red-500 text-sm hidden"></div> <div class="flex justify-end gap-3 pt-2"> <button type="button" id="btn-close-modal" class="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">
Cancelar
</button> <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700">
Guardar
</button> </div> </form> </div> </div> <!-- Modal Editar Usuario --> <div id="modal-edit" class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center"> <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"> <h2 class="text-xl font-bold text-gray-800 mb-4">Editar usuario</h2> <form id="form-edit" class="space-y-4"> <input type="hidden" name="id" id="edit-id"> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label> <input type="text" name="name" id="edit-name" required class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Email</label> <input type="email" name="email" id="edit-email" required class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Dirección</label> <input type="text" name="direccion" id="edit-direccion" class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"> </div> <div> <label class="block text-sm font-medium text-gray-700 mb-1">Rol</label> <select name="role" id="edit-role" class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"> ${roles.map((r) => renderTemplate`<option${addAttribute(r.id, "value")}>${r.name}</option>`)} </select> </div> <div id="edit-error" class="text-red-500 text-sm hidden"></div> <div class="flex justify-end gap-3 pt-2"> <button type="button" id="btn-close-edit" class="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">Cancelar</button> <button type="submit" class="px-4 py-2 bg-yellow-400 text-white rounded-lg text-sm font-semibold hover:bg-yellow-500">Guardar</button> </div> </form> </div> </div> <!-- jsPDF --> ${renderScript($$result, "D:/Proyectos/Parcial_3/src/pages/admin/index.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "D:/Proyectos/Parcial_3/src/pages/admin/index.astro?astro&type=script&index=1&lang.ts")} ${renderScript($$result, "D:/Proyectos/Parcial_3/src/pages/admin/index.astro?astro&type=script&index=2&lang.ts")}`;
}, "D:/Proyectos/Parcial_3/src/pages/admin/index.astro", void 0);

const $$file = "D:/Proyectos/Parcial_3/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
