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
