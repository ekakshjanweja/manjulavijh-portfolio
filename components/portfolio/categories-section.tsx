"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import foodImage from "@/public/images/hero-food.jpg";
import productImage from "@/public/images/carousel-one.jpg";
import portraitImage from "@/public/images/photographer-portrait.jpg";

const categories = [
  {
    title: "Food",
    slug: "food",
    image: foodImage,
    description:
      "Food photography featuring dishes, menus, and editorial stories.",
  },
  {
    title: "Product",
    slug: "product",
    image: productImage,
    description:
      "Minimal product photography highlighting texture and composition.",
  },
  // {
  //   title: "Portrait",
  //   slug: "portrait",
  //   image: portraitImage,
  //   description: "Clean, modern portrait photography with emotional depth.",
  // },
];

export const CategoriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="categories"
      ref={ref}
      className="py-16 bg-background"
    >
      <div className="w-full px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="section-kicker text-accent text-2xl md:text-3xl lg:text-5xl mb-4 font-semibold">
            Explore Collections
          </p>
          {/* <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold tracking-tight mb-5">
            Explore The Collections
          </h2> */}
          <div className="section-divider mb-6" />
          {/* <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Dive into focused galleries curated by subject and visual style.
          </p> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          // className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/portfolio/${category.slug}`}
              className="group relative flex h-full flex-col overflow-hidden border border-border/60 bg-card"
            >
              {/* <div className="relative aspect-3/2 overflow-hidden"> */}
              <div className="relative h-110 md:h-120 overflow-hidden">
                <Image
                  src={category.image}
                  alt={`${category.title} category sample`}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  placeholder="blur"
                />
                <div className="absolute inset-0 bg-linear-to-t from-charcoal/70 via-transparent to-transparent opacity-80" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                {/* <p className="text-accent text-[10px] uppercase tracking-[0.3em] mb-2">
                  Category
                </p> */}
                <h3 className="font-serif text-xl text-cream font-semibold mb-2">
                  {category.title}
                </h3>
                <p className="text-cream/80 text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
