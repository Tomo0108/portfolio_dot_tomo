"use client";

import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { FootprintTrail } from '../footprint-trail';

export function Hero() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-hero min-h-screen flex flex-col items-center justify-center relative bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <FootprintTrail />
      </div>
      <div className="relative text-center space-y-4">
        <h1 className="heading-hero text-4xl md:text-5xl lg:text-6xl font-bold">
          Welcome to
          <br />
          <span className="text-primary">Portfolio.ToMo</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-[600px] mx-auto">
          Web Developer & Creative Engineer
        </p>
      </div>
      <div className="absolute bottom-10">
        <Button
          onClick={scrollToAbout}
          variant="outline"
          size="lg"
          className="bg-background/50 backdrop-blur-sm border-2 hover:bg-background/80 transition-all duration-300 group"
        >
          <span className="font-heading">Scroll to learn more</span>
          <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
        </Button>
      </div>
    </section>
  );
}
