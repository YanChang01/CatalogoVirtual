import { useParams } from "react-router";
import ContentLayout from "@/components/layouts/content-layout";
import { useProductDetail } from "@/features/product-detail/hooks/useProductDetail";
import { ProductGallery } from "@/features/product-detail/components/ProductGallery";
import { ProductInfo } from "@/features/product-detail/components/ProductInfo";
import { ProductDetails } from "@/features/product-detail/components/ProductDetails";
import { ProductLoading } from "@/features/product-detail/components/ProductLoading";
import { ProductNotFound } from "@/features/product-detail/components/ProductNotFound";

export default function ProductDetail() {
  const { productName } = useParams();
  const name = productName ? decodeURIComponent(productName) : "";
  const { product, loading, error } = useProductDetail(name);

  if (loading) {
    return <ProductLoading />;
  }

  if (error || !product) {
    return <ProductNotFound error={error || "Producto no encontrado"} />;
  }

  return (
    <ContentLayout>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-10">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-16">
            <ProductGallery product={product} />
            <div className="space-y-6 min-w-0">
              <ProductInfo product={product} />
              <ProductDetails product={product} />
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}