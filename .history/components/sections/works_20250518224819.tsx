"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

const works = [
  {
    title: "社内勉強会の実施 (Cline - AI駆動開発の環境構築)",
    description: "Zennで作成した本「Cline - AI駆動開発の環境構築」を紹介。Clineの使い方からGitHubまでを実践的に解説しました。",
    image: "/img/works/kintai_tool/workshop-showcase.jpg",
    link: "https://zenn.dev/tomo0108/books/5c0f027ff3d972"
  },
  {
    title: "個人開発アプリ「Proxy Creator」",
    description: "TCG (トレーディングカードゲーム) のプロキシカードを簡単に作成できるウェブアプリケーションです。",
    image: "/img/works/kintai_tool/proxy-creator-showcase.png",
    link: "https://tcg-proxy-creator.vercel.app/"
  },
  {
    title: "業務効率化ツール「kintai_tool」",
    description: "freeeから取得した勤怠データをExcelフォーマットに自動転記するツール。CSVからの変換も可能で、Windows/macOSに対応。",
    image: "/img/works/kintai_tool/kintai_tool-showcase.png",
    link: "https://github.com/Tomo0108/kintai_tool/releases/tag/v2.0",
    manualLink: "https://zenn.dev/tomo0108/books/0c77481aae6591"
  },
  {
    title: "Zennでの技術記事の執筆・発信",
    description: "技術記事の執筆を通じて、ウェブ開発やAI駆動開発に関する知見を発信しています。",
    image: "/img/works/placeholder-image.jpg", // 仮の画像パスです。後で適切なものに置き換えてください。
    link: "#" // 仮のリンクです。後で適切なURLに置き換えてください。
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
                className="bg-card rounded-lg shadow-lg overflow-hidden flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="relative aspect-video w-full bg-muted rounded-t-lg">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow bg-background rounded-b-lg">
                  <h3 className="text-xl font-semibold mb-2 pb-2 text-card-foreground border-b border-border">{work.title}</h3>
                  <p className="text-muted-foreground text-sm mt-2 mb-4 flex-grow">{work.description}</p>
                  <div className="mt-auto flex items-center space-x-4">
                    <a
                      href={work.link}
                      className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      詳細はこちら <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                    {work.manualLink && (
                      <a
                        href={work.manualLink}
                        className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        マニュアル <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
