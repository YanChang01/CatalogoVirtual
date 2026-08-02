export const routes = {
  home: {
    path: "/",
  },
  products: {
    path: "/catalogo",
  },
  product: {
    path: "/catalogo/:productName",
    link: (productName: string) => `/catalogo/${encodeURIComponent(productName)}`,
  },
  admin: {
    dashboard: {
      path: "/admin/dashboard",
    },
  },
  auth: {
    login: {
      path: "/login",
    },
  },
} as const;
