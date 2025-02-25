"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, Circle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GalleryItem, galleryItems } from '@/data/gallery';

type ImageType = 'line' | 'color' | 'complete';

export function GalleryItemView({ item }: { item: GalleryItem }) {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<ImageType>("complete");

  const imageTypes: Record<ImageType, { label: string; src: string }> = {
    line: { label: "線画", src: item.details.images.line },
    color: { label: "彩色", src: item.details.images.color },
    complete: { label: "完成", src: item.details.images.complete },
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

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <Link href="/#gallery">
          <Button variant="ghost" className="mb-8">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Button>
        </Link>

        <div className="space-y-8">
          <div className="grid grid-cols-[1fr,300px] gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="relative aspect-[4/3] w-full bg-muted rounded-lg overflow-hidden">
                <Image
                  src={imageTypes[selectedTab].src}
                  alt={`${item.title} - ${imageTypes[selectedTab].label}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl font-bold font-heading">{item.title}</h1>
                
                <div className="prose dark:prose-invert">
                  <p>{item.details.fullDescription}</p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold font-heading">使用ツール</h2>
                  <div className="flex flex-wrap gap-2">
                    {item.details.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-muted rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <div>
              <Tabs value={selectedTab} className="w-full">
                <TabsList className="w-full h-auto p-4 bg-muted/50 grid grid-cols-1 gap-4">
                  {(Object.entries(imageTypes) as [ImageType, { label: string; src: string }][]).map(([key, { label, src }]) => (
                    <TabsTrigger
                      key={key}
                      value={key}
                      onClick={() => setSelectedTab(key)}
                      className="relative aspect-[4/3] p-0 h-auto data-[state=active]:bg-background overflow-hidden rounded-lg border-2 data-[state=active]:border-primary cursor-pointer hover:opacity-90 transition-all duration-200"
                    >
                      <div className="absolute inset-0">
                        <Image
                          src={src}
                          alt={`${item.title} - ${label}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 py-2 px-3">
                        <span className="text-white font-medium text-sm block text-center">{label}</span>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold font-heading">
              <span className="inline-block border-b-2 border-primary pb-2">その他の作品</span>
            </h3>
            <div className="w-full bg-muted/30 rounded-xl p-8">
              <div className="space-y-8">
                <div className="relative h-[200px] md:h-[250px]">
                  <AnimatePresence mode="sync">
                    {otherItems.map((otherItem, index) => (
                      <motion.div
                        key={`${otherItem.id}-${index}`}
                        initial={false}
                        animate={{ 
                          opacity: index === 1 ? 1 : 0.3,
                          scale: index === 1 ? 1 : 0.95,
                          x: 0
                        }}
                        exit={{ x: -100 }}
                        transition={{
                          duration: 0.8,
                          ease: [0.4, 0, 0.2, 1]
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
  );
}
