import { auth } from './auth_DLZ7fYSi.mjs';

const ALL = async ({ request }) => {
  return auth.handler(request);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ALL
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
