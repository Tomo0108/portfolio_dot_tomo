"use client";

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          Welcome to
          <br />
          <span className="text-primary">Portfolio.ToMo</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-[600px] mx-auto">
          Web Developer & Creative Engineer
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10"
      >
        <Button
          onClick={scrollToAbout}
          variant="outline"
          size="lg"
          className="bg-background/50 backdrop-blur-sm border-2 hover:bg-background/80 transition-all duration-300 group"
        >
          <span className="font-heading">Scroll to learn more</span>
          <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
        </Button>
      </motion.div>
    </section>
  );
}