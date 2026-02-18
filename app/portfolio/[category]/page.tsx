import Link from "next/link";
import { notFound } from "next/navigation";
import MasonryGrid from "@/components/portfolio/masonry-grid";
import { socialLinks } from "@/components/portfolio/data/social-links";
import { foodImages } from "@/components/portfolio/data/food-images";
import { productImages } from "@/components/portfolio/data/product-images";
import { conceptImages } from "@/components/portfolio/data/concept-images";

type CategoryEntry = {
  title: string;
  description: string;
  headline: string;
  subheadline: string;
};

const categoryMeta = {
  food: {
    title: "Food",
    headline: "Bringing Brands to Life",
    subheadline: "Through Food Photography",
  },
  product: {
    title: "Product",
    headline: "Elevating Products",
    subheadline: "Through Visual Storytelling",
  },
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
  // const category = categoryMeta[categorySlug as keyof typeof categoryMeta];

  // if (!category) {
  //   notFound();
  // }

  const galleryMap = {
    food: foodImages,
    product: productImages,
    concept: conceptImages,
  };

  const images = galleryMap[categorySlug as keyof typeof galleryMap];

  if (!images) {
    notFound();
  }

  return (
    <div className="page-shell mt-46">
      {/* <section className="section-padding pt-10">
        <div className="max-w-6xl mx-auto -mt-8">
          <Link
            href="/portfolio"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-accent"
          >
            ← Back to portfolio
          </Link>
          <div className="mt-6">
            <p className="section-kicker text-accent text-xs uppercase mb-4 font-semibold">
              {category.title} Collection
            </p>
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground font-semibold tracking-wide mb-2">
              {category.headline}
            </h1>
            <h2 className="font-serif text-xl md:text-2xl lg:text-4xl text-muted-foreground font-semibold tracking-wide mb-6">
              {category.subheadline}
            </h2>
            <a
              href="#gallery"
              className="text-muted-foreground text-sm md:text-md max-w-lg mx-auto leading-relaxed"
            >
              Scroll down to see more ↓
            </a>
          </div>
          <div className="flex items-center gap-4 mt-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-11 h-11 border border-border/60 flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </section> */}

      <section id="gallery" className="py-8 md:py-12 lg:py-16 scroll-mt-24">
        <main className="w-full px-1 sm:px-2 -mt-42">
          <MasonryGrid images={images} />
        </main>
      </section>
    </div>
  );
}
