import AppProvider from "./provider";
import { Route, Routes } from "react-router";
import NotFoundPage from "@/app/routes/not-found";
import { routes } from "@/config/routes";
import HomePage from "@/app/routes/home";
import Catalog from "@/app/routes/catalog";
import ProductDetail from "@/app/routes/product-detail";
import LoginPage from "./routes/login";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { GuestRoute } from "@/components/auth/GuestRoute";

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
        </Route>

        {/* Ruta comodín ¡SIEMPRE AL FINAL! */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
