"use client";

import {
  motion,
  useSpring,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function CustomCursor() {
  const cursorX = useMotionValue(-1000);
  const cursorY = useMotionValue(-1000);
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const springConfig = { damping: 100, stiffness: 500 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const { scrollYProgress } = useScroll();
  // If in top 50% scroll down, point DOWN (180deg). If in bottom 50%, point UP (0deg).
  const arrowRotate = useTransform(scrollYProgress, [0.45, 0.55], [180, 0]);
  const smoothRotate = useSpring(arrowRotate, {
    stiffness: 80,
    damping: 20,
  });

  useEffect(() => {
    if (!mounted || isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY, isMobile]);

  if (!mounted || isMobile) return null;

  return (
    <motion.div
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        left: -16,
        top: -16,
      }}
      className="fixed z-100 flex items-center justify-center pointer-events-none mix-blend-difference"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white">
        <motion.div style={{ rotate: smoothRotate }}>
          <ArrowUp className="w-4 h-4 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
}
