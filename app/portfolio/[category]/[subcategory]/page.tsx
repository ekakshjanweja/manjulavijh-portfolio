import Link from "next/link";
import { notFound } from "next/navigation";
import MasonryGrid from "@/components/portfolio/masonry-grid";
import { categoryGallery } from "@/components/portfolio/data/category-gallery";

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category: categorySlug, subcategory } = await params;
  const galleryKey = `${categorySlug}-${subcategory}`;
  const images = categoryGallery[galleryKey];

  if (!images) {
    notFound();
  }

  return (
    <div className="page-shell">
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
          <MasonryGrid images={images} />
        </main>
      </section>
    </div>
  );
}
