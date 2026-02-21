"use client";

import { useEffect, useState, useRef, type MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/portfolio/mode-toggle";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Clients", href: "#clients" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const portfolioLinks = [
  { name: "Signature Work", href: "#portfolio" },
  {
    name: "Explore Collections",
    href: "#categories",
    children: [
      { name: "Food", href: "/portfolio/food" },
      { name: "Product", href: "/portfolio/product" },
      { name: "Concept", href: "/portfolio/concept" },
    ],
  },
];

export const NavbarSection = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isMainPortfolioPage = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [isPortfolioMenuOpen, setIsPortfolioMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isHero, setIsHero] = useState(isMainPortfolioPage);
  const [mounted, setMounted] = useState(false);
  const [pendingScroll, setPendingScroll] = useState<{
    href: string;
    delay?: number;
  } | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isMainPortfolioPage) return;
    const updateActiveSection = () => {
      const sections = navLinks.map((l) => l.href.slice(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    updateActiveSection();
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [isMainPortfolioPage]);

  useEffect(() => {
    if (!isMainPortfolioPage) {
      setIsHero(false);
      return;
    }

    const heroSection = document.getElementById("home");
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHero(entry.isIntersecting),
      { rootMargin: "-80px 0px", threshold: 0.1 },
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, [isMainPortfolioPage]);

  useEffect(() => {
    if (!pendingScroll) return;
    const timeout = window.setTimeout(() => {
      const el = document.querySelector(pendingScroll.href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setPendingScroll(null);
    }, pendingScroll.delay ?? 0);
    return () => window.clearTimeout(timeout);
  }, [pendingScroll]);

  const handleLinkClick = (href: string, e?: MouseEvent<HTMLAnchorElement>) => {
    e?.preventDefault();
    setIsPortfolioMenuOpen(false);
    setIsOpen(false);
    
    if (href.startsWith("#")) {
      if (!isMainPortfolioPage) {
        // Navigate to home page with hash
        router.push(`/${href}`);
        return;
      }
      // Already on portfolio page, just scroll to section
      setPendingScroll({ href, delay: 100 });
      return;
    }

    // Handle full route navigation (e.g., /portfolio/food, /portfolio/product)
    router.push(href);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (event: Event) => {
      const target = event.target as Node | null;
      if (navRef.current && target && !navRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isMainPortfolioPage) return;
    const hash = window.location.hash;
    if (!hash) return;
    const timeout = window.setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
    return () => window.clearTimeout(timeout);
  }, [isMainPortfolioPage, pathname]);

  if (!mounted) return null;

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHero
          ? "bg-transparent"
          : "bg-background/70 backdrop-blur-xl border-b border-border/30 shadow-sm shadow-black/3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-10">
        <div className="relative z-50 flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              handleLinkClick("#home", e);
            }}
            className={`logo-script text-base sm:text-lg md:text-2xl font-semibold tracking-wide whitespace-nowrap shrink-0 ${
              isOpen
                ? "text-foreground md:mix-blend-difference md:text-white"
                : isHero
                  ? "mix-blend-difference text-white"
                  : "text-foreground"
            }`}
          >
            MANJULA VIJH
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) =>
              link.name === "Portfolio" ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setIsPortfolioMenuOpen(true)}
                  onMouseLeave={() => setIsPortfolioMenuOpen(false)}
                  onFocusCapture={() => setIsPortfolioMenuOpen(true)}
                  onBlurCapture={(e) => {
                    const next = e.relatedTarget as Node | null;
                    if (!e.currentTarget.contains(next)) {
                      setIsPortfolioMenuOpen(false);
                    }
                  }}
                >
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      handleLinkClick(link.href, e);
                    }}
                    className={`relative text-xs font-medium uppercase tracking-[0.15em] transition-all ${
                      isHero
                        ? `mix-blend-difference text-white ${
                            activeSection === link.href.slice(1)
                              ? ""
                              : "opacity-60 hover:opacity-100"
                          }`
                        : activeSection === link.href.slice(1)
                          ? "text-foreground"
                          : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-accent transition-all ${
                        activeSection === link.href.slice(1) ? "w-full" : "w-0"
                      }`}
                    />
                  </a>
                  <div
                    className={`absolute left-0 top-full z-40 pt-2 transition-all duration-200 ${
                      isPortfolioMenuOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-1 pointer-events-none"
                    }`}
                  >
                    <div className="min-w-48  border border-border/60 bg-background/95 shadow-lg backdrop-blur-md">
                      <div className="flex flex-col">
                        {portfolioLinks.map((item) => (
                          <div
                            key={item.name}
                            className="relative group/collection"
                          >
                            <a
                              href={item.href}
                              onClick={(e) => {
                                handleLinkClick(item.href, e);
                              }}
                              className="flex items-center justify-between gap-2 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:bg-accent/15 hover:text-foreground"
                            >
                              {item.name}
                              {item.children && (
                                <span className="text-foreground/40">&gt;</span>
                              )}
                            </a>
                            {item.children && (
                              <div className="absolute left-full top-0 z-50 min-w-44 border border-border/60 bg-background/95 shadow-lg backdrop-blur-md opacity-0 translate-x-1 pointer-events-none transition-all duration-200 delay-75 group-hover/collection:opacity-100 group-hover/collection:translate-x-0 group-hover/collection:pointer-events-auto group-focus-within/collection:opacity-100 group-focus-within/collection:translate-x-0 group-focus-within/collection:pointer-events-auto before:absolute before:content-[''] before:-left-4 before:top-0 before:w-4 before:h-full">
                                <div className="flex flex-col py-1">
                                  {item.children.map((child) => (
                                    <a
                                      key={child.name}
                                      href={child.href}
                                      onClick={(e) => {
                                        handleLinkClick(child.href, e);
                                      }}
                                      className="block px-3 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/60 transition-colors hover:bg-accent/15 hover:text-foreground"
                                    >
                                      {child.name}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    handleLinkClick(link.href, e);
                  }}
                  className={`relative text-xs font-medium uppercase tracking-[0.15em] transition-all ${
                    isHero
                      ? `mix-blend-difference text-white ${
                          activeSection === link.href.slice(1)
                            ? ""
                            : "opacity-60 hover:opacity-100"
                        }`
                      : activeSection === link.href.slice(1)
                        ? "text-foreground"
                        : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-accent transition-all ${
                      activeSection === link.href.slice(1) ? "w-full" : "w-0"
                    }`}
                  />
                </a>
              ),
            )}
            <ModeToggle isHero={isHero} />
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-1 sm:gap-3 md:hidden shrink-0">
            <ModeToggle isHero={isHero} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 ${
              isOpen
                ? "text-foreground md:mix-blend-difference md:text-white"
                : isHero
                  ? "mix-blend-difference text-white"
                  : "text-foreground"
              }`}
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
            id="mobile-nav"
            initial={false}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-0 top-0 z-40 md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border/30"
          >
            <div className="px-6 pb-5 pt-16 space-y-2">
              {navLinks.map((link) =>
                link.name === "Portfolio" ? (
                  <div key={link.name} className="space-y-1">
                    <span className="block text-sm font-medium uppercase tracking-[0.15em] text-foreground/70 py-2">
                      Portfolio
                    </span>
                    <div className="pl-4 space-y-1">
                      {portfolioLinks.map((item) => (
                        <div key={item.name} className="space-y-1">
                          <a
                            href={item.href}
                            onClick={(e) => {
                              handleLinkClick(item.href, e);
                            }}
                            className="block text-xs uppercase tracking-wider py-1 text-foreground/50 hover:text-foreground"
                          >
                            {item.name}
                          </a>
                          {item.children && (
                            <div className="pl-3 space-y-1">
                              {item.children.map((child) => (
                                <a
                                  key={child.name}
                                  href={child.href}
                                  onClick={(e) => {
                                    handleLinkClick(child.href, e);
                                  }}
                                  className="block text-[11px] uppercase tracking-wider py-1 text-foreground/50 hover:text-foreground"
                                >
                                  {child.name}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      handleLinkClick(link.href, e);
                    }}
                    className="block text-sm font-medium uppercase tracking-[0.15em] py-2 text-foreground/60 hover:text-foreground"
                  >
                    {link.name}
                  </a>
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
