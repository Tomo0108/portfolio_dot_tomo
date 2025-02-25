"use client";

import { motion } from 'framer-motion';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';

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
  return (
    <section id="articles" className="section-articles py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold font-heading text-center mb-12">
            <span className="inline-block border-b-2 border-primary pb-2">Latest Articles</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.a
                key={article.title}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
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
                <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
                  {article.title}
                </h3>
                  <span className="text-sm text-muted-foreground">
                    {article.likes} likes
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
