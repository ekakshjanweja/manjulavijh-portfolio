"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BookOpen, FolderOpen, PenLine, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const learningCards = [
  {
    icon: BookOpen,
    title: "Workshops",
    description:
      "Hands-on sessions on lighting, styling, and visual storytelling for creators.",
    action: "Book a workshop",
  },
  {
    icon: FolderOpen,
    title: "Resources",
    description:
      "Curated toolkits, shot lists, and planning templates to elevate your shoots.",
    action: "Request toolkit",
  },
  {
    icon: PenLine,
    title: "Blog",
    description:
      "Behind-the-scenes stories and case studies unpacking creative decisions.",
    action: "Read stories",
  },
];

export const LearningSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);

  useEffect(() => {
    if (!pendingScroll) return;
    const element = document.querySelector(pendingScroll);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setPendingScroll(null);
  }, [pendingScroll]);

  return (
    <section
      id="resources"
      ref={ref}
      className="section-padding bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="section-kicker text-accent text-xs uppercase mb-4 font-semibold">
            Learn & Grow
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold tracking-tight mb-5">
            Resources & Insights
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Compact card strip */}
        <div className="grid md:grid-cols-3 gap-5">
          {learningCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={false}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group flex flex-col rounded-none border border-border/50 bg-card/50 p-6 hover:border-accent/30 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-none bg-accent/8 flex items-center justify-center mb-4 group-hover:bg-accent/15 transition-colors">
                <card.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-serif text-lg text-foreground font-semibold mb-2">
                {card.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                {card.description}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between text-xs"
                onClick={() => setPendingScroll("#contact")}
              >
                {card.action}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
