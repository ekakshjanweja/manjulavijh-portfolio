"use client";

import Masonry from "react-masonry-css";
import Image from "next/image";

type ImageItem = {
  id: number;
  src: string;
  size?: "small" | "medium" | "large";
  shape?: "square" | "portrait";
};

type Props = {
  images: ImageItem[];
};

export default function MasonryGrid({ images }: Props) {
  const breakpoints = {
    // default: 4,
    // 1280: 3,
    default: 3,
    1024: 2,
    640: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpoints}
      className="flex gap-2"
      columnClassName="flex flex-col gap-2"
    >
      {images.map((item, index) => {
        // const sizeClass =
        //   item.size === "large"
        //     ? "aspect-[4/5]"
        //     : item.size === "medium"
        //       ? "aspect-[1/1.2]"
        //       : "aspect-square";

        // const shapeClass =
        //   item.shape === "portrait" ? "aspect-[3/4]" : "aspect-square";
        const sizeClass =
          item.size === "large"
            ? "aspect-[3/4]"
            : item.size === "medium"
              ? "aspect-[4/5]"
              : "aspect-square";

        const shapeClass =
          item.shape === "portrait" ? "aspect-[2/3]" : "aspect-square";

        return (
          <div
            key={item.id}
            className={`relative overflow-hidden group ${
              item.size ? sizeClass : shapeClass
            }`}
          >
            <Image
              src={item.src}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              // sizes="(max-width:768px) 100vw, 25vw"
              sizes="(max-width:640px) 100vw,
       (max-width:1024px) 50vw,
       33vw"
              quality={72}
              loading="lazy"
            />
          </div>
        );
      })}
    </Masonry>
  );
}
