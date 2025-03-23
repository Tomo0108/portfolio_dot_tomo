"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { skills } from '@/data/skills';

export function SkillsContainer() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const currentSkill = skills[selectedIndex];
  const CurrentIcon = currentSkill.Icon;

  return (
    <div className="relative bg-muted/80 rounded-xl p-6 md:p-8 overflow-hidden backdrop-blur-sm border">
      <div className="flex flex-wrap md:flex-nowrap gap-3 mb-10">
        {skills.map((skill, index) => {
          const Icon = skill.Icon;
          return (
            <button
              key={skill.title}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "px-3 py-1.5 rounded-lg flex items-center gap-1.5 justify-center whitespace-nowrap",
                "transition-all duration-300 hover:shadow-md hover:bg-background/50",
                selectedIndex === index
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted-foreground/10"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{skill.title}</span>
            </button>
          );
        })}
      </div>

      <div className="relative min-h-[320px] md:min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSkill.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ 
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-primary flex items-center gap-2">
                <CurrentIcon className="h-5 w-5" />
                {currentSkill.title}
              </h3>
              <p className="text-foreground/80">{currentSkill.description}</p>
            </div>

            <div className="space-y-2">
              {currentSkill.examples.map((example) => (
                <Link 
                  href={`/works/${example.id}`}
                  key={example.id}
                  className={cn(
                    "bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-border/50",
                    "transition-all duration-300 hover:bg-background flex justify-between items-center"
                  )}
                >
                  <div className="space-y-1">
                    <h5 className="font-medium">{example.title}</h5>
                    <p className="text-sm text-foreground/70">{example.description}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </Link>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
