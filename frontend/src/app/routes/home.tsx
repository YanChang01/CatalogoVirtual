import { HomeHero } from "@/features/home/components/HomeHero";
import { HomeCategories } from "@/features/home/components/HomeCategories";
import { HomeFeaturedProducts } from "@/features/home/components/HomeFeaturedProducts";
import ContentLayout from "@/components/layouts/content-layout";
import { useHomeCategories } from "@/features/home/hooks/useHomeCategories";
import { useHomeProducts } from "@/features/home/hooks/useHomeProducts";

export default function HomePage() {
  const { categories, loading: categoriesLoading } = useHomeCategories();
  const { products, loading: productsLoading } = useHomeProducts();

  return (
    <ContentLayout>
      <HomeHero />
      <HomeCategories categories={categories} loading={categoriesLoading} />
      <HomeFeaturedProducts products={products} loading={productsLoading} />
    </ContentLayout>
  );
}
