"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Award, Heart } from "lucide-react";
import photographerPortrait from "@/public/images/photographer-portrait.jpg";
import Image from "next/image";
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
          <p className="section-kicker text-accent text-xs uppercase mb-4 font-semibold">
            About
          </p>
          <div className="section-divider mb-6" />
        </motion.div>

        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold tracking-tight leading-tight">
            The Art of
            <br />
            <span className="text-gold">Visual Storytelling</span>
          </h2>
        </div>

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
                Manjula&apos;s journey into photography began quietly at home,
                through a love for baking. What started as documenting her own
                bakes soon became an exploration of food, form, and
                presentation. Over time, attention shifted from the act of
                baking itself to the visual details around it, how food is
                styled, composed, and experienced, turning a personal interest
                into a deeper visual pursuit.
              </p>
              <p>
                With over fourteen years of experience in academia and research,
                and holding a PhD in Electronics, her approach to photography is
                shaped by clarity, patience, and a methodical way of working.
                The transition from an academic career into photography felt
                like a natural and timely shift, allowing her to follow a
                long-standing passion for food and visual expression, while
                retaining the same rigour and depth of thought.
              </p>
              <p>
                Along the way, her practice has been shaped through learning
                under experienced photographers and stylists, alongside
                sustained self-driven exploration. This balance of mentorship,
                study, and independent practice continues to inform her evolving
                visual language.
              </p>
              <p>
                Food remains at the heart of her work. It offers a space to
                explore ideas of art and aesthetics through everyday subjects.
                Her images are built gradually, paying attention to styling,
                composition, and texture, while allowing light, shadow, and mood
                to emerge intuitively. The approach remains understated, guided
                by nuance, detail, and quiet storytelling. Lifestyle, product,
                and portrait work flow naturally from this foundation, guided by
                the same sensitivity and attention to detail.
              </p>
              <p>
                When working with clients, the process is collaborative and
                thoughtful. Each project begins with understanding context,
                purpose, and vision, followed by a careful translation into
                visuals that feel cohesive, purposeful, and authentic. The focus
                remains on creating work that aligns with the brand&apos;s
                identity while maintaining a distinct point of view.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
