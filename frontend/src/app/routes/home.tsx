import { HomeHero } from "@/features/home/components/HomeHero";
import { HomeCategories } from "@/features/home/components/HomeCategories";
import { HomeFeaturedProducts } from "@/features/home/components/HomeFeaturedProducts";
import { HomePromise } from "@/features/home/components/HomePromise";
import { HomeTestimonials } from "@/features/home/components/HomeTestimonials";
import ContentLayout from "@/components/layouts/content-layout";
import { useHomeData } from "@/features/home/hooks/useHomeData";

export default function HomePage() {
  const { categories, featuredProducts, loading } = useHomeData();

  return (
    <ContentLayout>
      <HomeHero />
      <HomeCategories categories={categories} loading={loading} />
      <HomeFeaturedProducts products={featuredProducts} loading={loading} />
      <HomePromise />
      <HomeTestimonials />
    </ContentLayout>
  );
}