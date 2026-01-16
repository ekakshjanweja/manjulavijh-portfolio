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
    { icon: Camera, value: "500+", label: "Projects Completed" },
    { icon: Award, value: "10+", label: "Years Experience" },
    { icon: Heart, value: "150+", label: "Happy Clients" },
  ];

  return (
    <section id="about" ref={ref} className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-4/5 overflow-hidden rounded-lg">
              <Image
                src={photographerPortrait}
                alt="Manjula Vijh - Food & Product Photographer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-accent rounded-lg -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-accent text-sm uppercase tracking-[0.2em] mb-F4 font-medium">
              About Me
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold mb-6">
              The Art of Visual Storytelling
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Hello! I&apos;m Manjula Vijh, a passionate food and product
                photographer based in India. With over a decade of experience, I
                specialize in creating stunning visual narratives that bring
                brands to life and make viewers hungry for more.
              </p>
              <p>
                My journey began with a simple love for food and aesthetics.
                Today, I work with restaurants, food brands, lifestyle
                companies, and entrepreneurs to craft images that not only
                showcase products but tell compelling stories.
              </p>
              <p>
                Every shoot is an opportunity to blend creativity with technical
                precision, ensuring that each image captures the perfect mood,
                texture, and emotion. I believe great photography is about
                connection—between the product and its audience.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
