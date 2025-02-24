"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkillExample {
  title: string;
  description: string;
}

interface SkillData {
  title: string;
  description: string;
  icon: React.ReactNode;
  examples: SkillExample[];
}

export function SkillCard({ data }: { data: SkillData }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative p-6 bg-background rounded-lg shadow-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex items-start"
        animate={{
          x: isHovered ? -20 : 0,
