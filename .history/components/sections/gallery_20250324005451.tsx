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
    <section id="gallery" className="section-gallery py-16 grid-background">
      <div className="container mx-auto px-6">
        <div className="bg-background rounded-xl shadow-sm py-16 px-6 md:px-12">
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
          <div className="relative aspect-[16/5] max-w-[80vw] mx-auto">
            <div className="h-full grid grid-cols-5 gap-4 md:gap-8 items-center py-2">
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
                      scale: 1,
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
                      className="group relative aspect-[4/3] bg-muted rounded-lg overflow-hidden cursor-pointer w-full"
                      onClick={() => handleItemClick(item.id)}
                      onMouseEnter={() => index === 2 && setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        priority={index === 2}
                        quality={90}
                        sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 25vw"
                        className="object-cover transition-all duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center gap-1.5 mt-8">
            {allItems.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className="w-6 h-6 p-0"
                onClick={() => handleIndicatorClick(index)}
              >
                <Circle 
                  className={`h-2 w-2 transition-colors ${
                    index === currentIndex 
                      ? 'fill-accent-orange stroke-accent-orange' 
                      : 'fill-none stroke-accent-orange/40'
                  }`}
                />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
