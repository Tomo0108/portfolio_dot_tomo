"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { GalleryItem } from '@/data/gallery';

export function GalleryItemView({ item }: { item: GalleryItem }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <Link href="/#gallery">
          <Button variant="ghost" className="mb-8">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* 左側：画像セクション */}
          <div className="space-y-6">
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
              <Image
                src={item.details.images[selectedImage]}
                alt={`${item.title} - Image ${selectedImage + 1}`}
                fill
                className="object-cover"
              />
            </div>
            
            <Tabs defaultValue="0" className="w-full">
              <TabsList className="grid grid-cols-3 gap-2">
                {item.details.images.map((_, index) => (
                  <TabsTrigger
                    key={index}
                    value={index.toString()}
                    onClick={() => setSelectedImage(index)}
                    className="relative aspect-video"
                  >
                    <Image
                      src={item.details.images[index]}
                      alt={`${item.title} preview ${index + 1}`}
                      fill
                      className="object-cover rounded"
                    />
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* 右側：詳細情報セクション */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold font-heading">{item.title}</h1>
            
            <div className="prose dark:prose-invert">
              <p>{item.details.fullDescription}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-heading">Technologies</h2>
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
      </div>
    </div>
  );
}
