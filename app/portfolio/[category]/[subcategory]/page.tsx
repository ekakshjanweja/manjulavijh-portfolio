import { notFound } from "next/navigation";
import MasonryGrid from "@/components/portfolio/masonry-grid";
import { fetchPhotosByCategory } from "@/lib/photos";
import { CATEGORY_SUBCATEGORIES } from "@/lib/portfolio-categories";

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category: categorySlug, subcategory } = await params;
  if (!(categorySlug in CATEGORY_SUBCATEGORIES)) {
    notFound();
  }

  const allowed = CATEGORY_SUBCATEGORIES[categorySlug as "food" | "product"].some(
    (entry) => entry.slug === subcategory,
  );
  if (!allowed) {
    notFound();
  }

  const images = await fetchPhotosByCategory(
    categorySlug as "food" | "product",
    subcategory,
  );

  return (
    <div className="page-shell mt-3">
      {/* <section className="section-padding pt-10">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/portfolio"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-accent"
          >
            ← Back to portfolio
          </Link>
        </div>
      </section> */}

      <section id="gallery" className="py-8 md:py-12 lg:py-16 scroll-mt-24">
        <main className="w-full px-1  sm:px-2">
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
