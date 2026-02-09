"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/public/images/hero-food.jpg";
import Image from "next/image";

export const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Food photography by Manjula Vijh"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="section-kicker text-gold text-xs md:text-sm uppercase mb-6 font-semibold"
        >
          Food + Product Photography
        </motion.p> */}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-semibold leading-tight tracking-tight mb-4"
        >
          Manjula Vijh
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-white/85 text-lg md:text-2xl font-serif italic mb-3"
        >
          Visual storyteller for culinary and lifestyle brands
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-10"
        >
          Based in New Delhi. I build refined, light-rich imagery that makes
          everyday moments feel editorial and timeless.
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
            className="min-w-45 bg-[#ca8a04]! text-white! hover:bg-[#ca8a04]/90! shadow-lg hover:shadow-xl"
          >
            View Portfolio
          </Button>
          <Button
            onClick={() => scrollToSection("#contact")}
            variant="heroOutline"
            size="default"
            className="min-w-45 border-white/80! text-white! hover:bg-white/10!"
          >
            Get in Touch
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollToSection("#about")}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/60 hover:text-white transition-colors"
          aria-label="Scroll to about section"
        >
          <ArrowDown size={28} />
        </motion.button>
      </motion.div>
    </section>
  );
};
