export const routes = {
  home: {
    path: "/",
  },
  products: {
    path: "/catalogo",
  },
  product: {
    path: (productId: string | number) => `/catalogo/${productId}`,
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
