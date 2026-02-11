"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const brands = [
  {
    name: "Copperlane",
    initials: "CL",
    note: "Artisanal Bistro",
    tone: "from-amber-100/80 to-amber-200/80",
  },
  {
    name: "Northwind",
    initials: "NW",
    note: "Lifestyle Studio",
    tone: "from-stone-100/80 to-stone-200/80",
  },
  {
    name: "Studio Vale",
    initials: "SV",
    note: "Design Collective",
    tone: "from-rose-100/80 to-rose-200/80",
  },
  {
    name: "Golden Fork",
    initials: "GF",
    note: "Fine Dining",
    tone: "from-yellow-100/80 to-yellow-200/80",
  },
  {
    name: "Fern & Co.",
    initials: "FC",
    note: "Wellness Retail",
    tone: "from-emerald-100/80 to-emerald-200/80",
  },
  {
    name: "Oasis Hotel",
    initials: "OH",
    note: "Boutique Hospitality",
    tone: "from-sky-100/80 to-sky-200/80",
  },
];

export const ClientsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="clients" ref={ref} className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-kicker text-accent text-xs uppercase mb-4 font-semibold">
            Clients
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold tracking-tight mb-5">
            Brands
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            A curated mix of hospitality, lifestyle, and design partners. Logos below
            are sample placeholders.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * index }}
              className="group rounded-none border border-border/50 bg-card/60 px-4 py-5 md:px-6 md:py-7 flex flex-col items-center justify-center gap-4 hover:border-accent/30 transition-all duration-300"
            >
              <div
                className={`h-12 w-12 md:h-14 md:w-14 rounded-full bg-linear-to-br ${brand.tone} flex items-center justify-center border border-border/50 text-xs md:text-sm font-semibold tracking-[0.2em] text-foreground/80`}
              >
                {brand.initials}
              </div>
              <div className="text-center">
                <p className="text-sm md:text-base font-semibold text-foreground">
                  {brand.name}
                </p>
                <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
                  {brand.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
