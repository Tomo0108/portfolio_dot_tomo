"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

const works = [
  {
    title: "ECサイトのリデザイン",
    description: "大手ECプラットフォームの全面的なリデザインを主導し、コンバージョン率を40%改善",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80",
    link: "#"
  },
  {
    title: "コーポレートサイト開発",
    description: "ユーザー体験を重視したレスポンシブ対応のコーポレートサイトの開発を指揮",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    link: "#"
  },
  {
    title: "モバイルアプリのUI/UXデザイン",
    description: "人気モバイルアプリケーションのユーザーインターフェースとエクスペリエンスデザインを担当",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    link: "#"
  }
];

export function Works() {
  return (
    <section id="works" className="section-works py-24 bg-primary/5">
      <div className="container mx-auto px-6">
        <div className="bg-background rounded-xl shadow-sm py-16 px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold font-heading text-center mb-12">
              <span className="inline-block border-b-2 border-primary pb-2">Works</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {works.map((work, index) => (
                <motion.div
                  key={work.title}
                  className="group relative overflow-hidden rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="relative aspect-video">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                    <h3 className="text-white text-xl font-semibold mb-2">{work.title}</h3>
                    <p className="text-white/80 text-sm mb-4">{work.description}</p>
                    <a
                      href={work.link}
                      className="inline-flex items-center text-white hover:text-white/80"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
