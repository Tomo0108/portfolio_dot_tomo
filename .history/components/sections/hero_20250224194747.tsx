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
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-2 border-primary/30"
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <motion.div 
        className="relative text-center space-y-8 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 0.2
        }}
      >
        <h1 className="heading-hero text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          Welcome to
          <br />
          <span className="text-primary">Portfolio.ToMo</span>
        </h1>
        <p className="text-muted-foreground text-xl md:text-2xl max-w-[600px] mx-auto">
          Web Developer & Creative Engineer
        </p>
      </motion.div>

      <div className="relative w-full max-w-[600px] aspect-square mx-auto">
        <RotatingNav />
      </div>
    </section>
  );
}
