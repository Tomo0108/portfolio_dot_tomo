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
              <div key={item.id}>
                <Link href={`/gallery/${item.id}`}>
                  <div className="group relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 flex items-end justify-center transition-all duration-500">
                      <div className="text-center w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-white font-bold text-xl font-heading tracking-tight">{item.title}</h3>
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
