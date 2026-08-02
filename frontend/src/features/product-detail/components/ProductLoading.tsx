import ContentLayout from "@/components/layouts/content-layout";

export function ProductLoading() {
  return (
    <ContentLayout>
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Cargando producto...</p>
      </div>
    </ContentLayout>
  );
}