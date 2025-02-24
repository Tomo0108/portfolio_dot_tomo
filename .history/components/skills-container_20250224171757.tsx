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
