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
