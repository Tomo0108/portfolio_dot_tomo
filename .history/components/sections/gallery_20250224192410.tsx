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
        for (let i = 0; i < Math.abs(diff); i++) {
          const lastItem = newItems.pop()!;
          newItems.unshift(lastItem);
        }
        return newItems;
      }
    });
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
              <AnimatePresence initial={false} mode="wait">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "tween",
                      duration: 0.4,
                      ease: "easeInOut"
                    }}
                  >
                    <Link href={`/gallery/${item.id}`}>
                      <div className="group relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer w-full">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          quality={100}
