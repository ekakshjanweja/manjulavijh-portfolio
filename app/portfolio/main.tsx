"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "@/components/portfolio/hero-section";
import { AboutSection } from "@/components/portfolio/about-section";

const SignatureWork = dynamic(
  () =>
    import("@/components/portfolio/signature-work").then(
      (mod) => mod.SignatureWork,
    ),
  { ssr: false },
);
const CategoriesSection = dynamic(
  () =>
    import("@/components/portfolio/categories-section").then(
      (mod) => mod.CategoriesSection,
    ),
  { ssr: false },
);
const ClientsSection = dynamic(
  () =>
    import("@/components/portfolio/clients-section").then(
      (mod) => mod.ClientsSection,
    ),
  { ssr: false },
);
const ContactSection = dynamic(
  () =>
    import("@/components/portfolio/contact-section").then(
      (mod) => mod.ContactSection,
    ),
  { ssr: false },
);

export default function PortfolioClient() {
  return (
    <div className="page-shell">
      <HeroSection />
      <SignatureWork />
      <CategoriesSection />
      <ClientsSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
