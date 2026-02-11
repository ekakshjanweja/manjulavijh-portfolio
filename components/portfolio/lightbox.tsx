"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useCallback } from "react";

interface LightboxItem {
  id: number;
  image: StaticImageData;
  title: string;
  category: string;
  description?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) => {
  const currentItem = items[currentIndex];

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, goNext, goPrev]);

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="lightbox-overlay flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-none bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
            aria-label="Close lightbox"
          >
            <X size={20} strokeWidth={1.5} />
          </motion.button>

          {/* Navigation arrows */}
          {items.length > 1 && (
            <>
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-4 md:left-8 z-10 w-10 h-10 rounded-none bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-4 md:right-8 z-10 w-10 h-10 rounded-none bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
                aria-label="Next image"
              >
                <ChevronRight size={20} strokeWidth={1.5} />
              </motion.button>
            </>
          )}

          {/* Image container */}
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-5xl w-full mx-4 md:mx-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-4/3 md:aspect-16/10 overflow-hidden rounded-none">
              <Image
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full object-contain"
                placeholder="blur"
              />
            </div>

            {/* Caption */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-6 text-center"
            >
              <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-2">
                {currentItem.category}
              </p>
              <h3 className="font-serif text-xl md:text-2xl text-white font-semibold">
                {currentItem.title}
              </h3>
              {currentItem.description && (
                <p className="text-white/50 text-sm mt-2 max-w-lg mx-auto">
                  {currentItem.description}
                </p>
              )}
              <p className="text-white/25 text-xs mt-4">
                {currentIndex + 1} / {items.length}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
