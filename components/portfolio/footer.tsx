"use client";

import { Instagram, Mail, ArrowUp } from "lucide-react";

const footerLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="logo-script text-3xl font-semibold mb-3">
              Manjula Vijh
            </h3>
            <p className="text-primary-foreground/50 leading-relaxed text-sm mb-5">
              Light-rich, editorial imagery for culinary and lifestyle brands.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/manjulavijhphotography"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Follow on Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="mailto:hello@manjulavijh.com"
                className="w-9 h-9 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Send email"
              >
                <Mail size={16} />
              </a>
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
            <h4 className="text-xs uppercase tracking-[0.2em] text-primary-foreground/40 mb-4">
              Contact
            </h4>
            <div className="space-y-2.5 text-primary-foreground/50 text-sm">
              <p>hello@manjulavijh.com</p>
              <p>+91 98765 43210</p>
              <p>New Delhi, India</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/8 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/30">
            &copy; {new Date().getFullYear()} Manjula Vijh. All rights reserved.
          </p>
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
