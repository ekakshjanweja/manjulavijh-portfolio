"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import work1 from "@/public/images/carousel-one.jpg";
import work2 from "@/public/images/carousel-two.jpg";
import work3 from "@/public/images/carousel-three.jpg";
import work4 from "@/public/images/carousel-four.jpg";
import work5 from "@/public/images/carousel-five.jpg";
import work6 from "@/public/images/carousel-six.jpg";
import Image from "next/image";
import { Lightbox } from "./lightbox";

const workItems = [
  {
    id: 1,
    image: work1,
    title: "Luxury Skincare",
    category: "Product",
    description: "Elegant product photography for a luxury skincare line.",
    size: "tall" as const,
  },
  {
    id: 2,
    image: work2,
    title: "Gourmet Desserts",
    category: "Food",
    description: "Artful plating captured for a fine dining dessert menu.",
    size: "normal" as const,
  },
  {
    id: 3,
    image: work3,
    title: "Fresh & Healthy",
    category: "Food",
    description: "Vibrant, natural-light food photography for a health brand.",
    size: "normal" as const,
  },
  {
    id: 4,
    image: work4,
    title: "Artisan Coffee",
    category: "Food",
    description: "Moody, atmospheric shots for a specialty coffee roaster.",
    size: "tall" as const,
  },
  {
    id: 5,
    image: work5,
    title: "Luxury Fragrance",
    category: "Product",
    description: "Studio still-life photography for a premium fragrance house.",
    size: "normal" as const,
  },
  {
    id: 6,
    image: work6,
    title: "Gourmet Burger",
    category: "Food",
    description: "Bold, textured food photography for a restaurant campaign.",
    size: "normal" as const,
  },
];

const categories = ["All", "Food", "Product"];

export const WorkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems = workItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const navigateLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  return (
    <>
      <section
        id="portfolio"
        ref={ref}
        className="section-padding bg-section-alt"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="section-kicker text-accent text-xs uppercase mb-4 font-semibold">
              Portfolio
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold tracking-tight mb-5">
              Featured Work
            </h2>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
              A curated selection of food and product photography, capturing
              beauty in every detail.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-14"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 text-xs uppercase tracking-[0.25em] rounded-none transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-foreground text-background shadow-sm"
                    : "bg-transparent text-muted-foreground hover:text-foreground border border-border/50 hover:border-foreground/30"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Masonry Portfolio Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 auto-rows-[180px] md:auto-rows-[200px] lg:auto-rows-[220px]">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.06 * index }}
                className={`group relative overflow-hidden rounded-none cursor-pointer bg-card/40 ${
                  item.size === "tall" ? "row-span-2" : "row-span-1"
                }`}
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  placeholder="blur"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-charcoal/80 via-charcoal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Caption on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-muted-foreground text-[10px] uppercase tracking-[0.3em] mb-1">
                    {item.category}
                  </p>
                  <h3 className="font-serif text-base md:text-lg text-foreground font-semibold leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Subtle border */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-none group-hover:ring-accent/20 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </>
  );
};
