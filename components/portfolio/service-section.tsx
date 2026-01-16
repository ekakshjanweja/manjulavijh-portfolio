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
      "From restaurant menus to cookbooks, I create mouthwatering images that capture the essence and artistry of culinary creations. Every dish tells a story—let me help you tell yours.",
    features: [
      "Restaurant & Menu Shoots",
      "Recipe Photography",
      "Editorial Food Styling",
    ],
  },
  {
    icon: Package,
    title: "Product Photography",
    description:
      "Elevate your products with stunning imagery designed for e-commerce, advertising, and catalogs. I focus on highlighting textures, details, and the unique qualities that set your products apart.",
    features: [
      "E-commerce Ready Images",
      "Lifestyle Product Shots",
      "Packaging Photography",
    ],
  },
  {
    icon: Briefcase,
    title: "Brand Shoots",
    description:
      "Comprehensive visual storytelling for your brand. From behind-the-scenes content to cohesive campaign imagery, I create visuals that strengthen your brand identity and connect with your audience.",
    features: [
      "Brand Story Content",
      "Social Media Assets",
      "Campaign Photography",
    ],
  },
];

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={ref} className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm uppercase tracking-[0.2em] mb-4 font-medium">
            Services
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold mb-6">
            What I Offer
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional photography services tailored to bring your vision to
            life. Each project receives my full attention and creative
            expertise.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group p-8 bg-card rounded-lg border border-border hover:border-accent/50 transition-all duration-500 hover-lift"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-serif text-2xl text-foreground font-semibold mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-foreground/80"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
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
