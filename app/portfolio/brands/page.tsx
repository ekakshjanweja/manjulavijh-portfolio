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

      <section className="section-padding pt-0 -mt-32 md:-mt-48 lg:-mt-52">
        {/* <div className="max-w-6xl mx-auto"> */}
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-10 items-center">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="flex items-center justify-center"
              >
                {/* <div className="relative w-52 h-28 md:w-60 md:h-36"> */}
                <div className="relative w-64 h-32 md:w-72 md:h-40 lg:w-80 lg:h-44">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
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
