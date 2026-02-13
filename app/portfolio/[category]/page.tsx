import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import foodHero from "@/public/images/hero-food.jpg";
import portraitHero from "@/public/images/photographer-portrait.jpg";
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
  hero: StaticImageData;
};

const categoryMeta = {
  food: {
    title: "Food",
    headline: "Bringing Brands to Life",
    subheadline: "Through Food Photography",
    hero: foodHero,
  },
  product: {
    title: "Product",
    headline: "Elevating Products",
    subheadline: "Through Visual Storytelling",
    hero: foodHero,
  },
  concept: {
    title: "Concept",
    headline: "Capturing Essence",
    subheadline: "Through Portrait Photography",
    hero: portraitHero,
  },
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = categoryMeta[categorySlug as keyof typeof categoryMeta];

  if (!category) {
    notFound();
  }

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
    <div className="page-shell">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={category.hero}
            alt={`${category.title} hero`}
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            className="object-cover"
          />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 z-1 bg-linear-to-t from-black/60 via-black/30 to-black/20" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white/80 font-semibold tracking-wide mb-2">
            {category.headline}
          </h1>
          <h2 className="font-serif text-xl md:text-2xl lg:text-4xl text-white/80 font-semibold tracking-wide mb-8">
            {category.subheadline}
          </h2>
          <a
            href="#gallery"
            className="text-white/65 text-sm md:text-md max-w-lg mx-auto mb-12 leading-relaxed"
          >
            Scroll down to see more ↓
          </a>

          {/* Social Links */}
          <div className="flex items-center justify-center mt-6 gap-4">
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

        {/* Back to Portfolio Link */}
        <Link
          href="/portfolio"
          className="absolute top-24 left-6 z-10 text-xs font-semibold tracking-[0.3em] text-accent"
        >
          ← Back to portfolio
        </Link>
      </section>

      <section id="gallery" className="py-8 md:py-12 lg:py-16 scroll-mt-24">
        <main className="w-full px-1 sm:px-2">
          <MasonryGrid images={images} />
        </main>
      </section>
    </div>
  );
}
