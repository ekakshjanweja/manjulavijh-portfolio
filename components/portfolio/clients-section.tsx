"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAllClients, type Client } from "@/lib/clients-browser";

export const ClientsSection = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllClients()
      .then(setClients)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading || clients.length === 0) {
    return null;
  }

  return (
    <section id="clients" className="py-16 bg-background">
      <div className="w-full px-0">
        <div className="text-center mb-16">
          <p className="section-kicker text-accent text-2xl md:text-3xl lg:text-5xl mb-4 font-semibold">
            Clients
          </p>
          <div className="section-divider mb-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-10 items-center">
          {clients.slice(0, 8).map((client, index) => (
            <div
              key={client.id}
              className="flex items-center justify-center group"
            >
              <div className="relative mx-2 w-64 h-32 md:w-72 md:h-40 lg:w-80 lg:h-44">
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
                      sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 320px"
                      quality={75}
                      className="object-contain hover:opacity-80 transition-opacity"
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                  </a>
                ) : (
                  <Image
                    src={client.logo_url}
                    alt={client.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 320px"
                    quality={75}
                    className="object-contain"
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link
            href="/brands"
            className="inline-flex px-10 py-2 text-sm tracking-wide border border-input bg-neutral-400/10 hover:border-accent hover:bg-accent/5 transition-all duration-300"
          >
            MORE
          </Link>
        </div>
      </div>
    </section>
  );
};