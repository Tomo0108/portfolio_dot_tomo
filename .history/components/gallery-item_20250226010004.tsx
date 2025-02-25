"use client";

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Circle, Pencil, Palette, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { GalleryItem, galleryItems } from '@/data/gallery';

type ImageType = 'line' | 'color' | 'complete';

export function GalleryItemView({ item }: { item: GalleryItem }) {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<ImageType>("complete");

  const imageTypes: Record<ImageType, { label: string; src: string; description: string }> = {
    line: {
      label: "線画",
      src: item.details.images.line,
      description: "キャラクターの表情や動きを丁寧に描き込んだ線画段階。繊細なラインワークで感情を表現しています。"
    },
    color: {
      label: "彩色",
      src: item.details.images.color,
      description: "光と影のバランスを意識した彩色作業。温かみのある色使いで雰囲気を演出しています。"
    },
    complete: {
      label: "完成",
      src: item.details.images.complete,
      description: "細部まで丁寧に仕上げた完成イラスト。キャラクターの魅力を最大限に引き出しています。"
    },
  };

  const filteredItems = Object.values(galleryItems).filter(
    (galleryItem) => galleryItem.id !== item.id
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const reorderItems = (index: number) => {
    const beforeItems = [...filteredItems.slice(index), ...filteredItems.slice(0, index)];
    return beforeItems;
  };

  const [otherItems, setOtherItems] = useState(reorderItems(currentIndex));

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % filteredItems.length;
        setOtherItems(reorderItems(next));
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, filteredItems.length]);

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
    setOtherItems(reorderItems(index));
  };

  const handleOtherItemClick = (itemId: string) => {
    router.push(`/gallery/${itemId}`);
  };

  const handleNavigate = useCallback(() => {
    router.replace('/', { scroll: false });
    setTimeout(() => {
      const gallerySection = document.getElementById('gallery');
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, [router]);

  return (
    <div className="min-h-screen bg-secondary/10 py-16">
      <div className="container mx-auto px-4">
        <div className="bg-background rounded-xl shadow-sm py-12 px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-12">
            <Button 
              variant="ghost" 
              className="block"
              onClick={handleNavigate}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Gallery
            </Button>
            
            <div>
              <div className="space-y-8">
                <div className="relative aspect-[4/3] w-full bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={imageTypes[selectedTab].src}
                    alt={`${item.title} - ${imageTypes[selectedTab].label}`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                <div className="bg-muted/50 rounded-xl p-8 space-y-8">
                  <div>
                    <h1 className="text-4xl font-bold font-heading mb-6">{item.title}</h1>
                    <div className="prose dark:prose-invert">
                      <p>{item.details.fullDescription}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold font-heading mb-4">作業工程</h2>
                      <div className="grid grid-cols-3 gap-4">
                        {(Object.entries(imageTypes) as [ImageType, { label: string; src: string; description: string }][]).map(([key, { label }]) => {
                          const icon = key === 'line' ? <Pencil className="h-5 w-5" /> :
                                    key === 'color' ? <Palette className="h-5 w-5" /> :
                                    <ImageIcon className="h-5 w-5" />;
                          
                          return (
                            <button
                              key={key}
                              onClick={() => setSelectedTab(key)}
                              className={cn(
                                "p-4 rounded-lg border-2 transition-all duration-200",
                                "hover:bg-muted/50",
                                selectedTab === key
                                  ? "border-primary bg-primary/5"
                                  : "border-border"
                              )}
                            >
                              <div className="flex flex-col items-center space-y-2">
                                <div className={cn(
                                  "p-2 rounded-full",
                                  selectedTab === key
                                    ? "bg-primary/10 text-primary"
                                    : "bg-muted text-muted-foreground"
                                )}>
                                  {icon}
                                </div>
                                <span className="text-sm font-medium">{label}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <motion.div
                        key={selectedTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 p-4 bg-background rounded-lg"
                      >
                        <p className="text-muted-foreground">{imageTypes[selectedTab].description}</p>
                      </motion.div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold font-heading mb-4">使用ツール</h2>
                      <div className="flex flex-wrap gap-2">
                        {item.details.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-background rounded-full text-sm border border-border"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <div className="w-full bg-muted/50 rounded-lg p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold font-heading border-b border-border/50 pb-2">その他の作品</h3>
                <span className="inline-block border-b-2 border-primary pb-2">その他の作品</span>
              </h3>
              <div className="w-full bg-muted/50 rounded-xl p-8">
                <div className="space-y-8">
                  <div className="relative h-[150px] md:h-[200px]">
                    <div className="absolute inset-0 grid grid-cols-4 gap-4">
                      <AnimatePresence initial={false} mode="popLayout">
                        {otherItems.map((otherItem, index) => (
                          <motion.div
                            key={`${otherItem.id}-${index}`}
                            initial={{ 
                              opacity: 0,
                              x: 50,
                              scale: 0.95
                            }}
                            animate={{ 
                              opacity: index === 1 ? 1 : 0.3,
                              scale: index === 1 ? 1 : 0.95,
                              x: 0,
                              zIndex: index === 1 ? 1 : 0
                            }}
                            exit={{ 
                              opacity: 0,
                              x: -50,
                              transition: { duration: 0.4 }
                            }}
                            transition={{
                              duration: 0.6,
                              ease: [0.32, 0.72, 0, 1]
                            }}
                            className="col-span-1"
                            style={{
                              position: 'relative',
                              transformOrigin: 'center center'
                            }}
                          >
                            <div 
                              className="group relative aspect-[4/3] bg-muted rounded-lg overflow-hidden cursor-pointer"
                              onClick={() => handleOtherItemClick(otherItem.id)}
                              onMouseEnter={() => index === 1 && setIsPaused(true)}
                              onMouseLeave={() => setIsPaused(false)}
                            >
                              <Image
                                src={otherItem.image}
                                alt={otherItem.title}
                                fill
                                quality={100}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-all duration-300 group-hover:scale-[1.02]"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex justify-center gap-2">
                    {filteredItems.map((_, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 p-0"
                        onClick={() => handleIndicatorClick(index)}
                      >
                        <Circle 
                          className={`h-2 w-2 transition-colors ${
                            index === currentIndex 
                              ? 'fill-primary stroke-primary' 
                              : 'fill-none stroke-muted-foreground/40'
                          }`}
                        />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
