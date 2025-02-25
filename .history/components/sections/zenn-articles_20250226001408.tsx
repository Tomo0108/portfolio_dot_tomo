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

    date: "2024-03-05",
    likes: 156,
    url: "https://zenn.dev"
  }
];

export function ZennArticles() {
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
                <div className="flex items-center text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">{article.date}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">
                  {article.title}
                </h3>
                <div className="flex items-center justify-between mt-4">
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
