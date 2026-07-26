import Link from "next/link";
import Image from "next/image";
import { productCategories } from "@/components/portfolio/data/product-categories";

export default function ProductPortfolioPage() {
  return (
    <div className="page-shell">
      <section className="section-padding mt-8 pt-10"></section>

      <section className="pt-0 pb-12 md:pb-16 lg:pb-20 -mt-32 md:-mt-48 lg:-mt-52 px-2 sm:px-3 md:px-4 lg:px-6">
        <div className="mx-auto w-full px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-stretch">
            {productCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/product/${category.slug}`}
                className="group relative flex h-full w-full flex-col overflow-hidden border border-border/60 bg-card"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={category.image}
                    alt={`${category.title} category sample`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                    loading="lazy"
                    quality={75}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    placeholder="blur"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-charcoal/70 via-transparent to-transparent opacity-80" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="font-serif text-2xl text-cream font-semibold mb-2">
                    {category.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}