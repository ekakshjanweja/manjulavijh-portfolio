import Link from "next/link";
import Image from "next/image";
import { foodCategories } from "@/components/portfolio/data/food-categories";
import { socialLinks } from "@/components/portfolio/data/social-links";

export default function FoodPortfolioPage() {
  return (
    <div className="page-shell">
      <section className="section-padding mt-8 pt-10">
        {/* <div className="max-w-6xl mx-auto">
          <Link
            href="/portfolio"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-accent"
          >
            ← Back to portfolio
          </Link>
          <div className="mt-6">
            <p className="section-kicker text-accent text-sm uppercase mb-0 -mt-4 font-semibold">
              Food Collections
            </p>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
              Bringing Brands to Life
            </p>
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
        </div> */}
      </section>

      <section className="pt-0 pb-12 md:pb-16 lg:pb-20 -mt-32 md:-mt-48 lg:-mt-52 px-2 sm:px-3 md:px-4 lg:px-6">
        <div className="mx-auto w-full px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-stretch">
            {foodCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/portfolio/food/${category.slug}`}
                className="group relative flex h-full w-full flex-col overflow-hidden border border-border/60 bg-card"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={category.image}
                    alt={`${category.title} category sample`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                    loading="lazy"
                    quality={72}
                    className="h-full w-full object-cover  transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    placeholder="blur"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-charcoal/70 via-transparent to-transparent opacity-80" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="font-serif text-xl text-cream font-semibold mb-2">
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
