"use client";

import { useState } from 'react';
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
  const [isRotating, setIsRotating] = useState(true);

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
      <div className={cn(
        "w-[280px] h-[280px] relative",
        isRotating && "animate-spin-slow"
      )}>
        <div className="absolute inset-0 border-2 border-primary/30 rounded-full" />
        {navItems.map((item, index) => {
          const { x, y } = getItemPosition(index, navItems.length);
          const isHovered = hoveredItem === item.id;

          return (
            <div
              key={item.id}
              className={cn(
                "absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto",
                "transition-all duration-300 ease-in-out cursor-pointer"
              )}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: `translate(-50%, -50%) scale(${isHovered ? 1.5 : 1}) rotate(${angle}deg)`,
              }}
              onMouseEnter={() => {
                setHoveredItem(item.id);
                setIsRotating(false);
              }}
              onMouseLeave={() => {
                setHoveredItem(null);
                setIsRotating(true);
              }}
              onClick={() => handleItemClick(item.id)}
            >
              <div
                className={cn(
                  "rounded-full bg-background p-3 border-2 border-primary/30 animate-spin-slow-reverse",
                  "hover:border-primary hover:bg-primary/5",
                  "transition-all duration-300 ease-in-out"
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
