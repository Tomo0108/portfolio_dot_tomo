"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { galleryItems, GalleryItem } from '@/data/gallery';
import { useEffect, useState } from 'react';

export function Gallery() {
  const [randomItems, setRandomItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    // Select 5 random items from galleryItems
    const shuffled = Object.values(galleryItems).sort(() => 0.5 - Math.random());
    setRandomItems(shuffled.slice(0, 5));
  }, []);

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {randomItems.map((item) => (
              <div key={item.id}>
                <Link href={`/gallery/${item.id}`}>
                  <div className="group relative aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
