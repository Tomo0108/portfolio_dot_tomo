"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { GalleryItem } from '@/data/gallery';

type ImageType = 'line' | 'color' | 'complete';

export function GalleryItemView({ item }: { item: GalleryItem }) {
  const [selectedTab, setSelectedTab] = useState<ImageType>("complete");

              alt={`${item.title} - ${imageTypes[selectedTab].label}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* タブセクション */}
          <Tabs value={selectedTab} className="w-full max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 gap-4">
              {Object.entries(imageTypes).map(([key, { label, src }]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  onClick={() => setSelectedTab(key)}
                  className="relative aspect-[4/3] p-0 h-auto data-[state=active]:bg-accent overflow-hidden"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={src}
                      alt={`${item.title} - ${label}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">{label}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* 詳細情報セクション */}
          <div className="max-w-4xl mx-auto space-y-6 mt-12">
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
      </div>
    </div>
  );
}
