import Image from "next/image";
import Link from "next/link";

import food_cover from "@/public/images/category/food_cover.jpg";
import product_cover from "@/public/images/category/product_cover.jpg";
import concept_cover from "@/public/images/category/concept_cover.jpg";

const categories = [
  {
    title: "Food",
    slug: "food",
    image: food_cover,
  },
  {
    title: "Product",
    slug: "product",
    image: product_cover,
  },
  {
    title: "Concept",
    slug: "concept",
    image: concept_cover,
  },
];

export const CategoriesSection = () => {
  return (
    <section id="categories" className="py-16 bg-background">
      <div className="w-full px-2 sm:px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="section-kicker text-accent text-2xl md:text-3xl lg:text-5xl mb-4 font-semibold">
            Explore Collections
          </p>
          {/* <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold tracking-tight mb-5">
            Explore The Collections
          </h2> */}
          <div className="section-divider mb-6" />
          {/* <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Dive into focused galleries curated by subject and visual style.
          </p> */}
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-stretch">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/portfolio/${category.slug}`}
              className="group relative flex h-full w-full flex-col overflow-hidden border border-border/60 bg-card"
            >
              {/* <div className="relative aspect-3/2 overflow-hidden"> */}
              <div className="relative aspect-4/5 overflow-hidden">
                <Image
                  src={category.image}
                  alt={`${category.title} category sample`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                  loading="lazy"
                  quality={72}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  placeholder="blur"
                />
                <div className="absolute inset-0 bg-linear-to-t from-charcoal/70 via-transparent to-transparent opacity-80" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                {/* <p className="text-accent text-[10px] uppercase tracking-[0.3em] mb-2">
                  Category
                </p> */}
                <h3 className="font-serif text-xl text-cream font-semibold mb-2">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
