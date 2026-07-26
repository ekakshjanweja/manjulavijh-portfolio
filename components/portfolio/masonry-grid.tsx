"use client";

import Masonry from "react-masonry-css";
import Image from "next/image";
import { useCallback, useState } from "react";
import dynamic from "next/dynamic";

const Lightbox = dynamic(
  () => import("./lightbox").then((mod) => mod.Lightbox),
  { ssr: false },
);

type ImageItem = {
  id: string;
  src: string;
};

type Props = {
  images: ImageItem[];
};

export default function MasonryGrid({ images }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const navigateLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const lightboxItems = images.map((image) => ({
    id: image.id,
    image: image.src,
  }));

  const breakpoints = {
    default: 3,
    1024: 2,
    640: 1,
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpoints}
        className="flex gap-2"
        columnClassName="flex flex-col gap-2"
      >
        {images.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => openLightbox(index)}
            className="group relative overflow-hidden text-left"
          >
            <Image
              src={item.src}
              alt=""
              width={0}
              height={0}
              sizes="(max-width:640px) 100vw,
                     (max-width:1024px) 50vw,
                     33vw"
              className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              quality={75}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-charcoal/70 via-charcoal/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        ))}
      </Masonry>

      <Lightbox
        items={lightboxItems}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </>
  );
}
