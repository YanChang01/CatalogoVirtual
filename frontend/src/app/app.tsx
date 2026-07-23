import AppProvider from "./provider";
import { Route, Routes } from "react-router";
import NotFoundPage from "@/app/routes/not-found";
import { routes } from "@/config/routes";
import HomePage from "@/app/routes/home";
import Catalog from "@/app/routes/catalog";
import ProductDetail from "@/app/routes/product-detail";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path={routes.home.path} element={<HomePage />} />
        <Route path={routes.products.path} element={<Catalog />} />
        <Route path={routes.product.path(":productId")} element={<ProductDetail />} />
        {/* Ruta comodín ¡SIEMPRE AL FINAL! */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
