"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Award, Heart } from "lucide-react";
import photographerPortrait from "@/public/images/photographer-portrait.jpg";
import Image from "next/image";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: Camera, value: "500+", label: "Projects" },
    { icon: Award, value: "10+", label: "Years" },
    { icon: Heart, value: "150+", label: "Clients" },
  ];

  return (
    <section id="about" ref={ref} className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
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

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Image -- takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-none shadow-2xl shadow-black/10">
              <Image
                src={photographerPortrait}
                alt="Manjula Vijh - Food & Product Photographer"
                className="w-full h-full object-cover"
                placeholder="blur"
              />
              {/* Subtle gold frame accent */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-none" />
            </div>
          </motion.div>

          {/* Content -- takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold tracking-tight mb-8 leading-tight">
              The Art of
              <br />
              <span className="text-gold">Visual Storytelling</span>
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
              <p>
                Hello, I&apos;m Manjula Vijh, a photographer shaped by years of
                learning, teaching, and quiet observation.
              </p>
              <p>
                With 14 years of experience as a university educator and a PhD,
                my journey reflects a deep commitment to learning, discipline,
                and creative exploration.
              </p>
              <p>
                Choosing to follow my lifelong passion, I transitioned from
                academia to photography, where I now create refined,
                story-driven images that connect brands with their audience
                through light, detail, and emotion.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-10 pt-10 border-t border-border/50">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-5 h-5 text-accent mx-auto mb-2 opacity-70" />
                  <p className="font-serif text-3xl md:text-4xl font-semibold text-foreground leading-none">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
