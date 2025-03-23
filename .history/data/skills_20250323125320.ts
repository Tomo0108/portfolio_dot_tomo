import { Code2, Palette, Lightbulb } from 'lucide-react';
import { ReactNode } from 'react';

export interface Example {
  id: string;
  title: string;
  description: string;
  longDescription: string;
}

export interface Skill {
  icon: ReactNode;
