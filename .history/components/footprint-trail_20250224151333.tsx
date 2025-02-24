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
