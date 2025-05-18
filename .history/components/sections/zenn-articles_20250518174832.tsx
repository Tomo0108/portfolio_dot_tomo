"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowUpRight, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ThreeOrbitingLight from '@/components/three-orbiting-light';

export interface ZennArticle { // Added export
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

import PageFlipArticles from '@/components/page-flip-articles'; // Import the new component

export function ZennArticles({ articles }: ZennArticlesProps) {
  // const [isExpanded, setIsExpanded] = useState(false);
  // const displayedArticles = isExpanded ? articles : articles.slice(0, 3);
  
  if (!articles || articles.length === 0) {
    return (
      <section id="articles" className="section-articles py-16 section-grid">
        <div className="container mx-auto px-6">
          <div className="bg-background rounded-xl shadow-sm py-16 px-6 md:px-12 text-center">
            <h2 className="text-3xl font-bold font-heading mb-4">Latest Articles</h2>
            <p>No articles found.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="articles" className="section-articles py-16"> {/* Removed section-grid */}
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
          <div className="max-w-4xl mx-auto">
            <div className="bg-muted/50 rounded-xl shadow-sm p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/3 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Zennでの発信</h3>
                    <p className="text-sm text-muted-foreground">
                      日々の開発で得た気づきや、興味を持った技術について、Zennで発信しています。
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    自分の記事フィードバックは嬉しいですし、何より、自分自身の学びを深めるためにもアウトプットを継続していきたいと考えています！
                  </p>
                </div>
                <div className="md:w-2/3">
                  <PageFlipArticles articles={articles} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ArticleCardWrapper is no longer needed here as PageFlipArticles handles rendering
// If you still need it for other purposes, you can keep it, otherwise, it can be removed.
// For now, let's comment it out to avoid unused code.
/*
const ArticleCardWrapper = ({ article }: { article: ZennArticle }) => {
  // ... (implementation)
};
*/
