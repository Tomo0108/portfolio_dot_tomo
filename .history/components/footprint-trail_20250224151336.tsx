"use client";

import { useEffect, useState } from 'react';
import { Footprint } from './ui/footprint';
import { cn } from '@/lib/utils';

interface FootprintPosition {
  id: number;
  x: number;
  y: number;
  opacity: number;
  isLeft: boolean;
  angle: number;
}

export function FootprintTrail() {
  const [footprints, setFootprints] = useState<FootprintPosition[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);

  const createFootprint = (index: number): FootprintPosition => {
    const prevFootprint = footprints[footprints.length - 1];
    let x: number, y: number;

    if (prevFootprint) {
      // 前の足跡から30-80px離れた位置に配置
      const distance = Math.random() * 50 + 30;
      const angle = prevFootprint.angle + (Math.random() * 30 - 15);
      x = prevFootprint.x + distance * Math.cos(angle * Math.PI / 180);
      y = prevFootprint.y + distance * Math.sin(angle * Math.PI / 180);
    } else {
