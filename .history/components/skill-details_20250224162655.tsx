"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SkillDetail {
  title: string;
  description: string;
  image: string;
}

interface SkillData {
  details: SkillDetail[];
}

export const skillsData: Record<string, SkillData> = {
  "Technical Direction": {
    details: [
      {
        title: "アーキテクチャ設計",
        description: "大規模Webアプリケーションのアーキテクチャ設計と実装。マイクロサービスアーキテクチャの採用により、開発効率を50%向上。",
        image: "/skills/tech-1.jpg"
      },
      {
        title: "チーム開発の効率化",
        description: "CI/CDパイプラインの構築とGit運用ルールの策定。リリースサイクルを2週間から1週間に短縮。",
        image: "/skills/tech-2.jpg"
      }
    ]
  },
  "Creative Direction": {
    details: [
      {
        title: "UI/UXの改善",
        description: "ユーザビリティテストの実施とデータ分析に基づくUI改善。コンバージョン率が25%向上。",
        image: "/skills/creative-1.jpg"
      },
      {
        title: "デザインシステムの構築",
        description: "コンポーネントライブラリの整備とデザインガイドラインの策定。開発スピードが30%向上。",
        image: "/skills/creative-2.jpg"
      }
    ]
  },
  "Strategy": {
    details: [
      {
        title: "プロジェクト戦略立案",
        description: "市場分析とユーザーニーズの調査に基づくロードマップ策定。新規ユーザー獲得数が40%増加。",
        image: "/skills/strategy-1.jpg"
      },
      {
        title: "パフォーマンス最適化",
        description: "ページロード時間の分析と改善施策の実施。直帰率を15%削減し、セッション時間を20%延長。",
