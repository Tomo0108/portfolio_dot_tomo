"use client";

import Image from 'next/image';
import { galleryItems } from '@/data/gallery';
import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Circle, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function Gallery() {
  const router = useRouter();
  const allItems = Object.values(galleryItems);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleItemClick = (itemId: string) => {
    router.push(`/gallery/${itemId}`);
  };

  const handleIndicatorClick = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <section id="gallery" className="section-gallery py-16 grid-background">
      <div className="container mx-auto px-6">
        <div className="bg-background rounded-xl shadow-sm py-16 px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold font-heading text-center mb-12">
              <span className="inline-block border-b-2 border-primary pb-2">Gallery</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto mb-12">
            <Card className="bg-card rounded-lg shadow-lg border border-border overflow-hidden">
              <CardContent className="p-6 bg-background">
                <Badge variant="outline" className="mb-3 px-3 py-1 text-sm font-medium border-primary/80 bg-primary text-primary-foreground flex items-center gap-2">
                  <Pencil className="h-4 w-4" />
                  これまでに制作したイラスト
                </Badge>
                <div className="text-base md:text-sm text-foreground/90 leading-relaxed font-medium">
                  小さな頃から絵を描くことが好きです。直接的ではないにしろ、アイデアを素早く思いつく頭の柔軟さと、仕事への真摯な向き合い方はここから発現したものだと自己認識しています。<br />
                  短い期間ですが、イラストレーターとして活動していた時期もありました。今後もライフワークとして、緩やかに続けていきたいです。
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto"
          >
            <CarouselContent>
              {allItems.map((item, index) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <div 
                      className="group relative aspect-[3/4] sm:aspect-square md:aspect-[3/4] bg-muted rounded-lg overflow-hidden cursor-pointer w-full border border-border"
                      onClick={() => handleItemClick(item.id)}
                    >
                      <Image
                        src={item.thumbnailImage || item.image}
                        alt={item.title}
                        fill
                        priority={index === 0}
                        quality={75}
                        sizes="(max-width: 640px) 90vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        placeholder={item.blurDataURL ? "blur" : "empty"}
                        blurDataURL={item.blurDataURL}
                        className="object-cover transition-all duration-300 group-hover:scale-105"
                      />
                       <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <p className="text-white text-lg font-semibold">{item.title}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>

          <div className="flex justify-center gap-1.5 mt-8">
            {Array.from({ length: count }).map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className="w-6 h-6 p-0 hover:bg-accent-orange/10"
                onClick={() => handleIndicatorClick(index)}
              >
                <Circle 
                  className={`h-2 w-2 transition-colors ${
                    index === current
                      ? 'fill-accent-orange stroke-accent-orange' 
                      : 'fill-muted-foreground/40 stroke-muted-foreground/40'
                  }`}
                />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
