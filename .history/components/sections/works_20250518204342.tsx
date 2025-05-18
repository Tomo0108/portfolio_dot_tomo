"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

const works = [
  {
    title: "社内勉強会の実施 (Cline - AI駆動開発の環境構築)",
    description: "Zennで作成した本「Cline - AI駆動開発の環境構築」を紹介。Clineの使い方からGitHubまでを実践的に解説しました。",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80",
    link: "https://zenn.dev/tomo0108/books/5c0f027ff3d972"
  },
  {
    title: "個人開発アプリ「Proxy Creator」",
    description: "TCG (トレーディングカードゲーム) のプロキシカードを簡単に作成できるウェブアプリケーションです。",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    link: "https://tcg-proxy-creator.vercel.app/"
  },
  {
    title: "業務効率化ツール「kintai_tool」",
    description: "freeeから取得した勤怠データをExcelフォーマットに自動転記するツール。CSVからの変換も可能で、Windows/macOSに対応。関連ドキュメント: https://zenn.dev/tomo0108/books/0c77481aae6591",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    link: "https://github.com/Tomo0108/kintai_tool/releases/tag/v2.0"
  }
];

export function Works() {
  return (
    <section id="works" className="section-works py-16 grid-background">
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
    </section>
  );
}
