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
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();
    const speed = 360 / 20000; // 360度/20秒

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (isRotating) {
        setRotation(prev => (prev + speed * deltaTime) % 360);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isRotating]);

  const handleItemClick = (itemId: string) => {
    const element = document.getElementById(itemId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const getItemPosition = (index: number, total: number) => {
    const angle = (360 / total) * index;
    const radius = 35; // 親要素の35%
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return { x, y, angle };
  };

  return (
    <div 
      className={cn(
        "absolute inset-0 flex items-center justify-center pointer-events-none",
        "opacity-30 hover:opacity-100 transition-opacity duration-300 z-10",
        !isRotating && "nav-paused"
      )}
    >
      <div 
        className="w-full h-full relative"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isRotating ? 'none' : 'transform 0.5s ease-out'
        }}
      >
        <div className="absolute inset-0 border-2 border-primary rounded-full" />
        {navItems.map((item, index) => {
          const { x, y, angle } = getItemPosition(index, navItems.length);
          const isHovered = hoveredItem === item.id;

          return (
            <div
              key={item.id}
              className={cn(
                transform: `translate(-50%, -50%) scale(${isHovered ? 1.5 : 1})`,
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
                "rounded-full bg-background p-3 border-2 border-primary",
                  "hover:border-primary hover:bg-primary/5",
                  "transition-all duration-300 ease-in-out"
                )}
                style={{
                  transform: `rotate(-${rotation}deg)`,
                  transition: isRotating ? 'none' : 'transform 0.5s ease-out'
                }}
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
