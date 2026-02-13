"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { socialLinks } from "@/components/portfolio/data/social-links";

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Message Sent!", {
      description: "Thank you for reaching out. I'll get back to you soon!",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: " manjulavijhphotography@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 99710 06505" },
    { icon: MapPin, label: "Location", value: "New Delhi, India" },
  ];

  return (
    <section id="contact" ref={ref} className="py-16 bg-section-alt">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-kicker text-accent text-xl mb-4 font-semibold">
            Contact
          </p>
          {/* <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold tracking-tight mb-5">
            Let&apos;s Work Together
          </h2> */}
          <div className="section-divider mb-6" />
          {/* <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base">
            Ready to bring your vision to life? Drop me a message and let&apos;s
            create something beautiful together.
          </p> */}
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Contact Form -- takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-5 border border-border/50 bg-card/50 p-6 md:p-8 backdrop-blur-sm"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="bg-background/60 border-border/60 focus:border-accent/40 h-10"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="bg-background/60 border-border/60 focus:border-accent/40 h-10"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2"
                >
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="How can I help you?"
                  className="bg-background/60 border-border/60 focus:border-accent/40 h-10"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="bg-background/60 border-border/60 focus:border-accent/40 resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
                size="default"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info -- takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-serif text-xl text-foreground font-semibold tracking-tight mb-6">
                Get in Touch
              </h3>
              <div className="space-y-5">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-3.5">
                    <div className="w-10 h-10 bg-accent/8 flex items-center justify-center shrink-0">
                      <info.icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-0.5">
                        {info.label}
                      </p>
                      <p className="text-foreground text-sm font-medium">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <h3 className="font-serif text-lg text-foreground font-semibold tracking-tight mb-4">
                Follow Along
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 border border-border/80 flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-all duration-300"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
