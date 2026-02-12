"use client";

import { useState } from "react";

type ImageItem = {
  id: number;
  src: string;
  alt: string;
  size: "small" | "medium" | "large" | "portrait" | "square";
};

// Generate 80 demo images with mixed sizes
const generateImages = (): ImageItem[] => {
  const sizes: ImageItem["size"][] = [
    "small",
    "medium",
    "large",
    "portrait",
    "square",
  ];
  const subjects = [
    "nature",
    "architecture",
    "city",
    "mountain",
    "ocean",
    "forest",
    "desert",
    "bridge",
    "building",
    "sunset",
    "flower",
    "street",
    "lake",
    "snow",
    "rain",
    "garden",
    "tower",
    "road",
    "field",
    "cloud",
  ];

  return Array.from({ length: 80 }, (_, i) => {
    const size = sizes[i % sizes.length];
    const subject = subjects[i % subjects.length];
    const w =
      size === "portrait"
        ? 400
        : size === "large"
          ? 900
          : size === "square"
            ? 600
            : size === "medium"
              ? 800
              : 600;
    const h =
      size === "portrait"
        ? 600
        : size === "large"
          ? 600
          : size === "square"
            ? 600
            : size === "medium"
              ? 600
              : 400;
    return {
      id: i + 1,
      src: `https://picsum.photos/seed/${subject}${i}/${w}/${h}`,
      alt: `${subject} photo ${i + 1}`,
      size,
    };
  });
};

const sizeClasses: Record<ImageItem["size"], string> = {
  small: "row-span-1",
  medium: "row-span-2",
  large: "row-span-3",
  portrait: "row-span-3",
  square: "row-span-2",
};

const images = generateImages();

const ImageGrid = () => {
  const [loaded, setLoaded] = useState<Set<number>>(new Set());

  // Split into 3 columns for masonry
  const columns: ImageItem[][] = [[], [], []];
  images.forEach((img, i) => columns[i % 3].push(img));

  return (
    <div className="w-full max-w-450 mx-auto px-4 -mt-58 sm:px-6 lg:px-8 py-8">

      {/* Masonry grid: 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="break-inside-avoid mb-3 sm:mb-4 group relative overflow-hidden "
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              onLoad={() => setLoaded((prev) => new Set(prev).add(img.id))}
              className={`w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 ${
                loaded.has(img.id) ? "opacity-100" : "opacity-0"
              }`}
            />
            {!loaded.has(img.id) && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-3 left-3 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md">
              {img.alt}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
