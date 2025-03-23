import { Code2, Palette, Lightbulb } from 'lucide-react';
import { ReactNode } from 'react';

export interface Example {
  id: string;
  title: string;
  description: string;
  longDescription: string;
}

export interface Skill {
  icon: ReactNode;
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
