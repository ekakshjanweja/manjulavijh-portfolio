"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import work1 from "@/public/images/carousel-one.jpg";
import work2 from "@/public/images/carousel-two.jpg";
import work3 from "@/public/images/carousel-three.jpg";
import work4 from "@/public/images/carousel-four.jpg";
import work5 from "@/public/images/carousel-five.jpg";
import work6 from "@/public/images/carousel-six.jpg";
import Image from "next/image";

const workItems = [
  { id: 1, image: work1, title: "Luxury Skincare", category: "Product" },
  { id: 2, image: work2, title: "Gourmet Desserts", category: "Food" },
  { id: 3, image: work3, title: "Fresh & Healthy", category: "Food" },
  { id: 4, image: work4, title: "Artisan Coffee", category: "Food" },
  { id: 5, image: work5, title: "Luxury Fragrance", category: "Product" },
  { id: 6, image: work6, title: "Gourmet Burger", category: "Food" },
];

const categories = ["All", "Food", "Product"];

export const WorkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = workItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
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
          className="text-center mb-12"
        >
          <p className="section-kicker text-accent text-xs uppercase mb-4 font-semibold">
            Portfolio
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold tracking-tight mb-6">
            Featured Work
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A curated selection of my favorite food and product photography
            projects, showcasing the art of capturing beauty in every detail.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 text-xs uppercase tracking-[0.3em] rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? "bg-foreground text-background shadow-sm"
                  : "bg-transparent text-foreground/80 border border-border/70 hover:border-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.08 * index }}
              className="group relative overflow-hidden rounded-2xl aspect-4/5 cursor-pointer bg-card/40 ring-1 ring-border/60 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:ring-accent/30"
            >
              <Image
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-charcoal/85 via-charcoal/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-gold text-xs uppercase tracking-[0.3em] mb-2">
                  {item.category}
                </p>
                <h3 className="font-serif text-xl text-cream font-semibold">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
