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

        <div className="about-grid-fix grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
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
            <div className="mx-auto space-y-5 text-center lg:text-left text-muted-foreground leading-relaxed text-base">
              <p>
                Manjula&apos;s journey into photography began quietly at home,
                through a love for baking. What started as documenting her own
                bakes soon became an exploration of food, form, and
                presentation. Over time, attention shifted from the act of
                baking itself to the visual details around it, how food is
                styled, composed, and experienced, turning a personal interest
                into a deeper visual pursuit. With over fourteen years of
                experience in academia and research, and holding a PhD in
                Electronics, her approach to photography is shaped by clarity,
                patience, and a methodical way of working. The transition from
                an academic career into photography felt like a natural shift,
                allowing her to follow a long-standing passion for food and
                visual expression while retaining rigour and depth of thought.
                Her practice has evolved through learning under experienced
                photographers and stylists, alongside sustained self-driven
                exploration.
              </p>
              <p>
                Food remains at the heart of her work, offering a space to
                explore art and aesthetics through everyday subjects. Images are
                built gradually, with attention to styling, composition, and
                texture, allowing light, shadow, and mood to emerge intuitively.
                The work favours subtle narratives and visual restraint,
                allowing nuance and detail to take precedence. Lifestyle,
                product, and portrait work flow naturally from this foundation.
                When working with clients, the process is collaborative and
                thoughtful, translating context and intent into visuals that
                feel cohesive, purposeful, and aligned with the brand&apos;s
                identity.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
