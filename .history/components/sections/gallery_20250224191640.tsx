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
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-heading text-center">
              <span className="inline-block border-b-2 border-primary/80 pb-2">Recent Works</span>
            </h3>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              様々なイラストやデジタルアートを制作しています。
              キャラクターデザインから背景画まで、幅広い作品を手がけています。
            </p>
          </div>
        </motion.div>
      </div>

      <div className="w-full bg-muted/30">
        <div className="container mx-auto px-6 py-12">
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
        </motion.div>
      </div>
    </section>
  );
}
