"use client";

import { useEffect } from "react";
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
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const targetId = hash.replace("#", "");
      let attempts = 0;

      const tryScroll = () => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }

        attempts += 1;
        if (attempts < 12) {
          requestAnimationFrame(tryScroll);
        }
      };

      tryScroll();
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

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
