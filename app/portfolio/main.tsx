"use client";

import { useEffect, useState, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/portfolio/hero-section";
import { AboutSection } from "@/components/portfolio/about-section";
import { LearningSection } from "@/components/portfolio/resources";

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

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground uppercase tracking-widest">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default function PortfolioClient() {
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const hash = window.location.hash;
    if (!hash) return;

    const targetId = hash.replace("#", "");
    const el = document.getElementById(targetId);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [mounted]);

  if (!mounted) return <PageLoader />;

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <SignatureWork />
      <CategoriesSection />
      <ClientsSection />
      <AboutSection />
      {/* <LearningSection /> */}
      <ContactSection />
    </div>
  );
}