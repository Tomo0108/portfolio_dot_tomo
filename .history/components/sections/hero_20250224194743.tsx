"use client";

import { motion } from 'framer-motion';
import { RotatingNav } from '../rotating-nav';

export function Hero() {
  return (
    <section className="section-hero min-h-screen flex flex-col items-center justify-center relative bg-background overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-2 border-primary/20"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
      </div>
      <div className="relative w-full max-w-[600px] aspect-square mx-auto">
        <RotatingNav />
      </div>
    </section>
  );
}
