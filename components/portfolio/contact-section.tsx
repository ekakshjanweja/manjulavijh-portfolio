"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { socialLinks } from "@/components/portfolio/data/social-links";
import { formSchema } from "@/lib/schema";
import z from "zod";

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formValues, setFormValues] = useState<z.infer<typeof formSchema>>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof z.infer<typeof formSchema>, string>>
  >({});

  const contactInfo = [
    { icon: Mail, label: "Email", value: " manjulavijhphotography@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 99710 06505" },
    { icon: MapPin, label: "Location", value: "New Delhi, India" },
  ];
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    setFormErrors({});

    const parsed = formSchema.safeParse(formValues);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setFormErrors({
        firstName: fieldErrors.firstName?.[0],
        lastName: fieldErrors.lastName?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const message = data?.error ?? "Unable to send message.";
        throw new Error(message);
      }

      setSubmitSuccess(true);
      setFormValues({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
      toast.success("Message Sent!", {
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      setSubmitError(message);
      toast.error("Message failed", {
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-16 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-kicker text-accent text-2xl md:text-3xl lg:text-5xl mb-4 font-semibold">
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
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Contact Form -- takes 3 columns */}
          <div className="lg:col-span-3">
            {/* <form
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
            </form> */}
            <form
              onSubmit={onSubmit}
              className="space-y-5 border border-border/50 bg-card/50 p-6 md:p-8 backdrop-blur-sm"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                    First Name
                  </label>
                  <Input
                    name="firstName"
                    value={formValues.firstName}
                    onChange={(event) =>
                      setFormValues((prev) => ({
                        ...prev,
                        firstName: event.target.value,
                      }))
                    }
                    placeholder="Enter your first name"
                  />
                  {formErrors.firstName ? (
                    <p className="text-xs text-red-600">{formErrors.firstName}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                    Last Name
                  </label>
                  <Input
                    name="lastName"
                    value={formValues.lastName}
                    onChange={(event) =>
                      setFormValues((prev) => ({
                        ...prev,
                        lastName: event.target.value,
                      }))
                    }
                    placeholder="Enter your last name"
                  />
                  {formErrors.lastName ? (
                    <p className="text-xs text-red-600">{formErrors.lastName}</p>
                  ) : null}
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                  Email
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={(event) =>
                    setFormValues((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                  placeholder="Enter your email"
                />
                {formErrors.email ? (
                  <p className="text-xs text-red-600">{formErrors.email}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formValues.message}
                  onChange={(event) =>
                    setFormValues((prev) => ({
                      ...prev,
                      message: event.target.value,
                    }))
                  }
                  placeholder="Type in your message here..."
                  className="min-h-30"
                />
                {formErrors.message ? (
                  <p className="text-xs text-red-600">{formErrors.message}</p>
                ) : null}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button type="submit" className="ml-auto" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                {submitSuccess ? (
                  <p className="text-sm text-emerald-600">
                    Thanks! Your message has been sent.
                  </p>
                ) : null}
                {submitError ? (
                  <p className="text-sm text-red-600">{submitError}</p>
                ) : null}
              </div>
            </form>
          </div>

          {/* Contact Info -- takes 2 columns */}
          <div className="lg:col-span-2 space-y-8">
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
          </div>
        </div>
      </div>
    </section>
  );
};
