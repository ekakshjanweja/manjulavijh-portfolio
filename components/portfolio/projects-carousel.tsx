"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import work1 from "@/public/images/carousel-one.jpg";
import work2 from "@/public/images/carousel-two.jpg";
import work3 from "@/public/images/carousel-three.jpg";
import work4 from "@/public/images/carousel-four.jpg";
import work5 from "@/public/images/carousel-five.jpg";
import work6 from "@/public/images/carousel-six.jpg";

const projects = [
  {
    id: 1,
    image: work1,
    title: "Luxury Skincare Campaign",
    client: "Belle Botanics",
    description:
      "A refined editorial series for a luxury skincare launch, blending natural textures with elegant studio lighting.",
  },
  {
    id: 2,
    image: work2,
    title: "Patisserie Menu Refresh",
    client: "Maison Doux",
    description:
      "Reimagining a classic patisserie menu with warm, inviting food photography that celebrates artisan craft.",
  },
  {
    id: 3,
    image: work3,
    title: "Farm-to-Table Story",
    client: "Green Roots Kitchen",
    description:
      "A visual narrative following fresh ingredients from local farms to beautifully plated dishes.",
  },
  {
    id: 4,
    image: work4,
    title: "Specialty Coffee Series",
    client: "Roast & Pour",
    description:
      "Moody, atmospheric imagery capturing the craft and ritual of specialty coffee brewing.",
  },
  {
    id: 5,
    image: work5,
    title: "Fragrance Collection",
    client: "Oud Atelier",
    description:
      "Still-life photography for a premium fragrance house, emphasizing luxury and craftsmanship.",
  },
  {
    id: 6,
    image: work6,
    title: "Restaurant Rebrand",
    client: "The Ember Grill",
    description:
      "Bold food photography supporting a complete restaurant rebrand and marketing campaign.",
  },
];

export const ProjectsCarousel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section-padding bg-background overflow-hidden"
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
            Projects
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold tracking-tight mb-5">
            Signature Work
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Curated collaborations and photo series that define my creative
            vision.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {projects.map((project) => (
                <CarouselItem
                  key={project.id}
                  className="pl-4 md:pl-6 basis-[85%] md:basis-[55%] lg:basis-[42%]"
                >
                  <div className="group relative">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-none">
                      <Image
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        placeholder="blur"
                      />
                      {/* Subtle overlay on hover */}
                      <div className="absolute inset-0 bg-linear-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-none" />
                    </div>

                    {/* Caption */}
                    <div className="mt-5">
                      <p className="text-accent text-[10px] uppercase tracking-[0.3em] mb-1.5">
                        {project.client}
                      </p>
                      <h3 className="font-serif text-lg md:text-xl text-foreground font-semibold leading-snug mb-2">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-3 mt-10">
              <CarouselPrevious className="static translate-y-0 size-10 rounded-none border-border/60 hover:border-accent/50 hover:bg-accent/5" />
              <CarouselNext className="static translate-y-0 size-10 rounded-none border-border/60 hover:border-accent/50 hover:bg-accent/5" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};
