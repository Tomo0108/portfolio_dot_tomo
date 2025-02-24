"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface WorkDetails {
  id: string;
  title: string;
  description: string;
  image: string;
  details: {
    fullDescription: string;
    technologies: string[];
    images: string[];
  };
}

const works: { [key: string]: WorkDetails } = {
  "1": {
    id: "1",
    title: "Pokémon Holiday Special",
    image: "/works/pokemon-christmas.jpg",
    description: "ポケモンたちとのクリスマスをテーマにしたイラストレーション作品",
    details: {
      fullDescription: "メインキャラクターであるピカチュウ、ミュウ、リザードン、そしてコンビーが、クリスマスツリーの周りで楽しく過ごす様子を描いた作品です。雪の結晶や温かな光の演出により、幻想的で心温まる雰囲気を表現しています。",
      technologies: ["Photoshop", "Illustrator", "Digital Painting"],
      images: [
        "/works/pokemon-christmas.jpg",
        "/works/pokemon-christmas-sketch.jpg",
        "/works/pokemon-christmas-color.jpg"
      ]
    }
  },
  "2": {
    id: "2",
    title: "Creative Project 2",
    image: "/works/work2.jpg",
    description: "プロジェクトの簡単な説明文",
    details: {
      fullDescription: "プロジェクトの詳細な説明",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      images: ["/works/work2.jpg", "/works/work2-2.jpg", "/works/work2-3.jpg"]
    }
  },
  "3": {
    id: "3",
    title: "Creative Project 3",
    image: "/works/work3.jpg",
    description: "プロジェクトの簡単な説明文",
    details: {
      fullDescription: "プロジェクトの詳細な説明",
      technologies: ["React", "Node.js", "MongoDB"],
      images: ["/works/work3.jpg", "/works/work3-2.jpg", "/works/work3-3.jpg"]
    }
  }
};

export default function WorkPage({ params }: { params: { id: string } }) {
  const work = works[params.id];
  const [selectedImage, setSelectedImage] = useState(0);

  if (!work) {
    return <div>Work not found</div>;
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <Link href="/#works">
          <Button variant="ghost" className="mb-8">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Works
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
                src={work.details.images[selectedImage]}
                alt={`${work.title} - Image ${selectedImage + 1}`}
                fill
                className="object-cover"
              />
            </div>
            
            <Tabs defaultValue="0" className="w-full">
              <TabsList className="grid grid-cols-3 gap-2">
                {work.details.images.map((_, index) => (
                  <TabsTrigger
                    key={index}
                    value={index.toString()}
                    onClick={() => setSelectedImage(index)}
                    className="relative aspect-video"
                  >
                    <Image
                      src={work.details.images[index]}
                      alt={`${work.title} preview ${index + 1}`}
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
            <h1 className="text-4xl font-bold font-heading">{work.title}</h1>
            
            <div className="prose dark:prose-invert">
              <p>{work.details.fullDescription}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-heading">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {work.details.technologies.map((tech) => (
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
