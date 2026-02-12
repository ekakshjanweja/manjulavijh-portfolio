import { HeroSection } from "@/components/portfolio/hero-section";
import { AboutSection } from "@/components/portfolio/about-section";
import { SignatureWork } from "@/components/portfolio/signature-work";
import { CategoriesSection } from "@/components/portfolio/categories-section";
import { ClientsSection } from "@/components/portfolio/clients-section";
import { ContactSection } from "@/components/portfolio/contact-section";

export default function Portfolio() {
  return (
    <div className="page-shell">
      <HeroSection />
      <AboutSection />
      {/* <WorkSection /> */}
      <SignatureWork />
      <CategoriesSection />
      <ClientsSection />
      {/* <LearningSection /> */}
      <ContactSection />
    </div>
  );
}
