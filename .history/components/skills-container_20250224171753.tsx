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
