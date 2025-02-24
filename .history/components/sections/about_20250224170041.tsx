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
              </motion.div>
            ))}
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
