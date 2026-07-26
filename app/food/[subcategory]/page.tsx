import { notFound } from "next/navigation";
import MasonryGrid from "@/components/portfolio/masonry-grid";
import { fetchPhotosByCategory } from "@/lib/photos";
import { FOOD_SUBCATEGORIES } from "@/lib/portfolio-categories";

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ subcategory: string }>;
}) {
  const { subcategory } = await params;

  const allowed = FOOD_SUBCATEGORIES.some(
    (entry) => entry.slug === subcategory,
  );
  if (!allowed) {
    notFound();
  }

  const images = await fetchPhotosByCategory("food", subcategory);

  return (
    <div className="page-shell mt-3">
      <section id="gallery" className="py-8 md:py-12 lg:py-16 scroll-mt-24">
        <main className="w-full px-1 sm:px-2">
          <MasonryGrid
            images={images.map((image) => ({
              id: image.id,
              src: image.image_url,
            }))}
          />
        </main>
      </section>
    </div>
  );
}