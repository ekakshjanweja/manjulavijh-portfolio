"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/public/images/hero-food.jpg";
import Image from "next/image";
import { useRef } from "react";

export const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative z-0 h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background Image */}
      <motion.div className="absolute inset-0 z-0" style={{ y: imageY }}>
        <Image
          src={heroImage}
          alt="Food photography by Manjula Vijh"
          className="w-full h-[120%] object-cover object-top"
          priority
          placeholder="blur"
        />
      </motion.div>

      {/* Gradient Overlays for depth */}
      <div className="absolute inset-0 z-0 bg-linear-to-t from-black/70 via-black/30 to-black/10" />
      <div className="absolute inset-0 z-0 bg-linear-to-r from-black/20 to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-semibold leading-[0.95] tracking-tight mb-6"
        >
          Manjula Vijh
        </motion.h1> */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-white/80 text-xl md:text-2xl font-serif italic mb-3"
        >
          Visual storyteller for culinary &amp; lifestyle brands
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-white/55 text-sm md:text-base max-w-lg mx-auto mb-12 leading-relaxed"
        >
          Based in New Delhi. Creating refined, light-rich imagery that elevates
          food, products, and everyday moments into timeless visuals.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={() => scrollToSection("#portfolio")}
            variant="hero"
            size="default"
            className="min-w-44 rounded-none"
          >
            View Portfolio
          </Button>
          <Button
            onClick={() => scrollToSection("#contact")}
            variant="heroOutline"
            size="default"
            className="min-w-44 rounded-none"
          >
            Get in Touch
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollToSection("#about")}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/40 hover:text-white/70 transition-colors"
          aria-label="Scroll to about section"
        >
          <ChevronDown size={24} strokeWidth={1.5} />
        </motion.button>
      </motion.div>
    </section>
  );
};
