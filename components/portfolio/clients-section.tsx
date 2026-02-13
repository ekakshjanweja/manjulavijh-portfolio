"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { brands } from "@/components/portfolio/data/brands-data";

export const ClientsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="clients" ref={ref} className="py-16 bg-background">
      {/* <div className="max-w-6xl mx-auto px-6"> */}
      <div className="w-full px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-kicker text-accent text-2xl md:text-3xl lg:text-5xl mb-4 font-semibold">
            Clients
          </p>
          {/* <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold tracking-tight mb-5">
            Trusted by Leading Brands
          </h2> */}
          <div className="section-divider mb-6" />
          {/* <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            A curated mix of hospitality, lifestyle, and design partners. Logos
            below are sample placeholders.
          </p> */}
        </motion.div>

        {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"> */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-10 items-center">
          {brands.slice(0, 8).map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * index }}
              //className="group rounded-none over border border-border/50 bg-card/60 px-4 py-5 md:px-6 md:py-7 flex flex-col items-center justify-center gap-4 hover:border-accent/30 transition-all duration-300"
              className="flex items-center justify-center group"
            >
              <div className="relative mx-2 w-64 h-32 md:w-72 md:h-40 lg:w-80 lg:h-44">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link
            href="/portfolio/brands"
            className="inline-flex px-10 py-2 text-sm tracking-wide  border border-input bg-neutral-400/10 hover:border-accent hover:bg-accent/5 transition-all duration-300"
          >
            MORE
          </Link>
        </div>
      </div>
    </section>
  );
};
