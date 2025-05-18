"use client";

import { motion } from 'framer-motion';
import { Calendar, ThumbsUp, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link'; // Linkコンポーネントをインポート
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface ZennArticle {
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
  if (!articles || articles.length === 0) {
    return (
      <section id="articles" className="section-articles py-16">
        <div className="container mx-auto px-6">
          <div className="bg-background rounded-xl shadow-sm py-16 px-6 md:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold font-heading mb-4">
                <span className="inline-block border-b-2 border-primary pb-2">Latest Articles</span>
              </h2>
            </motion.div>
            <p>No articles found.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="articles" className="section-articles py-16">
      <div className="container mx-auto px-4">
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
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {articles.map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * (article.id % 3) }} // 少し遅延させてアニメーション
                >
                  <Card className="h-full flex flex-col bg-muted/30 hover:bg-muted/60 transition-colors duration-300 shadow-md hover:shadow-lg border border-border/30 rounded-lg overflow-hidden group">
                    <CardHeader className="p-4 md:p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className="relative w-10 h-10 bg-background rounded-md flex items-center justify-center text-2xl shadow-inner flex-shrink-0">
                            {article.emoji}
                          </div>
                          <div className="flex-grow min-w-0">
                            <CardTitle className="text-md lg:text-lg font-semibold line-clamp-3 leading-snug text-foreground group-hover:text-primary transition-colors">
                              <Link href={article.url} target="_blank" rel="noopener noreferrer" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                                {article.title}
                              </Link>
                            </CardTitle>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 md:p-5 pt-0 flex-grow">
                      <div className="flex items-center text-xs text-muted-foreground mb-2">
                        <Calendar className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                        <span>{format(new Date(article.date), 'yyyy/MM/dd')}</span>
                      </div>
                      {/* ここに記事の概要などを表示する場合は追加 */}
                    </CardContent>
                    <CardFooter className="flex items-center justify-between text-xs text-muted-foreground p-4 md:p-5 pt-2 border-t border-border/30">
                      <Badge variant="outline" className="font-normal text-xs px-2 py-0.5 border-border/50">
                        <ThumbsUp className="h-3 w-3 mr-1 text-muted-foreground/80" />
                        {article.likes}
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-xs p-0 h-auto hover:text-primary text-muted-foreground" asChild>
                        <Link href={article.url} target="_blank" rel="noopener noreferrer">
                          Read on Zenn
                          <ExternalLink className="h-3.5 w-3.5 ml-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
