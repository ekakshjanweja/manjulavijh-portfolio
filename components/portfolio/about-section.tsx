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
    <section
      id="about"
      ref={ref}
      className="section-padding bg-background overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-kicker text-accent text-2xl md:text-3xl lg:text-5xl mb-4 font-semibold">
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

        <div className="about-grid-fix grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 lg:items-center">
          {/* Image carousel -- takes 2 columns */}
          <div className="about-image-container lg:col-span-2 min-w-0 flex justify-center lg:justify-start">
            <AnimatedImages images={images} autoplay />
          </div>

          {/* Content -- takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 lg:pl-8 min-w-0"
          >
            <div className="mx-auto space-y-5 text-justify text-muted-foreground leading-relaxed text-base">
              <p>
                Manjula’s journey into photography began at home, through a
                simple love for baking. Photographing her own bakes slowly
                became a way of paying attention, not just to the food itself,
                but to how things looked, felt, and came together visually. Over
                time, this grew into a deeper interest in food, form, and
                presentation, and later expanded to include products and styled
                scenes, influenced by a broader curiosity for art, creativity,
                and visual balance. This meant noticing the small details around
                how subjects are framed, styled, and composed, and how these
                choices shape the way they are experienced. What began as a
                personal habit gradually turned into a focused photographic
                practice shaped by curiosity, observation, and hands-on
                exploration.
              </p>
              <p>
                With over fourteen years of experience in academia and research,
                and holding a PhD in Electronics, her way of working carries a
                sense of patience, structure, and clarity. Largely self-taught,
                she has learned through consistent practice, experimentation,
                and guidance from experienced photographers and stylists along
                the way. Food continues to be a constant presence in her work,
                alongside product and conceptual explorations, offering space to
                work with aesthetics, mood, and visual storytelling through
                everyday subjects. Over the years, she has built an extensive
                and evolving collection of props, surfaces, and objects,
                particularly for food and product photography, which naturally
                support her styling process. Images are developed gradually,
                with attention to composition, light, and shadow, allowing
                texture, mood, and nuance to emerge with care. When working with
                clients, the approach is collaborative and thoughtful,
                translating ideas and intent into visuals that feel cohesive,
                purposeful, and true to the brand.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
