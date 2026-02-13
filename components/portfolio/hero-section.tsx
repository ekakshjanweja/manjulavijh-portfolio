"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef } from "react";
import carouselOne from "@/public/images/carousel/carousel-one.jpg";
import carouselTwo from "@/public/images/carousel/carousel-two.jpg";
import carouselThree from "@/public/images/carousel/carousel-three.jpg";
import carouselFour from "@/public/images/carousel/carousel-four.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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
        className="relative z-0 h-screen flex items-center justify-center overflow-hidden bg-black bg-cover bg-center"
        style={{ backgroundImage: `url(${carouselTwo.src})` }}
      >
      {/* Parallax Background Image */}
      <motion.div className="absolute inset-0 z-0" style={{ y: imageY }}>
          <Carousel
            className="-mt-4"
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 3000 })]}
          >
            <CarouselContent className="ml-0">
              <CarouselItem className="flex justify-center pl-0">
              <div className="relative w-full h-screen bg-black">
                <Image
                  src={carouselTwo}
                  alt="Food photography by Manjula Vijh"
                  fill
                  priority
                  fetchPriority="high"
                  placeholder="blur"
                  sizes="100vw"
                  className="object-cover object-top"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="flex justify-center pl-0">
              <div className="relative w-full h-screen bg-black">
                <Image
                  src={carouselOne}
                  alt="Food photography by Manjula Vijh"
                  fill
                  placeholder="blur"
                  sizes="100vw"
                  className="object-cover object-top"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="flex justify-center pl-0">
              <div className="relative w-full h-screen bg-black">
                <Image
                  src={carouselThree}
                  alt="Food photography by Manjula Vijh"
                  fill
                  placeholder="blur"
                  sizes="100vw"
                  className="object-cover object-top"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="flex justify-center pl-0">
              <div className="relative w-full h-screen bg-black">
                <Image
                  src={carouselFour}
                  alt="Food photography by Manjula Vijh"
                  fill
                  placeholder="blur"
                  sizes="100vw"
                  className="object-cover object-top"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
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
          className="text-white/80 text-4xl md:text-4xl font-bold font-serif mb-3"
        >
          Culinary and Lifestyle Photography
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-white/65 text-lg md:text-xl max-w-lg font-serif mx-auto mb-12 leading-relaxed"
        >
          Thoughtful work across food, products, and everyday moments, shaped
          into timeless visuals.
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
            className="w-full sm:w-auto sm:min-w-44 rounded-none dark:text-white!"
          >
            View Portfolio
          </Button>
          <Button
            onClick={() => scrollToSection("#contact")}
            variant="heroOutline"
            size="default"
            className="w-full sm:w-auto sm:min-w-44 rounded-none text-white! border-white! "
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
