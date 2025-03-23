"use client";

import { Code2, Palette, Lightbulb } from 'lucide-react';
import { ReactElement } from 'react';

export interface Example {
  id: string;
  title: string;
  description: string;
  longDescription: string;
}

export interface Skill {
  icon: ReactElement;
  title: string;
  description: string;
  examples: Example[];
}

export const skills: Skill[] = [
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
