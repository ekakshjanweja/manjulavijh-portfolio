"use client";

import { Instagram, Mail, ArrowUp, Facebook, Linkedin } from "lucide-react";
import { FaBehance, FaPinterest } from "react-icons/fa";

const footerLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Clients", href: "#clients" },
  { name: "Contact", href: "#contact" },
];

export const FooterSection = () => {
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-8 md:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="logo-script text-xl font-semibold mb-3">
              Manjula Vijh
            </h3>
            <p className="text-primary-foreground/50 leading-relaxed text-sm mb-5">
              Light-rich, editorial imagery for culinary and lifestyle brands.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.behance.net/manjulavijh1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-none border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Follow on Behance"
              >
                <FaBehance size={16} />
              </a>

              <a
                href="https://pin.it/5nf68vmnb"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-none border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Follow on Pinterest"
              >
                <FaPinterest size={16} />
              </a>

              <a
                href="https://www.instagram.com/manjulavijhphotography"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-none border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Follow on Instagram"
              >
                <Instagram size={16} />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=100082670445094"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-none border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Follow on Facebook"
              >
                <Facebook size={16} />
              </a>

              <a
                href="mailto:manjulavijhphotography@gmail.com"
                className="w-9 h-9 rounded-none border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Send email"
              >
                <Mail size={16} />
              </a>

              <a
                href="https://www.linkedin.com/in/dr-manjula-vijh-648b5b2b5"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-none border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin size={18} />
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
              <p>manjulavijhphotography@gmail.com</p>
              <p>+91 99710 06505</p>
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
