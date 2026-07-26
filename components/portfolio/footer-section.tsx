"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { socialLinks } from "@/components/portfolio/data/social-links";
import { ArrowUp } from "lucide-react";

const footerLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Clients", href: "/brands" },
  { name: "Contact", href: "/#contact" },
];

export const FooterSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);

  useEffect(() => {
    if (!pendingScroll) return;
    if (pendingScroll === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setPendingScroll(null);
      return;
    }

    const element = document.querySelector(pendingScroll);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (!isHomePage && pendingScroll.startsWith("/#")) {
      router.push(pendingScroll);
    }
    setPendingScroll(null);
  }, [pendingScroll, isHomePage, router]);

  const scrollToTop = () => {
    if (!isHomePage) {
      router.push("/");
      return;
    }
    setPendingScroll("top");
  };

  const scrollToSection = (href: string) => {
    if (href === "/#home") {
      router.push("/");
      return;
    }
    
    if (href.startsWith("/#")) {
      router.push(href);
      return;
    }
    
    router.push(href);
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-8 md:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="logo-script text-xl font-semibold mb-3">
              Dr. Manjula Vijh
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 border border-border/60 flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-all duration-300"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-primary-foreground/40 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs uppercase -ml-10 tracking-[0.2em] text-primary-foreground/40 mb-4">
              Contact
            </h4>
            <div className="space-y-2.5 -ml-10 text-primary-foreground/50 text-sm">
              <p>manjulavijhphotography@gmail.com</p>
              <p>+91 99710 06505</p>
              <p>New Delhi, India</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/8 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <p className="text-xs text-primary-foreground/30">
              &copy; {new Date().getFullYear()} Manjula Vijh. All rights reserved.
            </p>
            <p className="text-xs text-primary-foreground/30">
              Made by{" "}
              <a
                href="https://tanishi.app"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-primary-foreground transition-colors duration-300"
              >
                @tanishi.app
              </a>
            </p>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-primary-foreground/40 hover:text-primary-foreground transition-colors duration-300"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};