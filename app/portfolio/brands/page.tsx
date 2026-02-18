import Image from "next/image";
import Link from "next/link";

import { brands } from "@/components/portfolio/data/brands-data";

export default function BrandsPage() {
  return (
    <div className="page-shell">
      <section className="section-padding pt-10">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/portfolio"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-accent"
          >
            ← Back to portfolio
          </Link>
          <div className="mt-6">
            <p className="section-kicker text-accent text-xs uppercase mb-4 font-semibold">
              Clients
            </p>
            {/* <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold tracking-tight mb-5">
              Brand Collaborations
            </h1> */}
            {/* <div className="section-divider mb-6" /> */}
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
              A complete view of the brands featured in the portfolio.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0 -mt-12 md:-mt-20 lg:-mt-24">
        {/* <div className="max-w-6xl mx-auto"> */}
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-12 lg:gap-y-14 gap-x-4 sm:gap-x-6 md:gap-x-8 items-center">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="flex items-center justify-center"
              >
                {/* <div className="relative w-52 h-28 md:w-60 md:h-36"> */}
                <div className="relative w-full max-w-47.5 h-24 sm:max-w-55 sm:h-28 md:max-w-60 md:h-32 lg:max-w-70 lg:h-36 xl:max-w-80 xl:h-40">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 320px"
                    loading="lazy"
                    quality={70}
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
