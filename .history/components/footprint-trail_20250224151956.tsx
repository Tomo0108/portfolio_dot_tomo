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

  const createFootprintTrail = (startX: number, startY: number, startAngle: number): FootprintPosition[] => {
    const trail: FootprintPosition[] = [];
    let currentX = startX;
    let currentY = startY;
    let currentAngle = startAngle;
    let isLeft = true;

    for (let i = 0; i < 7; i++) {
      // 歩幅を一定範囲内でランダムに
      const stepLength = 40 + Math.random() * 20; // 40-60pxの範囲
      // 進行方向の変化を小さく
      const angleChange = (Math.random() * 10 - 5); // -5度から+5度
      currentAngle += angleChange;
      
      // 次の位置を計算
      currentX += stepLength * Math.cos(currentAngle * Math.PI / 180);
    return {
      id: Date.now() + index,
      x: Math.max(10, Math.min(90, x)), // 画面内に収める
      y: Math.max(10, Math.min(90, y)),
      opacity: 1,
      isLeft: prevFootprint ? !prevFootprint.isLeft : true,
      angle: prevFootprint?.angle ?? Math.random() * 360,
    };
  };

  const startNewTrail = async () => {
    setFootprints([]); // リセット
    setIsAnimating(true);

    for (let i = 0; i < 7; i++) {
      await new Promise(resolve => setTimeout(resolve, 300)); // 0.3秒間隔で足跡を追加
      setFootprints(prev => [...prev, createFootprint(i)]);
    }

    // すべての足跡を徐々にフェードアウト
    for (let i = 0; i < 7; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setFootprints(prev =>
        prev.map((fp, index) =>
          index === i ? { ...fp, opacity: Math.max(0, fp.opacity - 0.2) } : fp
        )
      );
    }

    // 完全に消えるまで待つ
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAnimating(false);
  };

  useEffect(() => {
    let mounted = true;

    const animate = async () => {
      if (!mounted) return;
      await startNewTrail();
      if (mounted) {
        setIsAnimating(false);
      }
    };

    if (!isAnimating) {
      animate();
    }

    return () => {
      mounted = false;
    };
  }, [isAnimating]);

  // 初回マウント時に開始
  useEffect(() => {
    startNewTrail();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {footprints.map((fp) => (
        <div
          key={fp.id}
          className="absolute transition-opacity duration-1000"
          style={{
            left: `${fp.x}%`,
            top: `${fp.y}%`,
            opacity: fp.opacity,
            transform: `rotate(${fp.angle}deg)`,
          }}
        >
          <Footprint
            className={cn(
              "w-8 h-8 text-primary/40",
              fp.isLeft && "scale-x-[-1]"
            )}
          />
        </div>
      ))}
    </div>
  );
}
