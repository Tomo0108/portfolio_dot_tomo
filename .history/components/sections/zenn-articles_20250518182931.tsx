"use client";

import { motion } from 'framer-motion';
import { Calendar, ThumbsUp, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Carouselコンポーネントをインポート

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
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-muted/50 rounded-xl shadow-sm p-8 md:p-12">
            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 md:p-8 border border-border/50 transition-all duration-300 hover:bg-background">
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
              {/* 上部に説明カラム */}
              <div className="mb-8">
                <Card className="bg-background border border-primary/30 shadow-sm rounded-xl p-6">
                  <Badge variant="outline" className="mb-3 px-3 py-1 text-sm font-medium border-primary/40 bg-primary/10 text-primary flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Zennについて
                  </Badge>
                  <div className="text-base md:text-sm text-foreground/90 leading-relaxed font-medium">
                    日々の開発で得た気づきや、興味を持った技術について、Zennで発信しています。<br />
                    自分の記事フィードバックは嬉しいですし、何より、自分自身の学びを深めるためにもアウトプットを継続していきたいと考えています！
                  </div>
                </Card>
              </div>
              {/* 下部にカルーセル */}
              <Carousel
                opts={{
                  align: "start",
                  loop: articles.length > 3,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {articles.map((article, index) => (
                    <CarouselItem key={article.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="h-full"
                      >
                        <Card className="h-full flex flex-col bg-muted/30 hover:bg-muted/60 transition-colors duration-300 shadow-md hover:shadow-lg border border-border/30 rounded-lg overflow-hidden group">
                          <CardHeader className="p-4 md:p-5">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center space-x-3 min-w-0">
                                <div className="relative w-10 h-10 bg-background rounded-md flex items-center justify-center text-2xl shadow-inner flex-shrink-0">
                                  {article.emoji}
                                </div>
                                <div className="flex-grow min-w-0">
                                  <CardTitle className="text-md lg:text-lg sm:text-base text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors whitespace-normal break-words">
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
                            {/* <p className="text-xs text-muted-foreground line-clamp-2">
                              記事の概要をここに表示します。
                            </p> */}
                          </CardContent>
                          <CardFooter className="flex items-center justify-between text-xs text-muted-foreground p-4 md:p-5 pt-2 border-t border-border/30 mt-auto">
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
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 fill-black" />
                <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 fill-black" />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
