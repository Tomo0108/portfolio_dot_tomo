"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { galleryItems, GalleryItem } from '@/data/gallery';
import { useEffect, useState } from 'react';

export function Gallery() {
  const items = Object.values(galleryItems);

  return (
    <section id="gallery" className="section-gallery py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-gallery text-3xl font-bold font-heading text-center mb-12">Creative Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-gallery text-3xl font-bold font-heading text-center mb-12">Creative Gallery</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {randomItems.map((item) => (
              <div key={item.id}>
                <Link href={`/gallery/${item.id}`}>
                  <div className="group relative aspect-[4/5] md:aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* モバイル向けの常時表示オーバーレイ */}
                    <div className="absolute inset-0 bg-black/60 md:opacity-0 flex items-end md:items-center justify-center md:group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-center p-4 w-full bg-gradient-to-t from-black/80 to-transparent md:bg-none">
                        <h3 className="text-lg md:text-xl font-bold text-white font-heading mb-1 md:mb-2">{item.title}</h3>
                        <p className="text-white/80 text-xs md:text-sm line-clamp-2 md:line-clamp-none">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}