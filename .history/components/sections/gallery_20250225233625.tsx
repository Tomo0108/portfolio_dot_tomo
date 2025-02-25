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
            <div className="grid grid-cols-5 gap-4 md:gap-6">
              {displayItems.map((item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === 2 ? 1 : 0.3 }}
                  transition={{
                    opacity: { duration: 0.5, ease: "easeInOut" },
                    layout: { type: "spring", stiffness: 100, damping: 25 }
                  }}
                >
                  <Link href={`/gallery/${item.id}`}>
                    <div 
                      className="group relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer w-full"
                      onMouseEnter={() => index === 2 && setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        quality={100}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-all duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center gap-2">
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
