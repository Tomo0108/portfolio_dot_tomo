"use client";

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-4 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Web Director & Creative Developer
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Crafting digital experiences that inspire and engage
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a 
            href="#about"
            className="inline-flex items-center justify-center text-sm font-medium hover:text-primary"
          >
            Scroll to explore
            <ArrowDown className="ml-2 h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}