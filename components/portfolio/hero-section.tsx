"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";

import Carousel_1 from "@/public/images/home_carousel/Carousel_1.jpg";
import Carousel_2 from "@/public/images/home_carousel/Carousel_2.jpg";
import Carousel_3 from "@/public/images/home_carousel/Carousel_3.jpg";
import Carousel_4 from "@/public/images/home_carousel/Carousel_4.jpg";
import Carousel_5 from "@/public/images/home_carousel/Carousel_5.jpg";

const HeroCarouselFallback = () => (
  <div className="relative h-svh min-h-svh bg-black">
    <Image
      src={Carousel_1}
      alt="Food photography by Manjula Vijh"
      fill
      priority
      placeholder="blur"
      quality={75}
      sizes="100vw"
      className="object-cover object-top"
    />
  </div>
);

const Carousel = dynamic(
  () => import("@/components/ui/carousel").then((mod) => mod.Carousel),
  { ssr: false, loading: () => <HeroCarouselFallback /> },
);
const CarouselContent = dynamic(
  () => import("@/components/ui/carousel").then((mod) => mod.CarouselContent),
  { ssr: false },
);
const CarouselItem = dynamic(
  () => import("@/components/ui/carousel").then((mod) => mod.CarouselItem),
  { ssr: false },
);
const CarouselPrevious = dynamic(
  () => import("@/components/ui/carousel").then((mod) => mod.CarouselPrevious),
  { ssr: false },
);
const CarouselNext = dynamic(
  () => import("@/components/ui/carousel").then((mod) => mod.CarouselNext),
  { ssr: false },
);

export const HeroSection = () => {
  const ref = useRef<HTMLElement | null>(null);
  const autoplayRef = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", isMobile || prefersReducedMotion ? "0%" : "20%"],
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  useEffect(() => {
    if (!pendingScroll) return;
    const element = document.querySelector(pendingScroll);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setPendingScroll(null);
  }, [pendingScroll]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative z-0 h-svh min-h-svh flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Parallax Background Image */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: imageY, willChange: "transform" }}
        >
          <Carousel
            className="h-full"
            opts={{ loop: true }}
            plugins={[autoplayRef.current]}
          >
            <CarouselContent className="ml-0">
              <CarouselItem className="flex justify-center pl-0">
                <div className="relative w-full h-svh min-h-svh bg-black">
                  <Image
                    src={Carousel_1}
                    alt="Food photography by Manjula Vijh"
                    fill
                    priority
                    placeholder="blur"
                    quality={75}
                    sizes="100vw"
                    className="object-cover object-top"
                  />
                </div>
              </CarouselItem>

              <CarouselItem className="flex justify-center pl-0">
                <div className="relative w-full h-svh min-h-svh bg-black">
                  <Image
                    src={Carousel_2}
                    alt="Food photography by Manjula Vijh"
                    fill
                    loading="lazy"
                    placeholder="empty"
                    quality={75}
                    sizes="100vw"
                    className="object-cover object-top"
                  />
                </div>
              </CarouselItem>

            <CarouselItem className="flex justify-center pl-0">
              <div className="relative w-full h-svh min-h-svh bg-black">
                  <Image
                    src={Carousel_3}
                    alt="Food photography by Manjula Vijh"
                    fill
                    loading="lazy"
                    placeholder="empty"
                    quality={75}
                    sizes="100vw"
                    className="object-cover object-top"
                  />
                </div>
              </CarouselItem>

            <CarouselItem className="flex justify-center pl-0">
              <div className="relative w-full h-svh min-h-svh bg-black">
                  <Image
                    src={Carousel_4}
                    alt="Food photography by Manjula Vijh"
                    fill
                    loading="lazy"
                    placeholder="empty"
                    quality={75}
                    sizes="100vw"
                    className="object-cover object-top"
                  />
                </div>
              </CarouselItem>
            <CarouselItem className="flex justify-center pl-0">
              <div className="relative w-full h-svh min-h-svh bg-black">
                <Image
                  src={Carousel_5}
                  alt="Food photography by Manjula Vijh"
                  fill
                  loading="lazy"
                  placeholder="empty"
                  quality={75}
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
      {/* <div className="absolute inset-0 z-0 bg-linear-to-t from-black/70 via-black/30 to-black/10" />
      <div className="absolute inset-0 z-0 bg-linear-to-r from-black/20 to-transparent" /> */}
      <div className="absolute inset-0 z-0 bg-linear-to-t from-black/85 via-black/55 to-black/25" />
      <div className="absolute inset-0 z-0 bg-black/20" />

      {/* Content */}
        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          style={{ opacity: contentOpacity, y: contentY, willChange: "transform" }}
        >
        {/* <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-semibold leading-[0.95] tracking-tight mb-6"
        >
          Manjula Vijh
        </motion.h1> */}
        <p className="text-white/80 text-4xl uppercase md:text-4xl font-bold font-serif mb-3 animate-fade-in">
          Culinary and Lifestyle Photography
        </p>
        <p className="text-white/65 text-lg md:text-xl max-w-lg font-serif mx-auto mb-12 leading-relaxed animate-fade-up">
          Thoughtful work across food, products, and everyday moments, shaped
          into timeless visuals.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up">
          <Button
            onClick={() => setPendingScroll("#portfolio")}
            variant="hero"
            size="default"
            className="w-full sm:w-auto sm:min-w-44 rounded-none dark:text-white! hover:cursor-pointer"
          >
            View Portfolio
          </Button>
          <Button
            onClick={() => setPendingScroll("#contact")}
            variant="heroOutline"
            size="default"
            className="w-full sm:w-auto sm:min-w-44 rounded-none text-white! border-white! hover:cursor-pointer"
          >
            Get in Touch
          </Button>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in">
          <motion.button
            onClick={() => setPendingScroll("#portfolio")}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/40 hover:text-white/70 transition-colors"
            aria-label="Scroll to portfolio section"
          >
            <ChevronDown size={24} strokeWidth={1.5} />
          </motion.button>
        </div>
    </section>
  );
};
