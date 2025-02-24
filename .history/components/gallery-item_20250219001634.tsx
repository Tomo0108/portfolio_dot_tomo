"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { GalleryItem, galleryItems } from '@/data/gallery';

type ImageType = 'line' | 'color' | 'complete';

export function GalleryItemView({ item }: { item: GalleryItem }) {
  const [selectedTab, setSelectedTab] = useState<ImageType>("complete");

  const imageTypes: Record<ImageType, { label: string; src: string }> = {
    line: { label: "線画", src: item.details.images.line },
    color: { label: "彩色", src: item.details.images.color },
    complete: { label: "完成", src: item.details.images.complete },
  };

  // 現在の作品以外のギャラリーアイテムを取得
  const otherItems = Object.values(galleryItems).filter(
    (galleryItem) => galleryItem.id !== item.id
  );

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <Link href="/#gallery">
          <Button variant="ghost" className="mb-8">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Button>
        </Link>

        <div className="grid grid-cols-[1fr,300px] gap-8">
          {/* メインコンテンツ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* メイン画像セクション */}
            <div className="relative aspect-[4/3] w-full bg-muted rounded-lg overflow-hidden">
              <Image
                src={imageTypes[selectedTab].src}
                alt={`${item.title} - ${imageTypes[selectedTab].label}`}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* タブセクション */}
            <div>
              <Tabs value={selectedTab} className="w-full">
                <TabsList className="w-full h-auto p-4 bg-muted/50 grid grid-cols-3 gap-4">
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
