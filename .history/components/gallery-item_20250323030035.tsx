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

  const imageTypes: Record<ImageType, { label: string; src: string }> = {
    line: {
      label: "線画",
      src: item.details.images.line,
    },
    color: {
      label: "彩色",
      src: item.details.images.color,
    },
    complete: {
      label: "完成",
      src: item.details.images.complete,
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
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleNavigate}
                className="rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Back to Gallery</span>
              </Button>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="relative aspect-[4/3] w-full bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={imageTypes[selectedTab].src}
                    alt={`${item.title} - ${imageTypes[selectedTab].label}`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                <div className="flex justify-center gap-6">
                  {(Object.entries(imageTypes) as [ImageType, { label: string; src: string }][]).map(([key, { label }]) => {
                    const icon = key === 'line' ? <Pencil className="h-5 w-5" /> :
                             key === 'color' ? <Palette className="h-5 w-5" /> :
                             <ImageIcon className="h-5 w-5" />;
                    
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedTab(key)}
                        className={cn(
                          "p-2 rounded-lg border-2 transition-all duration-200",
                          "hover:bg-muted/50",
                          selectedTab === key
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-1.5 rounded-full",
                            selectedTab === key
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          )}>
                            {icon}
                          </div>
                          <span className="text-sm font-medium leading-none">{label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-muted/50 rounded-xl p-8">
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 border border-border/50">
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl">
                      <span className="bg-white dark:bg-white px-2 py-1 rounded inline-block text-black">
                        {(() => {
                          const jpNames: { [key: string]: string } = {
                            "Nahida": "ナヒーダ",
                            "Nahida II": "ナヒーダ",
                            "Killua": "キルア",
                            "Pokemon New Year [Dragon]": "ポケモン お正月［辰年］",
                            "Pokemon Christmas": "ポケモン クリスマス"
                          };
                          return jpNames[item.title] ? (
                            <span className="block text-sm mb-1 japanese-heading">
                              {jpNames[item.title]}
                            </span>
                          ) : null;
                        })()}
                        <span className="block">{item.title}</span>
                      </span>
                    </h3>
                    <div className="border-b border-border w-12" />
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Tools</div>
                      <div className="flex flex-wrap gap-2 mt-1">
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

            <div className="border-t border-border pt-6">
              <div className="w-full bg-muted/50 rounded-lg p-5">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold font-heading border-b border-border/50 pb-2">Other Works</h3>
                  <div className="relative h-[120px]">
                    <div className="absolute inset-0 grid grid-cols-4 gap-3">
                      <AnimatePresence initial={false} mode="popLayout">
                        {otherItems.map((otherItem, index) => (
                          <motion.div
                            key={`${otherItem.id}-${index}`}
                            initial={{ opacity: 0, x: 50, scale: 0.95 }}
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

          <Button 
            variant="ghost" 
            size="icon"
            className="fixed bottom-8 right-8 rounded-full bg-background/80 backdrop-blur shadow-lg hover:bg-background/90"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ChevronLeft className="h-5 w-5 -rotate-90" />
            <span className="sr-only">Back to Top</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
