"use client"

import { motion } from "framer-motion";
import BackgroundImage from "./BackgroundImage";
import SocialLinks from "./SocialLinks";

export default function ComingSoonHero() {
  return (
    <>
      <BackgroundImage />

      <section className="flex min-h-screen items-center justify-center px-6 text-center">
        <div className="max-w-2xl space-y-8 text-white">
          <motion.h1
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="font-[var(--font-playfair) text-4xl sm:text-5xl text-white"
          >
            COMING SOON
          </motion.h1>

          <p className="text-white/80 text-lg">
            Crafting delicious stories through my lens.
            <br />
            Food & Product Photography
          </p>

          <div className="h-1 w-full rounded-full bg-white/20">
            <div className="h-full w-1/3 rounded-full bg-white" />
          </div>

          <SocialLinks />
        </div>
      </section>
    </>
  );
}
