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
  const [rotation, setRotation] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.2) % 360); // ゆっくりと回転
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const handleItemClick = (itemId: string) => {
    const element = document.getElementById(itemId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const getItemPosition = (index: number, total: number) => {
    const angle = (360 / total) * index + rotation;
    const radius = 120; // 円の半径
