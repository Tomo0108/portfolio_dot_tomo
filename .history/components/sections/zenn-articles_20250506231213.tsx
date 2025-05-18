"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowUpRight, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ThreeOrbitingLight from '@/components/three-orbiting-light';

interface ZennArticle {
  id: number;
  title: string;
  url: string;
  date: string;
  likes: number;
  emoji: string;
}

interface ZennArticlesProps {
  articles: ZennArticle[];
}

export function ZennArticles({ articles }: ZennArticlesProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedArticles = isExpanded ? articles : articles.slice(0, 3);
  
  return (
    <section id="articles" className="section-articles py-16 section-grid">
      <div className="container mx-auto px-6">
        <div className="bg-background rounded-xl shadow-sm py-16 px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold font-heading text-center mb-12">
              <span className="inline-block border-b-2 border-primary pb-2">Latest Articles</span>
            </h2>
          </motion.div>
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence initial={false}>
                {displayedArticles.map((article, index) => (
                  <motion.a
                    key={article.title}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1 relative overflow-hidden" // Added relative and overflow-hidden
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.2
                    }}
                  >
                    <ArticleCardContent article={article} />
                  </motion.a>
                ))}
              </AnimatePresence>
            </div>
            
            {articles.length > 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="bg-accent-orange hover:bg-sub-background transition-all duration-200 w-10 h-10 rounded-full"
                >
                  <ChevronDown 
                    className={`h-5 w-5 transition-transform duration-200 text-white ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper component to manage individual card content and Three.js light
const ArticleCardContent = ({ article }: { article: ZennArticle }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (cardRef.current) {
      setDimensions({
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight,
      });
    }
    // Optional: Resize observer to handle dynamic size changes
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    if (cardRef.current) {
      resizeObserver.observe(cardRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={cardRef} className="relative z-10"> {/* Ensure content is above the light */}
      {dimensions.width > 0 && dimensions.height > 0 && (
        <ThreeOrbitingLight width={dimensions.width} height={dimensions.height} />
      )}
      <div className="flex items-center space-x-3 mb-4">
        <div className="relative w-10 h-10 bg-muted rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-2xl">
                          {article.emoji}
          </div>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">{format(new Date(article.date), 'yyyy/MM/dd')}</span>
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {article.title}
      </h3>
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-muted-foreground">
          {article.likes} likes
        </span>
        <motion.div
          initial={{ x: -4, opacity: 0.5 }}
          animate={{ x: 0, opacity: 1 }}
          className="group-hover:translate-x-1 transition-transform"
        >
          <ArrowUpRight className="h-4 w-4" />
        </motion.div>
      </div>
    </div>
  );
};
