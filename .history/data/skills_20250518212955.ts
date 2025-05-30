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
        longDescription: "AIを活用した業務改善ツール開発の成果は以下の通りです。\n\n- 管理シートからのデータ転記処理を自動化\n  - 削減時間：8h/month\n- 請求データ作成時の日付書き換え処理の自動化\n  - 削減時間：1h/month\n- 請求データ作成FMTの最新FMTでのデータ転記作業を自動化\n  - 削減時間：1.5h/month\n- 工事完了確認作業の効率化ツールの作成\n  - 削減時間：1h/month"
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
        title: "デザイン性に優れたホームページの実装",
        description: "要件に合わせて、デザインを最適化したホームページを制作",
        longDescription: "詳細な技術仕様や成果についての詳細な説明をここに記載します。"
      },
      {
        id: "creative-2",
        title: "会社のコンセプトを反映したRPG風デザインの会社案内を制作",
        description: "SES企業のブランドコンセプトを反映したデザインで、社内外の理解を深める会社案内を作成",
        longDescription: "詳細な技術仕様や成果についての詳細な説明をここに記載します。"
      },
      {
        id: "creative-3",
        title: "社内勉強会の企画・発表資料を制作",
        description: "社内のAIリテラシーを向上させる勉強会の企画とスライドショーを制作",
        longDescription: "詳細な技術仕様や成果についての詳細な説明をここに記載します。"
      }
    ]
  },
  {
    Icon: Lightbulb,
    title: "Strategy",
    description: "生産性向上のための業務フローの作成・チームのマネジメントを行います",
    examples: [
      {
        id: "strategy-1",
        title: "現場環境に最適化したDXコンサルティング",
        description: "業務プロセスの自動化で、定常業務の所要時間が80%削減",
        longDescription: "詳細な技術仕様や成果についての詳細な説明をここに記載します。"
      },
      {
        id: "strategy-2",
        title: "リーダーとしてチームの生産性向上を実現",
        description: "業務を適切に分担し、タスクの進捗管理を徹底",
        longDescription: "詳細な技術仕様や成果についての詳細な説明をここに記載します。"
      },
      {
        id: "strategy-3",
        title: "既存フローの見直しによる業務効率化",
        description: "ミスが起きやすい業務フローを見直し、業務効率を向上",
        longDescription: "詳細な技術仕様や成果についての詳細な説明をここに記載します。"
      }
    ]
  }
];
