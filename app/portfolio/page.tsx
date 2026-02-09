import { AboutSection } from "@/components/portfolio/about-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { Footer } from "@/components/portfolio/footer";
import { HeroSection } from "@/components/portfolio/hero-section";
import { LearningSection } from "@/components/portfolio/learning-section";
import { Navbar } from "@/components/portfolio/navbar";
import { ServicesSection } from "@/components/portfolio/service-section";
import { WorkSection } from "@/components/portfolio/work-section";

export default function Portfolio() {
  return (
    <div className="page-shell">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <ServicesSection />
      <LearningSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
