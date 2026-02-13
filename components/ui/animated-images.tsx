"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

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

  const presetRotations = [-8, 6, -4, 9, -7, 5];

  const handleNext = () => {
    setActive((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + images.length) % images.length);
  };

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, images.length]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative aspect-9/11 w-72 sm:w-8 md:w-96 lg:w-110 mx-auto">
        <AnimatePresence>
          {images.map((image, index) => {
            const rotation = presetRotations[index % presetRotations.length];

            return (
              <motion.div
                key={image.src}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: rotation,
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : rotation,
                  zIndex: isActive(index) ? 40 : images.length + 2 - index,
                  y: isActive(index) ? [0, -40, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: rotation,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 origin-bottom"
              >
                <img
                  src={image.src}
                  alt=""
                  draggable={false}
                  className="h-full w-full object-cover object-center"
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
