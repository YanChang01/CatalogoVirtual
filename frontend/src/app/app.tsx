import AppProvider from "./provider";
import { Navigate, Route, Routes } from "react-router";
import NotFoundPage from "@/app/routes/not-found";
import { routes } from "@/config/routes";
import HomePage from "@/app/routes/home";
import Catalog from "@/app/routes/catalog";
import ProductDetail from "@/app/routes/product-detail";
import LoginPage from "./routes/login";
import AdminProductsPage from "./routes/admin/products";
import AdminProductNewPage from "./routes/admin/product-new";
import AdminProductEditPage from "./routes/admin/product-edit";
import AdminCategoriesPage from "./routes/admin/categories";
import AdminCategoryNewPage from "./routes/admin/category-new";
import AdminCategoryEditPage from "./routes/admin/category-edit";
import AdminUsersPage from "./routes/admin/users";
import AdminUserNewPage from "./routes/admin/user-new";
import AdminUserEditPage from "./routes/admin/user-edit";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { GuestRoute } from "@/components/auth/GuestRoute";
import { AdminLayout } from "@/features/admin/components/AdminLayout";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path={routes.auth.login.path} element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path={routes.home.path} element={<HomePage />} />
          <Route path={routes.products.path} element={<Catalog />} />
          <Route path={routes.product.path} element={<ProductDetail />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to={routes.admin.products.path} replace />} />
            <Route path="productos" element={<AdminProductsPage />} />
            <Route path="productos/nuevo" element={<AdminProductNewPage />} />
            <Route path="productos/:productName/editar" element={<AdminProductEditPage />} />
            <Route path="categorias" element={<AdminCategoriesPage />} />
            <Route path="categorias/nueva" element={<AdminCategoryNewPage />} />
            <Route path="categorias/:categoryName/editar" element={<AdminCategoryEditPage />} />
            <Route path="usuarios" element={<AdminUsersPage />} />
            <Route path="usuarios/nuevo" element={<AdminUserNewPage />} />
            <Route path="usuarios/:userEmail/editar" element={<AdminUserEditPage />} />
          </Route>
        </Route>

        {/* Ruta comodín ¡SIEMPRE AL FINAL! */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
