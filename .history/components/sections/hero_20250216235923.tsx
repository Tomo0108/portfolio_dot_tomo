"use client";

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { galleryItems } from '@/data/gallery';
import Image from 'next/image';

export function Hero() {
  const [randomItems, setRandomItems] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Include specific images in the selection
    const specificImages = [
      '/gallery/pokemon-christmas.jpg',
      '/gallery/hunterxhunter_kirua.JPG',
    ];

    // Select 5 random items from galleryItems and specific images
    const shuffled = [...Object.values(galleryItems), ...specificImages.map((src, index) => ({
      id: `specific-${index}`,
      image: src,
      title: `Specific Image ${index + 1}`
    }))].sort(() => 0.5 - Math.random());
    setRandomItems(shuffled.slice(0, 5));
  }, []);

  useEffect(() => {
    // Set interval to change images
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % randomItems.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, [randomItems]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-hero min-h-screen flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {randomItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
            transition={{ duration: 3 }}
            className="absolute w-full h-full object-contain"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover w-full h-full opacity-50"
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4 z-10"
      >
        <h1 className="heading-hero text-4xl md:text-5xl lg:text-6xl font-bold">
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
        className="absolute bottom-10 z-10"
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