"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Palette, Lightbulb, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import Link from 'next/link';

const skills = [
  {
    icon: <Code2 className="h-5 w-5" />,
    title: "Technical Direction",
    description: "AIを活用したWebアプリケーションの開発で、業務効率を飛躍的に向上させます",
    examples: [
      {
        id: "tech-1",
        title: "次世代ECプラットフォームの開発",
        description: "マイクロサービスアーキテクチャを採用し、スケーラビリティと保守性を実現",
        longDescription: "詳細な技術仕様や成果についての詳細な説明をここに記載します。"
      },
      {
        id: "tech-2",
        title: "AI活用業務システムの構築",
        description: "自然言語処理技術を用いた文書処理の自動化により、作業時間を70%削減",
        longDescription: "詳細な技術仕様や成果についての詳細な説明をここに記載します。"
      },
      {
        id: "tech-3",
        title: "開発プロセスの改善",
        description: "CI/CDパイプラインの構築とコードレビュー基準の策定で品質を向上",
        longDescription: "詳細な技術仕様や成果についての詳細な説明をここに記載します。"
      }
    ]
  },
  {
    icon: <Palette className="h-5 w-5" />,
    title: "Creative Direction",
    description: "デザインの提案と実装をリードし、ユーザー体験を向上させます",
    examples: [
      {
        id: "creative-1",
        title: "UXリデザインプロジェクト",
        description: "ユーザビリティテストに基づくUI改善で、コンバージョン率が25%向上",
        longDescription: "詳細な技術仕様や成果についての詳細な説明をここに記載します。"
      },
      {
        id: "creative-2",
        title: "デザインシステムの構築",
        description: "コンポーネントライブラリとガイドラインの整備で開発効率が30%改善",
        longDescription: "詳細な技術仕様や成果についての詳細な説明をここに記載します。"
      },
      {
        id: "creative-3",
        title: "ブランドアイデンティティ刷新",
        description: "一貫性のあるビジュアル表現の確立でブランド認知度が向上",
        longDescription: "詳細な技術仕様や成果についての詳細な説明をここに記載します。"
      }
    ]
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Strategy",
    description: "作業者の生産性向上のための戦略立案と実行をリードします",
    examples: [
      {
        id: "strategy-1",
        title: "DXコンサルティング",
        description: "業務プロセスのデジタル化で、生産性が40%向上",
        longDescription: "詳細な技術仕様や成果についての詳細な説明をここに記載します。"
      },
      {
        id: "strategy-2",
        title: "データ分析基盤の構築",
        description: "KPIモニタリングシステムの導入で、意思決定の迅速化を実現",
        longDescription: "詳細な技術仕様や成果についての詳細な説明をここに記載します。"
      },
      {
        id: "strategy-3",
        title: "プロジェクト管理改善",
        description: "アジャイル手法の導入で、開発サイクルを50%短縮",
        longDescription: "詳細な技術仕様や成果についての詳細な説明をここに記載します。"
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
              "px-3 py-1.5 rounded-lg flex items-center gap-1.5 justify-center whitespace-nowrap",
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

            <div className="space-y-2">
              {skills[selectedIndex].examples.map((example, index) => (
                <Link 
                  href={`/works/${example.id}`}
                  key={example.id}
                  className={cn(
                    "bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-border/50",
                    "transition-all duration-300 hover:bg-background flex justify-between items-center"
                  )}
                >
                  <div className="space-y-1">
                    <h5 className="font-medium">{example.title}</h5>
                    <p className="text-sm text-foreground/70">{example.description}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </Link>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
