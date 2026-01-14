"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const IMAGES = [
  "/images/carousel-one.jpg",
  "/images/carousel-two.jpg",
  "/images/carousel-three.jpg",
  "/images/carousel-four.jpg",
  "/images/carousel-five.jpg",
];

interface ParallaxBackgroundProps {
  progress?: MotionValue<number>;
}

function ProgressDot({
  progress,
  index,
  total,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const step = 1 / total;
  const scaleY = useTransform(
    progress,
    [index * step, (index + 1) * step],
    [0, 1]
  );

  return (
    <div className="h-8 bg-muted overflow-hidden rounded-full">
      <motion.div
        className="w-full h-full bg-foreground origin-top"
        style={{ scaleY }}
      />
    </div>
  );
}

function ProgressIndicator({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  return (
    <motion.div
      className="fixed top-1/2 right-6 md:right-10 -translate-y-1/2 z-50 flex flex-col gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <ProgressDot key={i} progress={progress} index={i} total={total} />
      ))}
    </motion.div>
  );
}

function ParallaxImage({
  src,
  index,
  total,
  progress,
}: {
  src: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isMobile: boolean;
}) {
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;
  const isLast = index === total - 1;
  const isFirst = index === 0;

  const overlap = 0.08;

  const opacity = useTransform(
    progress,
    isFirst
      ? [0, 0.02, 0.1, end - overlap, end + overlap]
      : isLast
      ? [start - overlap, start + overlap, 1]
      : [start - overlap, start + overlap, end - overlap, end + overlap],
    isFirst ? [0.15, 0.15, 1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    isFirst
      ? [0, 0.02, 0.12, end - overlap, end + overlap]
      : isLast
      ? [start - overlap, start + overlap, 1]
      : [start - overlap, start + overlap, end - overlap, end + overlap],
    isFirst
      ? ["40%", "40%", "0%", "0%", "-6%"]
      : isLast
      ? ["6%", "0%", "0%"]
      : ["6%", "0%", "0%", "-6%"]
  );

  const scale = useTransform(
    progress,
    isFirst
      ? [0, 0.02, 0.12, end - overlap, end + overlap]
      : isLast
      ? [start - overlap, start + overlap, 1]
      : [start - overlap, start + overlap, end - overlap, end + overlap],
    isFirst
      ? [0.8, 0.8, 1, 1, 0.97]
      : isLast
      ? [0.97, 1, 1]
      : [0.97, 1, 1, 0.97]
  );

  const blur = useTransform(
    progress,
    isFirst
      ? [0, 0.02, 0.1]
      : isLast
      ? [start - overlap, start + overlap, 1]
      : [start - overlap, start + overlap, end - overlap, end + overlap],
    isFirst ? [2, 2, 0] : isLast ? [0, 0, 0] : [0, 0, 0, 0]
  );

  const filterBlur = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.div
      style={{ opacity, y, scale, filter: filterBlur }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div className="relative aspect-square w-[75vw] md:w-[40vw] overflow-hidden shadow-2xl">
        <Image
          src={src}
          alt={`Portfolio work ${index + 1}`}
          fill
          className="object-cover"
          priority={index === 0}
        />
      </div>

      {/* Image index indicator */}
      <motion.div
        className="absolute bottom-[calc(50%-35vh)] md:bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-muted-foreground font-light"
        style={{ opacity }}
      >
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </motion.div>
    </motion.div>
  );
}

export function ParallaxBackground({ progress }: ParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress: localProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const activeProgress = progress || localProgress;

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-background snap-y snap-mandatory md:snap-none"
      style={{ height: isMobile ? `${IMAGES.length * 100}vh` : "400vh" }}
    >
      {/* Snap sections for mobile */}
      {IMAGES.map((_, i) => (
        <div
          key={i}
          className="absolute w-full h-screen snap-start snap-always md:snap-align-none"
          style={{ top: `${i * 100}vh` }}
        />
      ))}

      {/* Progress indicator */}
      <ProgressIndicator progress={activeProgress} total={IMAGES.length} />

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {IMAGES.map((src, index) => (
          <ParallaxImage
            key={src}
            src={src}
            index={index}
            total={IMAGES.length}
            progress={activeProgress}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
}
