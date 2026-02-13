"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

import { AnimatedImages } from "@/components/ui/animated-images";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const images = [
    {
      src: "./images/aboutme/aboutme1.jpeg",
    },
    {
      src: "./images/aboutme/aboutme2.jpeg",
    },
    {
      src: "./images/aboutme/aboutme3.jpeg",
    },
  ];

  return (
    <section id="about" ref={ref} className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-kicker text-accent text-xl  mb-4 font-semibold">
            About Dr. Manjula Vijh
          </p>
          {/* <h1 className=" font-serif text-black/75 text-3xl  mb-4 font-semibold">
            About Dr. Manjula Vijh
          </h1> */}
          <div className="section-divider mb-6" />
        </motion.div>

        {/* <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold tracking-tight leading-tight">
            The Art of
            <br />
            <span className="text-gold">Visual Storytelling</span>
          </h2>
        </div> */}

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">
          {/* Image -- takes 2 columns */}
          {/* <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 relative"
          >
            <div className="relative aspect-3/4 overflow-hidden rounded-none shadow-2xl shadow-black/10">
              <Image
                src={photographerPortrait}
                alt="Manjula Vijh - Food & Product Photographer"
                className="w-full h-full object-cover"
                placeholder="blur"
              />
              {/* Subtle gold frame accent */}
          {/* <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-none" />
            </div>
          </motion.div> */}

          <div className="lg:col-span-2">
            <AnimatedImages images={images} autoplay />
          </div>

          {/* Content -- takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 lg:pl-8"
          >
            <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
              <p>
                Manjula&apos;s journey into photography began quietly at home
                through a love for baking. What started as documenting her own
                creations gradually became an exploration of food, form, and
                presentation. Over time, her focus shifted from baking itself to
                styling, composition, and the visual experience surrounding
                food.
              </p>
              <p>
                With over fourteen years of experience in academia and research,
                and a PhD in Electronics, her approach to photography is shaped
                by clarity, patience, and a methodical mindset. Moving from
                academia into photography felt like a natural progression,
                allowing her to pursue visual expression while retaining the
                same rigour and depth of thought. Her practice has evolved
                through mentorship, collaboration, and continued self-driven
                exploration.
              </p>
              <p>
                Food remains at the core of her work, offering a space to
                explore art through everyday subjects. Images develop gradually,
                with careful attention to styling, texture, light, and mood.
                Lifestyle, product, and portrait projects extend naturally from
                this foundation, with a collaborative process that translates a
                brand’s intent into thoughtful, cohesive visuals.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
