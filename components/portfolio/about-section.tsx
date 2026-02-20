"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const AnimatedImages = dynamic(
  () =>
    import("@/components/ui/animated-images").then((mod) => mod.AnimatedImages),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-9/11 w-full max-w-72 sm:max-w-80 md:max-w-96 lg:max-w-104" />
    ),
  },
);

export const AboutSection = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "-100px 0px", threshold: 0.1 },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const images = [
    {
      src: "/images/aboutme/aboutme1.jpg",
    },
    {
      src: "/images/aboutme/aboutme2.jpg",
    },
    {
      src: "/images/aboutme/aboutme3.jpg",
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding bg-background overflow-x-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 lg:px-14">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="section-kicker text-accent text-2xl md:text-3xl lg:text-5xl mb-4 font-semibold">
            About Dr. Manjula Vijh
          </p>
          {/* <h1 className=" font-serif text-black/75 text-3xl  mb-4 font-semibold">
            About Dr. Manjula Vijh
          </h1> */}
          <div className="section-divider mb-6" />
        </div>

        {/* <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold tracking-tight leading-tight">
            The Art of
            <br />
            <span className="text-gold">Visual Storytelling</span>
          </h2>
        </div> */}

        <div className="about-grid-fix grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 lg:items-center">
          {/* Image carousel -- takes 2 columns */}
          <div className="about-image-container lg:col-span-2 min-w-0 w-full flex justify-center lg:justify-start">
            <AnimatedImages images={images} autoplay />
          </div>

          {/* Content -- takes 3 columns */}
          <div
            className={`lg:col-span-3 lg:pl-4 min-w-0 transition-all duration-700 ease-out delay-150 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            }`}
          >
            <div className="mx-auto space-y-5 text-justify text-muted-foreground leading-relaxed text-base">
              <p>
                Manjula’s journey into photography began at home through a
                simple love for baking. Photographing her own bakes became a way
                of noticing how food looked, felt, and came together visually,
                gradually growing into a deeper interest in food, form, and
                presentation. Over time, this curiosity expanded to include
                products and styled scenes, shaped by an ongoing interest in
                art, creativity, and visual balance.
              </p>
              <p>
                She holds a PhD in Electronics and spent over fourteen years in
                academia and research before choosing to pursue photography more
                fully. While this background brings patience and clarity to her
                process, her creative work is driven by intuition,
                experimentation, and hands-on exploration rather than academic
                frameworks.
              </p>
              <p>
                Largely self-taught, and shaped through continuous practice and
                learning from experienced photographers and stylists, her work
                continues to evolve. Food remains central to her practice,
                alongside product and conceptual imagery. While working with
                brands, the approach is collaborative and considered, with close
                attention to composition, light, mood, and detail, resulting in
                visuals that feel intentional, cohesive, and aligned with the
                brand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
