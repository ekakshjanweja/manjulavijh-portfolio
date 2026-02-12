import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import foodHero from "@/public/images/hero-food.jpg";
import portraitHero from "@/public/images/photographer-portrait.jpg";
import work1 from "@/public/images/carousel-one.jpg";
import work2 from "@/public/images/carousel-two.jpg";
import work3 from "@/public/images/carousel-three.jpg";
import work4 from "@/public/images/carousel-four.jpg";
import work5 from "@/public/images/carousel-five.jpg";
import work6 from "@/public/images/carousel-six.jpg";
import MasonryGrid from "@/components/portfolio/masonry-grid";
import { socialLinks } from "@/components/portfolio/social-links";

type CategoryItem = {
  title: string;
  image: StaticImageData;
};

type CategoryEntry = {
  title: string;
  description: string;
  headline: string;
  subheadline: string;
  hero: StaticImageData;
  items: CategoryItem[];
};

type ImageItem = {
  src: string;
  size?: "small" | "medium" | "large";
  shape?: "square" | "portrait";
};

const categoryData: Record<string, CategoryEntry> = {
  food: {
    title: "Food",
    description: "Editorial plates, menus, and seasonal ingredient stories.",
    headline: "Bringing Brands to Life",
    subheadline: "Through Food Photography",
    hero: foodHero,
    items: [
      { title: "Chef's Table", image: work6 },
      { title: "Farm-to-Plate", image: work3 },
      { title: "Artisan Pastries", image: work2 },
      { title: "Fresh Harvest", image: work1 },
      { title: "Kitchen Rituals", image: work4 },
      { title: "Golden Hour Dishes", image: work5 },
    ],
  },
  product: {
    title: "Product",
    description: "Refined still-life and branding for luxury products.",
    headline: "Elevating Products",
    subheadline: "Through Visual Storytelling",
    hero: work1,
    items: [
      { title: "Skincare Collection", image: work1 },
      { title: "Fragrance Series", image: work5 },
      { title: "Modern Flat Lay", image: work4 },
      { title: "Boutique Packaging", image: work2 },
      { title: "Studio Essentials", image: work6 },
      { title: "Details & Texture", image: work3 },
    ],
  },
  portrait: {
    title: "Portrait",
    description: "Character-led portraits with soft light and depth.",
    headline: "Capturing Essence",
    subheadline: "Through Portrait Photography",
    hero: portraitHero,
    items: [
      { title: "Editorial Portrait", image: portraitHero },
      { title: "Studio Calm", image: work4 },
      { title: "Warm Tones", image: work3 },
      { title: "Quiet Confidence", image: work2 },
      { title: "Ambient Light", image: work5 },
      { title: "City Narrative", image: work6 },
    ],
  },
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = categoryData[categorySlug];

  if (!category) {
    notFound();
  }

  const images: ImageItem[] = [
    { src: "/images/carousel-one.jpg", size: "large" },
    { src: "/images/carousel-two.jpg", shape: "portrait" },
    { src: "/images/carousel-three.jpg", size: "small" },
    { src: "/images/carousel-four.jpg", size: "medium" },
    { src: "/images/carousel-five.jpg", shape: "square" },
    { src: "/images/carousel-six.jpg", size: "large" },
  ];

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
            placeholder="blur"
            className="object-cover"
          />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 z-1 bg-linear-to-t from-black/60 via-black/30 to-black/20" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white/80 italic font-semibold tracking-wide mb-2">
            {category.headline}
          </h1>
          <h2 className="font-serif text-xl md:text-2xl lg:text-4xl text-white/80 italic font-semibold tracking-wide mb-8">
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
