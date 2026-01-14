"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import Countdown from "@/app/components/Countdown";
import { motion } from "framer-motion";

export default function ComingSoonVariation() {
  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      {/* Left Column - Image */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-[40vh] w-full md:h-screen md:w-1/2"
      >
        <Image
          src="/images/coming-soon-bg.png"
          alt="Food Photography"
          fill
          className="object-cover"
          priority
        />
        {/* Logo Overlay */}
        <div className="top-8 right-8 z-10">
          <span className="font-sans text-3xl font-medium text-blue-400 drop-shadow-lg md:text-xl">
            Manjula Vijh
          </span>
        </div>
      </motion.div>

      {/* Right Column - Content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex w-full flex-col items-center justify-center bg-white px-8 py-16 text-center md:h-screen md:w-1/2 md:px-12"
      >
        <h2 className="mb-6 font-(family-name:--font-playfair) text-4xl font-normal tracking-wider text-black sm:text-5xl">
          COMING SOON.
        </h2>

        <div className="mb-4 max-w-xs space-y-1 font-sans text-sm leading-relaxed text-gray-700 sm:text-base">
          <p>Crafting Delicious Stories Through My Lens.</p>
          <p>Food & Product Photography.</p>
        </div>

        <Countdown />

        <div className="mt-8 flex flex-col items-center gap-4">
          <h3 className="font-sans text-sm font-bold tracking-tight text-black">
            Follow the Journey
          </h3>
          <a
            href="https://www.instagram.com/manjulavijhphotography/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[13px] text-gray-600 transition-colors hover:text-black"
          >
            <Instagram className="h-4 w-4" />
            <span className="font-sans">See Work in Progress on Instagram</span>
          </a>
        </div>
      </motion.div>
    </main>
  );
}
