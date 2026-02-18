"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Image = {
  src: string;
};

export const AnimatedImages = ({
  images,
  autoplay = false,
}: {
  images: Image[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(true);

  const presetRotations = [-8, 6, -4, 9, -7, 5];

  const handleNext = () => {
    setActive((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + images.length) % images.length);
  };

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "200px 0px", threshold: 0.1 },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay || !isInView) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, images.length, isInView]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      <div className="relative aspect-9/11 w-full max-w-72 sm:max-w-80 md:max-w-96 lg:max-w-104 mx-auto">
        <AnimatePresence>
          {images.map((image, index) => {
            if (!isActive(index)) return null;
            const rotation = presetRotations[index % presetRotations.length];

            return (
              <motion.div
                key={image.src}
                initial={{
                  opacity: 0,
                  scale: 0.96,
                  rotate: rotation,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.98,
                  rotate: rotation,
                }}
                transition={{
                  duration: 0.35,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 origin-bottom"
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 420px"
                  className="object-cover object-center"
                  draggable={false}
                  loading="lazy"
                  quality={72}
                  priority={false}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <div className="flex justify-center items-center gap-4 mt-4 w-full">
        <button
          onClick={handlePrev}
          className="flex size-8 items-center justify-center border border-input bg-background hover:border-accent hover:bg-accent/5 transition delay-100 disabled:pointer-events-none disabled:opacity-50"
        >
          <IconArrowLeft className="h-4 w-4" />
        </button>

        <button
          onClick={handleNext}
          className="flex size-8 items-center justify-center border border-input bg-background hover:border-accent hover:bg-accent/5 transition delay-100 disabled:pointer-events-none disabled:opacity-50"
        >
          <IconArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
