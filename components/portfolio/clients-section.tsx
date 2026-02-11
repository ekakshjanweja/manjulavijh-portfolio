"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { brands } from "@/components/portfolio/brands-data";

export const ClientsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="clients" ref={ref} className="py-20 bg-muted/30">
      {/* <div className="max-w-6xl mx-auto px-6"> */}
<div className="w-full px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-kicker text-accent text-xs uppercase mb-4 font-semibold">
            Clients
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold tracking-tight mb-5">
            Trusted by Leading Brands
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            A curated mix of hospitality, lifestyle, and design partners. Logos
            below are sample placeholders.
          </p>
        </motion.div>

        {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"> */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-10 items-center">
          {brands.slice(0, 8).map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * index }}
              // className="group rounded-none border border-border/50 bg-card/60 px-4 py-5 md:px-6 md:py-7 flex flex-col items-center justify-center gap-4 hover:border-accent/30 transition-all duration-300"
              className="flex items-center justify-center group"
            >
              <div className="relative w-52 h-28 md:w-60 md:h-36">
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
            className="inline-flex border border-foreground px-10 py-3 text-sm tracking-wide hover:bg-foreground/10 hover:text-gold transition-all duration-300"
          >
            MORE
          </Link>
        </div>
      </div>
    </section>
  );
};
