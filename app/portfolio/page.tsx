import { AboutSection } from "@/components/portfolio/about-section";
import { ClientsSection } from "@/components/portfolio/clients-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { Footer } from "@/components/portfolio/footer";
import { HeroSection } from "@/components/portfolio/hero-section";
import { LearningSection } from "@/components/portfolio/learning-section";
import { Navbar } from "@/components/portfolio/navbar";
import { ProjectsCarousel } from "@/components/portfolio/projects-carousel";
import { ServicesSection } from "@/components/portfolio/service-section";
import { WorkSection } from "@/components/portfolio/work-section";

export default function Portfolio() {
  return (
    <div className="page-shell">
      <HeroSection />
      <AboutSection />
      {/* <WorkSection /> */}
      <ProjectsCarousel />
      <ClientsSection />
      {/* <LearningSection /> */}
      <ContactSection />
      <Footer />
    </div>
  );
}
