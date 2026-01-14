import ComingSoonHero from "@/components/coming-soon/hero";
import HeroImageCarousel from "@/components/coming-soon/hero-image-carousel";

export default function ComingSoon() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <HeroImageCarousel />
      <ComingSoonHero />
    </div>
  );
}
