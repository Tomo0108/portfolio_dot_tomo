"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { galleryItems } from '@/data/gallery';
import { useEffect, useState } from 'react';

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
    <section id="gallery" className="section-gallery py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-gallery text-3xl font-bold font-heading text-center mb-12">
            <span className="inline-block border-b-2 border-primary pb-2">Creative Gallery</span>
          </h2>
          <div className="grid grid-cols-5 gap-4 md:gap-6 min-h-[600px] py-16">
            <AnimatePresence initial={false}>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  custom={index}
                  initial={{ 
                    scale: 0.8,
                    opacity: 0
                  }}
                  animate={{ 
                    scale: index === 2 ? 1.4 : 0.85,
                    opacity: index === 2 ? 1 : 0.5,
                    zIndex: index === 2 ? 10 : 0
                  }}
                  exit={{ 
                    scale: 0.8,
                    opacity: 0
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.8
                  }}
                  className="transition-all duration-700"
                >
                  <Link href={`/gallery/${item.id}`}>
                    <div className="group relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
