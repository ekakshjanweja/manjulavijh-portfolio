"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/common/mode-toggle";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Work", href: "#portfolio" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isHero = activeSection === "home";

  const updateActiveSection = useCallback(() => {
    const sections = navLinks.map((link) => link.href.slice(1));
    const scrollPosition = window.scrollY + 120;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(sections[i]);
        break;
      }
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      updateActiveSection();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateActiveSection();
    return () => window.removeEventListener("scroll", onScroll);
  }, [updateActiveSection]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHero
          ? "bg-transparent"
          : "bg-background/70 backdrop-blur-xl border-b border-border/30 shadow-sm shadow-black/[0.03]"
      }`}
    >
      <div className="px-5 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Manjula Vijh Logo"
              width={60}
              height={60}
              className={`opacity-90 ${isHero ? "mix-blend-difference" : ""}`}
            />
            <a
              href="#home"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className={`logo-script text-2xl md:text-3xl font-semibold tracking-wide transition-colors duration-300 ${
                isHero ? "mix-blend-difference text-white" : "text-foreground"
              }`}
            >
              Manjula Vijh
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`relative text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 ${
                  isHero
                    ? `mix-blend-difference text-white ${
                        activeSection === link.href.slice(1)
                          ? ""
                          : "opacity-60 hover:opacity-100"
                      }`
                    : activeSection === link.href.slice(1)
                    ? "text-foreground"
                    : "text-foreground/60 hover:text-foreground"
                } ${
                  activeSection === link.href.slice(1) ? "nav-link-active" : ""
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                    activeSection === link.href.slice(1) ? "w-full" : "w-0"
                  }`}
                />
              </a>
            ))}
            <ModeToggle isHero={isHero} />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <ModeToggle isHero={isHero} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors ${
                isHero ? "mix-blend-difference text-white" : "text-foreground"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/30"
          >
            <div className="px-6 py-5 space-y-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`block text-sm font-medium uppercase tracking-[0.15em] py-2.5 transition-colors ${
                    activeSection === link.href.slice(1)
                      ? "text-foreground"
                      : "text-foreground/50 hover:text-foreground"
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
