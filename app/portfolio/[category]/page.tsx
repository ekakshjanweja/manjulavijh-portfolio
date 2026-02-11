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

type CategoryItem = {
  title: string;
  image: StaticImageData;
};

type CategoryEntry = {
  title: string;
  description: string;
  hero: StaticImageData;
  items: CategoryItem[];
};

const categoryData: Record<string, CategoryEntry> = {
  food: {
    title: "Food",
    description: "Editorial plates, menus, and seasonal ingredient stories.",
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

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = categoryData[params.category];

  if (!category) {
    notFound();
  }

  return (
    <div className="page-shell">
      <section className="section-padding pt-10">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/portfolio"
            className="text-xs uppercase tracking-[0.3em] text-accent"
          >
            Back to portfolio
          </Link>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="section-kicker text-accent text-xs uppercase mb-4 font-semibold">
                Category
              </p>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold tracking-tight mb-5">
                {category.title}
              </h1>
              <p className="text-muted-foreground text-sm md:text-base max-w-xl">
                {category.description}
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden border border-border/60 bg-card">
              <Image
                src={category.hero}
                alt={`${category.title} hero`}
                className="h-full w-full object-cover"
                placeholder="blur"
                priority
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.items.map((item) => (
              <div
                key={item.title}
                className="group border border-border/60 bg-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    placeholder="blur"
                  />
                </div>
                <div className="p-5">
                  <p className="text-accent text-[10px] uppercase tracking-[0.3em] mb-2">
                    {category.title}
                  </p>
                  <h3 className="font-serif text-lg text-foreground font-semibold">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
