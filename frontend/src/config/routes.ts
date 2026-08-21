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
      new: "/admin/productos/nuevo",
      edit: (name: string) => `/admin/productos/${encodeURIComponent(name)}/editar`,
    },
    categories: {
      path: "/admin/categorias",
      new: "/admin/categorias/nueva",
      edit: (name: string) => `/admin/categorias/${encodeURIComponent(name)}/editar`,
    },
    users: {
      path: "/admin/usuarios",
      new: "/admin/usuarios/nuevo",
      edit: (email: string) => `/admin/usuarios/${encodeURIComponent(email)}/editar`,
    },
  },
  auth: {
    login: {
      path: "/login",
    },
  },
} as const;
