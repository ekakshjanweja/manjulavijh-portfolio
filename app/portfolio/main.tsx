"use client";

import { useEffect, useState } from "react";
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
  // useEffect(() => {
  //   const scrollToHash = () => {
  //     const hash = window.location.hash;
  //     if (!hash) return;

  //     const targetId = hash.replace("#", "");
  //     let attempts = 0;

  //     const tryScroll = () => {
  //       const el = document.getElementById(targetId);
  //       if (el) {
  //         el.scrollIntoView({ behavior: "smooth" });
  //         return;
  //       }

  //       attempts += 1;
  //       if (attempts < 12) {
  //         requestAnimationFrame(tryScroll);
  //       }
  //     };

  //     tryScroll();
  //   };

  //   scrollToHash();
  //   window.addEventListener("hashchange", scrollToHash);
  //   return () => window.removeEventListener("hashchange", scrollToHash);
  // }, []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const targetId = hash.replace("#", "");
      let attempts = 0;

      const tryScroll = () => {
        const el = document.getElementById(targetId);

        if (el && document.readyState === "complete") {
          requestAnimationFrame(() => {
            el.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          });
          return;
        }

        attempts++;

        if (attempts < 60) {
          requestAnimationFrame(tryScroll);
        }
      };

      requestAnimationFrame(tryScroll);
    };

    const timeout = setTimeout(scrollToHash, 150);

    window.addEventListener("hashchange", scrollToHash);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [mounted]);

  if (!mounted) return null;

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
