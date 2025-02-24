"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { galleryItems } from '@/data/gallery';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
export function Gallery() {
  const allItems = Object.values(galleryItems);
  const [items, setItems] = useState(allItems);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const firstItem = prev[0];
        return [...prev.slice(1), firstItem];
      });
    }, 4000); // 4秒ごとに切り替え

    return () => clearInterval(interval);
  }, []);

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
          <div className="grid grid-cols-5 gap-4 md:gap-6 min-h-[600px]">
            <AnimatePresence initial={false} mode="wait">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  custom={index}
                  initial={{ 
                    scale: 0.9,
                    opacity: 0
                  }}
                  animate={{ 
                    scale: index === 2 ? 1.3 : 0.9,
                    opacity: index === 2 ? 1 : 0.5,
                    zIndex: index === 2 ? 10 : 0
                  }}
                  exit={{ 
                    scale: 0.9,
                    opacity: 0
                  }}
                  transition={{
                    type: "tween",
                    duration: 0.5,
                    ease: "easeInOut"
                  }}
                  className="transition-all duration-500"
                >
                  <Link href={`/gallery/${item.id}`}>
                    <div className="group relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        quality={100}
                        priority={index === 2}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-all duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
