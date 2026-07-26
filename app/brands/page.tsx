import Image from "next/image";
import Link from "next/link";

import { fetchAllClients } from "@/lib/clients";

export const dynamic = "force-dynamic";

export default async function BrandsPage() {
  const clients = await fetchAllClients();

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
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
              A complete view of the brands featured in the portfolio.
            </p>
          </div>
        </div>
      </section>

      <section className="pt-0 -mt-12 md:-mt-20 lg:-mt-24">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {clients.length === 0 ? (
            <div className="text-center text-slate-500 py-10">
              No client logos uploaded yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-12 lg:gap-y-14 gap-x-4 sm:gap-x-6 md:gap-x-8 items-center">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-center"
                >
                  <div className="relative w-full max-w-47.5 h-24 mb-8 sm:max-w-55 sm:h-28 md:max-w-60 md:h-32 lg:max-w-70 lg:h-36 xl:max-w-80 xl:h-40">
                    {client.website ? (
                      <a
                        href={client.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                      >
                        <Image
                          src={client.logo_url}
                          alt={client.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 320px"
                          loading="lazy"
                          quality={75}
                          className="object-contain hover:opacity-80 transition-opacity"
                        />
                      </a>
                    ) : (
                      <Image
                        src={client.logo_url}
                        alt={client.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 320px"
                        loading="lazy"
                        quality={75}
                        className="object-contain"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}