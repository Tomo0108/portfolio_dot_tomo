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
      className="relative p-6 bg-background rounded-lg shadow-sm overflow-hidden group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex items-start"
        animate={{
          x: isHovered ? -40 : 0,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
      >
        <div className="space-y-4">
          <div className="text-primary">{data.icon}</div>
          <h3 className="text-xl font-semibold">{data.title}</h3>
          <p className="text-muted-foreground">{data.description}</p>
        </div>
      </motion.div>

      <motion.div
        className={cn(
          "absolute top-0 right-0 h-full w-[65%] bg-muted/50 backdrop-blur-sm p-6 space-y-4",
          "transform transition-transform duration-300"
        )}
        initial={{ x: "100%" }}
        animate={{
          x: isHovered ? "0%" : "100%",
          opacity: isHovered ? 1 : 0,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
      >
      <div className="border-b border-border/50 pb-2">
        <h4 className="font-semibold text-lg">実績例</h4>
      </div>
        <ul className="space-y-3">
          {data.examples.map((example, index) => (
            <li key={index} className="space-y-1">
              <h5 className="font-medium text-sm">{example.title}</h5>
              <p className="text-sm text-muted-foreground">{example.description}</p>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
