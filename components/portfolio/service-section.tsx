"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Utensils, Package, Briefcase } from "lucide-react";

const services = [
  {
    icon: Utensils,
    title: "Food Photography",
    description:
      "Mouthwatering images for restaurant menus, cookbooks, and editorial features that capture culinary artistry.",
    features: ["Restaurant & Menu Shoots", "Recipe Photography", "Editorial Styling"],
  },
  {
    icon: Package,
    title: "Product Photography",
    description:
      "Stunning imagery for e-commerce, advertising, and catalogs that highlight textures and unique qualities.",
    features: ["E-commerce Ready", "Lifestyle Shots", "Packaging Photography"],
  },
  {
    icon: Briefcase,
    title: "Brand Shoots",
    description:
      "Comprehensive visual storytelling -- from behind-the-scenes content to cohesive campaign imagery.",
    features: ["Brand Story Content", "Social Media Assets", "Campaign Photography"],
  },
];

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" ref={ref} className="section-padding bg-section-alt">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-kicker text-accent text-xs uppercase mb-4 font-semibold">
            Services
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold tracking-tight mb-5">
            What I Offer
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={false}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group p-6 md:p-8 bg-card/60 rounded-none border border-border/50 hover:border-accent/30 transition-all duration-500 hover-lift backdrop-blur-sm"
            >
              <div className="w-11 h-11 rounded-none bg-accent/8 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors duration-300">
                <service.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-serif text-xl text-foreground font-semibold mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-sm text-foreground/70"
                  >
                    <span className="w-1 h-1 rounded-none bg-accent/70" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
