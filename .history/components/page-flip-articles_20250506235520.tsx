"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ZennArticle } from '@/components/sections/zenn-articles';
import { ChevronLeft, ChevronRight, Calendar, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface PageFlipArticlesProps {
  articles: ZennArticle[];
}

const PageFlipArticles: React.FC<PageFlipArticlesProps> = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0); // 0: none, 1: next, -1: prev
  const containerRef = useRef<HTMLDivElement>(null);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentPage((prevPage) => {
      const nextPage = prevPage + newDirection;
      if (nextPage < 0) return articles.length -1; // Loop to last page
      if (nextPage >= articles.length) return 0; // Loop to first page
      return nextPage;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.8,
      transformOrigin: direction > 0 ? 'left center' : 'right center',
    }),
    center: {
      zIndex: 1,
      x: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transformOrigin: 'center center',
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        rotateY: { type: 'spring', stiffness: 300, damping: 30, delay: 0.1 },
        opacity: { duration: 0.2, delay: 0.1 },
        scale: { type: 'spring', stiffness: 300, damping: 30, delay: 0.1 },
      },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      rotateY: direction < 0 ? -90 : 90,
      opacity: 0,
      scale: 0.8,
      transformOrigin: direction < 0 ? 'left center' : 'right center', // Comma was missing here
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        rotateY: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { type: 'spring', stiffness: 300, damping: 30 },
      },
    }),
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const swipeThreshold = 50; // Minimum distance for a swipe
    const velocityThreshold = 200; // Minimum velocity for a swipe

    if (Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > velocityThreshold) {
      if (offset.x < -swipeThreshold || velocity.x < -velocityThreshold) {
        paginate(1); // Swipe left, go to next page
      } else if (offset.x > swipeThreshold || velocity.x > velocityThreshold) {
        paginate(-1); // Swipe right, go to previous page
      }
    }
  };
  
  const currentArticle = articles[currentPage];

  if (!articles || articles.length === 0) {
    return <div className="text-center p-8">No articles to display.</div>;
  }
  
  if (!currentArticle) {
    // This case should ideally not happen if currentPage is always valid
    console.error("Current article is undefined. currentPage:", currentPage, "articles:", articles);
    return <div className="text-center p-8">Error loading article.</div>;
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto aspect-[4/3] overflow-hidden" style={{ perspective: '1200px' }}>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.a
          key={currentPage}
          href={currentArticle.url}
          target="_blank"
          rel="noopener noreferrer"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="absolute w-full h-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl cursor-grab active:cursor-grabbing flex flex-col justify-between overflow-hidden" // Added overflow-hidden for pseudo-elements
        >
          {/* Pseudo-elements for page edge shadows */}
          <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-black/10 via-black/5 to-transparent opacity-30 dark:opacity-20 pointer-events-none -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-black/10 via-black/5 to-transparent opacity-30 dark:opacity-20 pointer-events-none translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          
                  {currentArticle.emoji}
                </div>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">{format(new Date(currentArticle.date), 'yyyy/MM/dd')}</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 line-clamp-3">
              {currentArticle.title}
            </h3>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-muted-foreground">
              {currentArticle.likes} likes
            </span>
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </motion.a>
      </AnimatePresence>

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80 rounded-full"
        onClick={() => paginate(-1)}
        aria-label="Previous article"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80 rounded-full"
        onClick={() => paginate(1)}
        aria-label="Next article"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {articles.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentPage ? 1 : (index < currentPage ? -1 : 0));
              setCurrentPage(index);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentPage === index ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground/50'
            }`}
            aria-label={`Go to article ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PageFlipArticles;
