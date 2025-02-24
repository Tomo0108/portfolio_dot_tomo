"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { galleryItems } from '@/data/gallery';
import { useEffect, useState } from 'react';

export function Gallery() {
  const allItems = Object.values(galleryItems);
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState(allItems.slice(0, itemsPerPage));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => {
        const nextPage = prev + 1;
        const startIndex = (nextPage * itemsPerPage) % allItems.length;
        const endIndex = Math.min(startIndex + itemsPerPage, allItems.length);
        const nextItems = [...allItems.slice(startIndex, endIndex)];
        
        if (endIndex < allItems.length) {
          setItems(nextItems);
        } else {
          // 最後まで到達したら最初から表示
          setItems(allItems.slice(0, itemsPerPage));
          return 0;
        }
        return nextPage;
      });
    }, 5000); // 5秒ごとに切り替え

    return () => clearInterval(interval);
  }, [allItems.length]);

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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 min-h-[600px]">
            <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <Link href={`/gallery/${item.id}`}>
                  <div className="group relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 flex items-end justify-center transition-all duration-500">
                      <div className="text-center w-full pb-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="inline-block bg-black/60 px-4 py-2 rounded-sm">
                          <h3 className="text-white font-bold text-lg font-heading tracking-tight">{item.title}</h3>
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
