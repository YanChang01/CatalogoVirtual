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
      path: "/admin",
    },
    products: {
      path: "/admin/productos",
    },
    categories: {
      path: "/admin/categorias",
    },
    users: {
      path: "/admin/usuarios",
    },
  },
  auth: {
    login: {
      path: "/login",
    },
  },
} as const;
