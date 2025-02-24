"use client";

import { motion } from 'framer-motion';
import { Code2, Palette, Lightbulb } from 'lucide-react';
import { SkillCard } from '../skill-card';

const skills = [
  {
    icon: <Code2 className="h-6 w-6" />,
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
    icon: <Palette className="h-6 w-6" />,
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
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Strategy",
    description: "作業者の生産性を向上させるための戦略を立案し、実行します",
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

export function About() {
  return (
    <section id="about" className="section-about py-24 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="bg-background rounded-xl shadow-sm py-16 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-about text-3xl font-bold font-heading text-center mb-12">About Me</h2>
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-muted/50 rounded-xl shadow-sm p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="aspect-square w-48 md:w-64 mx-auto md:mx-0 relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-full">
                    <img
                      src="/profile/icon_ToMo.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-lg text-muted-foreground">
                    8年以上の経験を持つWebディレクター。インパクトのあるデジタル体験の創造に情熱を注ぎ、
                    クリエイティブディレクション、技術リーダーシップ、戦略的プランニングを得意としています。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <SkillCard data={skill} />
              </motion.div>
            ))}
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
