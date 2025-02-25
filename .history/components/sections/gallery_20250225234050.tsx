"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { galleryItems } from '@/data/gallery';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Circle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Gallery() {
  const router = useRouter();
  const allItems = Object.values(galleryItems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const reorderItems = (index: number) => {
    const beforeItems = [...allItems.slice(index), ...allItems.slice(0, index)];
    return beforeItems;
  };

  const [displayItems, setDisplayItems] = useState(reorderItems(currentIndex));

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % allItems.length;
        setDisplayItems(reorderItems(next));
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, allItems.length]);

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
    setDisplayItems(reorderItems(index));
  };

  const handleItemClick = (itemId: string) => {
    router.push(`/gallery/${itemId}`);
  };

  return (
    <section id="gallery" className="section-gallery py-24 space-y-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold font-heading text-center mb-12">
            <span className="inline-block border-b-2 border-primary pb-2">Creative Gallery</span>
          </h2>
        </motion.div>
      </div>

      <div className="w-full bg-muted/30">
        <div className="container mx-auto px-6 py-12">
          <div className="space-y-8">
            <div className="relative h-[300px] md:h-[400px]">
              <div className="absolute inset-0 grid grid-cols-5 gap-4 md:gap-6">
                <AnimatePresence initial={false} mode="popLayout">
                  {displayItems.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${index}`}
                      initial={{ 
                        opacity: 0,
                        x: 50,
                        scale: 0.95
                      }}
                      animate={{ 
                        opacity: index === 2 ? 1 : 0.3,
                        scale: index === 2 ? 1 : 0.95,
                        x: 0,
                        zIndex: index === 2 ? 1 : 0
                      }}
                      exit={{ 
                        opacity: 0,
                        x: -50,
                        transition: { duration: 0.4 }
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.32, 0.72, 0, 1]
                      }}
                      className="col-span-1"
                      style={{
                        position: 'relative',
                        transformOrigin: 'center center'
                      }}
                    >
                      <div 
                        className="group relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer w-full"
                        onClick={() => handleItemClick(item.id)}
                        onMouseEnter={() => index === 2 && setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          quality={100}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onClick={() => handleIndicatorClick(index)}
                >
                  <Circle 
                    className={`h-2 w-2 transition-colors ${
                      index === currentIndex 
                        ? 'fill-primary stroke-primary' 
                        : 'fill-none stroke-muted-foreground/40'
                    }`}
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
