"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { galleryItems } from '@/data/gallery';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Circle } from 'lucide-react';

export function Gallery() {
  const allItems = Object.values(galleryItems);
  const [items, setItems] = useState(allItems);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
      setItems(prev => {
        const firstItem = prev[0];
        return [...prev.slice(1), firstItem];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [items.length]);

  const handleIndicatorClick = (index: number) => {
    const diff = index - currentIndex;
    if (diff === 0) return;

    setCurrentIndex(index);
    setItems(prev => {
      if (diff > 0) {
        const newItems = [...prev];
        for (let i = 0; i < diff; i++) {
          const firstItem = newItems.shift()!;
          newItems.push(firstItem);
        }
        return newItems;
      } else {
        const newItems = [...prev];
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
