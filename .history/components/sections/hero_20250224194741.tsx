"use client";

import { motion } from 'framer-motion';
import { RotatingNav } from '../rotating-nav';

export function Hero() {
  return (
    <section className="section-hero min-h-screen flex flex-col items-center justify-center relative bg-background overflow-hidden">
    <section className="section-hero min-h-screen flex flex-col items-center justify-center relative bg-background">
      <div className="relative text-center space-y-6 z-10">
        <h1 className="heading-hero text-4xl md:text-5xl lg:text-6xl font-bold">
          Welcome to
          <br />
          <span className="text-primary">Portfolio.ToMo</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-[600px] mx-auto">
          Web Developer & Creative Engineer
        </p>
      </div>
      <div className="relative w-full max-w-[600px] aspect-square mx-auto">
        <RotatingNav />
      </div>
    </section>
  );
}
