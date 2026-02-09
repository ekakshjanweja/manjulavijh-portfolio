"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  BookOpen,
  FolderOpen,
  PenLine,
  ArrowUpRight,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const learningCards = [
  {
    icon: BookOpen,
    title: "Learning",
    description:
      "Hands-on workshops and mentoring for creators who want to refine lighting, styling, and visual storytelling.",
    items: [
      "Food styling fundamentals",
      "Lighting for texture",
      "Editorial storytelling",
    ],
    action: "Book a workshop",
  },
  {
    icon: FolderOpen,
    title: "Resources",
    description:
      "Curated toolkits, shot lists, and planning templates to streamline production and elevate shoots.",
    items: [
      "Studio prep checklist",
      "Shot list templates",
      "Lighting diagrams",
    ],
    action: "Request the toolkit",
  },
  {
    icon: PenLine,
    title: "Blog",
    description:
      "Behind-the-scenes stories and case studies that unpack creative decisions and client outcomes.",
    items: [
      "Campaign breakdowns",
      "Color palette guides",
      "Brand story notes",
    ],
    action: "Pitch a story",
  },
];

export const LearningSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="learning"
      ref={ref}
      className="section-padding section-alt relative overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-20 right-0 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-foreground/10 blur-3xl" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-kicker text-accent text-xs uppercase mb-4 font-semibold">
            Learning & Insights
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold tracking-tight mb-6">
            Learn, Explore, and Grow
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Workshops, resources, and a behind-the-scenes journal designed to
            help teams and creators level up their visual storytelling.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {learningCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group flex h-full flex-col rounded-xl border border-border/70 bg-card/70 p-8 hover:border-accent/40 transition-colors backdrop-blur"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <card.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-serif text-2xl text-foreground font-semibold mb-3">
                {card.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {card.description}
              </p>
              <ul className="space-y-2 mb-8">
                {card.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="mt-auto w-full justify-between"
                onClick={() => scrollToSection("#contact")}
              >
                {card.action}
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-12 rounded-2xl border border-border/70 bg-background/80 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 backdrop-blur"
        >
          <div>
            <p className="section-kicker text-accent text-xs uppercase mb-3 font-semibold">
              Contact for learning, resources, or blog
            </p>
            <h3 className="font-serif text-2xl text-foreground font-semibold tracking-tight mb-3">
              Want custom training or a resource pack?
            </h3>
            <p className="text-muted-foreground max-w-2xl">
              Reach out for workshops, resource access, or to feature a brand
              story on the blog. I respond within two business days.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href="mailto:hello@manjulavijh.com">
                <Mail className="h-4 w-4" />
                Email for Details
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => scrollToSection("#contact")}
            >
              Open Contact Form
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
