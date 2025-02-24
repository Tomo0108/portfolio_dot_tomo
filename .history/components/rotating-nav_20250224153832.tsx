"use client";

import { useEffect, useState } from 'react';
import { User2, Briefcase, Newspaper, Image, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  icon: JSX.Element;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'about', icon: <User2 className="h-5 w-5" />, label: 'About' },
  { id: 'works', icon: <Briefcase className="h-5 w-5" />, label: 'Works' },
  { id: 'articles', icon: <Newspaper className="h-5 w-5" />, label: 'Articles' },
  { id: 'gallery', icon: <Image className="h-5 w-5" />, label: 'Gallery' },
  { id: 'contact', icon: <Mail className="h-5 w-5" />, label: 'Contact' },
];

export function RotatingNav() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleItemClick = (itemId: string) => {
    const element = document.getElementById(itemId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const getItemPosition = (index: number, total: number) => {
    const angle = (360 / total) * index;
    const radius = 120; // 円の半径
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return { x, y, angle };
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* 外周の円 */}
      <div className="w-[280px] h-[280px] animate-spin-slow flex items-center justify-center">
        <div className="w-full h-full border-2 border-primary/30 rounded-full" />
        
        {/* ナビゲーションアイテム */}
        {navItems.map((item, index) => {
          const { x, y, angle } = getItemPosition(index, navItems.length);
          const isHovered = hoveredItem === item.id;

          return (
            <div
              key={item.id}
              className={cn(
                "absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto",
                "transition-all duration-500 ease-out cursor-pointer"
              )}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: `translate(-50%, -50%) scale(${isHovered ? 1.5 : 1}) rotate(${-angle}deg)`,
              }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleItemClick(item.id)}
            >
              <div
                className={cn(
                  "rounded-full bg-background p-3 border-2 border-primary/30",
                  "hover:border-primary hover:bg-primary/5",
                  "transition-all duration-500 ease-out"
                )}
              >
                {item.icon}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
