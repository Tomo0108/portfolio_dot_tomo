"use client";

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ZennArticle } from '@/components/sections/zenn-articles';
import { ChevronLeft, ChevronRight, Calendar, ArrowUpRight, BookOpen, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
        x: { type: "spring", stiffness: 200, damping: 25 },
        rotateY: { type: "spring", stiffness: 200, damping: 25, delay: 0.05 },
        opacity: { duration: 0.3, delay: 0.05 },
        scale: { type: "spring", stiffness: 200, damping: 25, delay: 0.05 },
      },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      rotateY: direction < 0 ? -90 : 90,
      opacity: 0,
      scale: 0.8,
      transformOrigin: direction < 0 ? 'left center' : 'right center',
      transition: {
        x: { type: "spring", stiffness: 200, damping: 25 },
        rotateY: { type: "spring", stiffness: 200, damping: 25 },
        opacity: { duration: 0.3 },
        scale: { type: "spring", stiffness: 200, damping: 25 },
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

  const openArticle = useCallback(() => {
    if (currentArticle) {
      window.open(currentArticle.url, '_blank', 'noopener,noreferrer');
    }
  }, [currentArticle]);

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto aspect-[4/3] sm:aspect-[16/9] md:aspect-[4/2.5] overflow-hidden" style={{ perspective: '1200px' }}>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentPage}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="absolute w-full h-full cursor-grab active:cursor-grabbing"
        >
          <Card className="w-full h-full flex flex-col overflow-hidden shadow-xl group bg-card">
            {/* Optional: Page curl effect - can be removed if it feels cluttered */}
            {/* <div className="absolute top-0 right-0 w-12 h-12">
              <div className="absolute transform rotate-45 bg-gradient-to-br from-slate-100 dark:from-slate-800 to-transparent -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                   style={{ width: '200%', height: '200%', top: '25%', left: '25%' }} />
            </div> */}

            <CardHeader className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="relative w-10 h-10 bg-muted rounded-md flex items-center justify-center text-2xl shadow-inner flex-shrink-0">
                    {currentArticle.emoji}
                  </div>
                  <div className="flex-grow min-w-0">
                    <CardTitle className="text-base sm:text-md font-semibold line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                      {currentArticle.title}
                    </CardTitle>
                    <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{format(new Date(currentArticle.date), 'yyyy/MM/dd')}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary -mt-1 -mr-2 flex-shrink-0" onClick={openArticle} aria-label="Read article on Zenn">
                  <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-4 pt-0">
              <div className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3">
                この記事はZennで公開されています。詳細を読むには、上のアイコンまたは下のリンクをクリックしてください。
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between text-xs text-muted-foreground p-4 pt-2 border-t">
              <Badge variant="secondary" className="font-normal text-xs">
                {currentArticle.likes} likes
              </Badge>
              <Button variant="link" size="sm" className="text-xs p-0 h-auto hover:text-primary" onClick={openArticle}>
                <BookOpen className="h-3.5 w-3.5 mr-1" />
                <span>Read on Zenn</span>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 z-20 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-700 rounded-full shadow-md p-2"
        onClick={() => paginate(-1)}
        aria-label="Previous article"
      >
        <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 z-20 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-700 rounded-full shadow-md p-2"
        onClick={() => paginate(1)}
        aria-label="Next article"
      >
        <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
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
