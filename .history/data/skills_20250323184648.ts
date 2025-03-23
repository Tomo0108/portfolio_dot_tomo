import { Code2, Palette, Lightbulb } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Example {
  id: string;
  title: string;
  description: string;
  longDescription: string;
}

export interface Skill {
  Icon: LucideIcon;
  title: string;
  description: string;
  examples: Example[];
}

export const skills: Skill[] = [
  {
    Icon: Code2,
    title: "Technical Direction",
    description: "AIを活用したWebアプリケーションの開発で、業務効率を飛躍的に向上させます",
    examples: [
      {
        id: "tech-1",
        title: "勤怠表自動入力ツール「kintai_tool」の作成",
        description: "勤怠表の入力を自動化することで、手入力によるミスの防止・作業時間の短縮を実現",
        longDescription: "Excelマクロを使用して勤怠表の自動入力を実現。日々の勤務時間を記録したCSVファイルから、会社指定のフォーマットに沿って勤怠表を自動生成します。手入力による転記ミスを防ぎ、月末の勤怠表作成時間を90%削減しました。また、プロジェクトごとの工数集計機能も実装し、業務効率の可視化にも貢献しています。"
      },
      {
        id: "tech-2",
        title: "VBAマクロによる全角/半角変換ツール作成",
        description: "住所を指定のフォーマットに変換する際に、作業時間を大幅に短縮",
        longDescription: "住所データの全角/半角変換を自動化することで、大量のデータ処理を効率化し、作業時間を大幅に削減しました。"
      },
      {
        id: "tech-3",
        title: "特定の業務に最適化された自動化ツールの作成",
        description: "AIを活用して2時間で業務ツールを開発し、定常業務の手作業を自動化",
        longDescription: "詳細な技術仕様や成果についての詳細な説明をここに記載します。"
      }
    ]
  },
  {
    Icon: Palette,
    title: "Creative Direction",
    description: "デザインの提案と実装をリードし、ユーザー体験を向上させます",
    examples: [
      {
        id: "creative-1",
        title: "デザインに優れたホームページの実装",
        description: "要件に合わせて、デザインを最適化したホームページを制作",
        longDescription: "詳細な技術仕様や成果についての詳細な説明をここに記載します。"
      },
      {
        id: "creative-2",
        title: "コンセプトを反映したRPG風デザインの会社案内を制作",
        description: "SES企業のコンセプトを反映したデザインで、社内外の理解を深める",
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
    Icon: Lightbulb,
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
