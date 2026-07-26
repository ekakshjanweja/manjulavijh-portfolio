import { notFound } from "next/navigation";
import MasonryGrid from "@/components/portfolio/masonry-grid";
import { fetchPhotosByCategory } from "@/lib/photos";

const categoryMeta = {
  concept: {
    title: "Concept",
    headline: "Capturing Essence",
    subheadline: "Through Portrait Photography",
  },
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  if (!(categorySlug in categoryMeta)) {
    notFound();
  }

  const images = await fetchPhotosByCategory("concept");

  return (
    <div className="page-shell mt-46">
      <section className="section-padding pt-10">
        <div className="max-w-6xl mx-auto -mt-8">
          <p className="section-kicker text-accent text-xs uppercase mb-4 font-semibold">
            {categoryMeta.concept.title} Collection
          </p>
          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground font-semibold tracking-wide mb-2">
            {categoryMeta.concept.headline}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
            {categoryMeta.concept.subheadline}
          </p>
        </div>
      </section>

      <section className="section-padding pb-12 md:pb-16 lg:pb-20">
        <MasonryGrid
          images={images.map((image) => ({
            id: image.id,
            src: image.image_url,
          }))}
        />
      </section>
    </div>
  );
}