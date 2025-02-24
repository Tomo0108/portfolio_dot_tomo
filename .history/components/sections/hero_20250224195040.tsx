"use client";

import { motion } from 'framer-motion';
import { RotatingNav } from '../rotating-nav';

export function Hero() {
  return (
    <section className="section-hero min-h-screen flex items-center justify-center relative bg-background">
      <div className="relative w-full max-w-[800px] aspect-square mx-auto">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="text-center space-y-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading-hero text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Welcome to
              <br />
              <span className="text-primary">Portfolio.ToMo</span>
            </h1>
            <p className="text-muted-foreground text-xl md:text-2xl">
              Web Developer & Creative Engineer
            </p>
          </motion.div>
        </div>
        <RotatingNav />
      </div>
    </section>
  );
}
