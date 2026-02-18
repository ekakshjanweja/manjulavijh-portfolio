"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import Brand_1 from "@/public/images/signature_work/Brand_1.jpg";
import Brand_2 from "@/public/images/signature_work/Brand_2.jpg";
import Brand_3 from "@/public/images/signature_work/Brand_3.jpg";
import Brand_4 from "@/public/images/signature_work/Brand_4.jpg";
import Brand_5 from "@/public/images/signature_work/Brand_5.jpg";
import Brand_6 from "@/public/images/signature_work/Brand_6.jpg";

const Carousel = dynamic(
  () => import("@/components/ui/carousel").then((mod) => mod.Carousel),
  { ssr: false, loading: () => <div className="h-[60vh]" /> },
);
const CarouselContent = dynamic(
  () => import("@/components/ui/carousel").then((mod) => mod.CarouselContent),
  { ssr: false },
);
const CarouselItem = dynamic(
  () => import("@/components/ui/carousel").then((mod) => mod.CarouselItem),
  { ssr: false },
);
const CarouselPrevious = dynamic(
  () => import("@/components/ui/carousel").then((mod) => mod.CarouselPrevious),
  { ssr: false },
);
const CarouselNext = dynamic(
  () => import("@/components/ui/carousel").then((mod) => mod.CarouselNext),
  { ssr: false },
);

const projects = [
  {
    id: 1,
    image: Brand_1,
    title: "Unaav The Dakshin Cafe",
//    client: "Unaav The Dakshin Cafe",
  },
  {
    id: 2,
    image: Brand_2,
    title: "Ruva Organics",
  //  client: "Ruva Organics",
  },
  {
    id: 3,
    image: Brand_3,
    title: "Zimero Icecreams",
    //client: "Zimero Icecreams",
  },
  {
    id: 4,
    image: Brand_4,
    title: "Olani Candles",
    //client: "Olani Candles",
  },
  {
    id: 5,
    image: Brand_5,
    title: "Shyam Sweets",
    //client: "Shyam Sweets",
  },
  {
    id: 6,
    image: Brand_6,
    title: "Suave Bags",
    //client: "Suave Bags",
  },
];

export const SignatureWork = () => {
  const ref = useRef<HTMLElement | null>(null);
  const autoplayRef = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );
  const [isInView, setIsInView] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [carouselApi, setCarouselApi] = useState<any>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView((prev) => prev || entry.isIntersecting);
        setSectionVisible(entry.isIntersecting);
      },
      { rootMargin: "-20% 0px", threshold: 0.1 },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(media.matches);
    const handler = (event: MediaQueryListEvent) =>
      setPrefersReducedMotion(event.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    const autoplay = carouselApi.plugins()?.autoplay;
    if (!autoplay) return;

    if (!sectionVisible || prefersReducedMotion) {
      autoplay.stop();
      return;
    }

    autoplay.play();
  }, [carouselApi, sectionVisible, prefersReducedMotion]);

  return (
    <section id="portfolio" ref={ref} className="py-16 bg-background">
      {/* <div className="max-w-7xl mx-auto"> */}
      <div className="w-full px-4 sm:px-8 md:px-16">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="section-kicker text-accent text-2xl md:text-3xl lg:text-5xl mb-4 font-semibold">
            Signature Work
          </p>
          {/* <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold tracking-tight mb-5">
            Signature Work
          </h2> */}
          <div className="section-divider mb-6" />
          {/* <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Curated collaborations and photo series that define my creative
            vision.
          </p> */}
        </div>

        {/* Carousel */}
        <div
          className={`transition-all duration-700 ease-out delay-150 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full overflow-visible"
            plugins={[autoplayRef.current]}
            setApi={setCarouselApi}
          >
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem
                  key={project.id}
                  // className="pl-4 md:pl-6 basis-[102%] sm:basis-[96%] md:basis-[85%] lg:basis-[48%] xl:basis-[38%]"
                  className="pl-4 md:pl-6 basis-[102%] sm:basis-[96%] md:basis-[75%] lg:basis-[42%] xl:basis-[34%]"
                >
                  <div className="group relative">
                    {/* Image */}
                    <div className="relative aspect-3/4 sm:aspect-4/5 overflow-hidden rounded-none">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 96vw, (max-width: 1024px) 85vw, (max-width: 1280px) 48vw, 38vw"
                        loading="lazy"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        placeholder="blur"
                        quality={74}
                        priority={false}
                      />
                      {/* Subtle overlay on hover */}
                      <div className="absolute inset-0 bg-linear-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-none" />
                    </div>

                    {/* Caption */}
                    <div className="mt-4 sm:mt-5">
                      {/* <p className="text-accent text-[10px] uppercase tracking-[0.3em] mb-1.5">
                        {project.client}
                      </p> */}
                      {/* <h3 className="font-serif text-base sm:text-lg md:text-xl text-foreground font-semibold leading-snug mb-2">
                        {project.title}
                      </h3> */}
                      {/* <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 sm:line-clamp-2">
                        {project.description}
                      </p> */}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-3 mt-8 sm:mt-10">
              <CarouselPrevious className="static translate-y-0 size-9 sm:size-10 rounded-none border-border/60 hover:border-accent/50 hover:bg-accent/5" />
              <CarouselNext className="static translate-y-0 size-9 sm:size-10 rounded-none border-border/60 hover:border-accent/50 hover:bg-accent/5" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};
