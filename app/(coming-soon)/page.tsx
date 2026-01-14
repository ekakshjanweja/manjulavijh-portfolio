"use client";

import { ParallaxBackground } from "@/components/coming-soon/parallax-background";
import { CustomCursor } from "@/components/coming-soon/custom-cursor";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function ComingSoon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: isMobile ? 60 : 100,
    damping: isMobile ? 45 : 30,
    restDelta: 0.001,
  });

  const titleOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);
  const titleScale = useTransform(smoothProgress, [0, 0.05], [1, 0.95]);

  // Drag to scroll implementation (Desktop only)
  useEffect(() => {
    let isDragging = false;
    let startY = 0;
    let scrollTop = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startY = e.pageY - (containerRef.current?.offsetTop || 0);
      scrollTop = window.scrollY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || isMobile) return;
      e.preventDefault();
      const y = e.pageY - (containerRef.current?.offsetTop || 0);
      const walk = (y - startY) * 2; // Scroll speed multiplier
      window.scrollTo({
        top: scrollTop - walk,
        behavior: "auto",
      });
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  return (
    <main
      ref={containerRef}
      className="relative w-full bg-background no-scrollbar select-none md:cursor-none"
    >
      <CustomCursor />
      <ParallaxBackground progress={smoothProgress} />

      {/* Content Overlay - Sticky */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex min-h-screen flex-col justify-between p-8 md:p-16 pointer-events-auto"
        >
          {/* Main Title - Centered initially, fades out on scroll */}
          <motion.div
            style={{ opacity: titleOpacity, scale: titleScale }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <span className="font-display text-4xl md:text-6xl text-muted-foreground tracking-wide mb-2">
              coming soon
            </span>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-normal tracking-[0.2em] text-foreground uppercase">
              Manjula Vijh
            </h1>
          </motion.div>

          {/* Credits - Right Side */}
          <div className="absolute right-8 md:right-16 bottom-1/4 text-right hidden md:block">
            <p className="text-xs text-muted-foreground italic mb-1">
              Based in
            </p>
            <p className="text-sm text-foreground font-medium tracking-wide">
              New Delhi, India
            </p>
          </div>

          {/* Bottom Section */}
          <div className="flex items-end justify-between">
            <p className="text-[10px] text-muted-foreground max-w-xs uppercase tracking-[0.4em]">
              Culinary Artistry
            </p>

            {/* Mobile Credits */}
            <div className="text-right md:hidden">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                New Delhi, India
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
