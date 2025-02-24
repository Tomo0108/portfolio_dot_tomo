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
