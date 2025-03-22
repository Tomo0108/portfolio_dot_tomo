"use client";

import { motion } from 'framer-motion';
import { RotatingNav } from '../rotating-nav';

export function Hero() {
  return (
    <section className="section-hero min-h-screen flex items-center justify-center relative bg-background/80 overflow-hidden">
      <div className="relative w-[90vh] h-[90vh] max-w-[90vw] max-h-[90vw] mx-auto backdrop-blur-sm">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="text-center space-y-8 hero-text transition-opacity duration-300 [.nav-paused_&]:opacity-50 relative z-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading-hero text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-primary">Portfolio.ToMo</span>
            </h1>
          </motion.div>
        </div>こ
        <RotatingNav />
      </div>
    </section>
  );
}
