"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Palette, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

const skills = [
  {
    icon: <Code2 className="h-5 w-5" />,
    title: "Technical Direction",
    description: "AIを活用したWebアプリケーションの開発で、業務効率を飛躍的に向上させます",
    examples: [
      {
        title: "次世代ECプラットフォームの開発",
        description: "マイクロサービスアーキテクチャを採用し、スケーラビリティと保守性を実現"
      },
      {
        title: "AI活用業務システムの構築",
        description: "自然言語処理技術を用いた文書処理の自動化により、作業時間を70%削減"
      },
      {
        title: "開発プロセスの改善",
        description: "CI/CDパイプラインの構築とコードレビュー基準の策定で品質を向上"
      }
    ]
  },
  {
    icon: <Palette className="h-5 w-5" />,
    title: "Creative Direction",
    description: "デザインの提案と実装をリードし、ユーザー体験を向上させます",
    examples: [
      {
        title: "UXリデザインプロジェクト",
        description: "ユーザビリティテストに基づくUI改善で、コンバージョン率が25%向上"
      },
      {
        title: "デザインシステムの構築",
        description: "コンポーネントライブラリとガイドラインの整備で開発効率が30%改善"
      },
      {
        title: "ブランドアイデンティティ刷新",
        description: "一貫性のあるビジュアル表現の確立でブランド認知度が向上"
      }
    ]
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Strategy",
    description: "作業者の生産性向上のための戦略立案と実行をリードします",
    examples: [
      {
        title: "DXコンサルティング",
        description: "業務プロセスのデジタル化で、生産性が40%向上"
      },
      {
        title: "データ分析基盤の構築",
        description: "KPIモニタリングシステムの導入で、意思決定の迅速化を実現"
      },
      {
        title: "プロジェクト管理改善",
        description: "アジャイル手法の導入で、開発サイクルを50%短縮"
      }
    ]
  }
];

export function SkillsContainer() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <div className="relative bg-muted/80 rounded-xl p-6 md:p-8 overflow-hidden backdrop-blur-sm border">
      <div className="flex flex-wrap md:flex-nowrap gap-3 mb-10">
        {skills.map((skill, index) => (
          <button
            key={skill.title}
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "px-0.5 py-1.5 rounded-lg flex items-center gap-1 justify-center whitespace-nowrap",
              "transition-all duration-300 hover:shadow-md hover:bg-background/50",
              selectedIndex === index
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted-foreground/10"
            )}
          >
            {skill.icon}
            <span className="font-medium">{skill.title}</span>
          </button>
        ))}
      </div>

      <div className="relative min-h-[320px] md:min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={skills[selectedIndex].title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ 
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-primary flex items-center gap-2">
                {skills[selectedIndex].icon}
                {skills[selectedIndex].title}
              </h3>
              <p className="text-foreground/80">{skills[selectedIndex].description}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold border-b pb-2">実績</h4>
              <ul className="grid gap-4 md:grid-cols-2">
                {skills[selectedIndex].examples.map((example, index) => (
                  <li 
                    key={index} 
                    className={cn(
                      "bg-background/80 backdrop-blur-sm rounded-lg p-4 space-y-2 border border-border/50",
                      "transition-all duration-300 hover:bg-background"
                    )}
                  >
                    <h5 className="font-medium">{example.title}</h5>
                    <p className="text-sm text-foreground/70">{example.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
