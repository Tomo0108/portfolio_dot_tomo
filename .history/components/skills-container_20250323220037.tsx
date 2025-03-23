"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { skills } from '@/data/skills';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

            <div className="grid gap-4">
              {currentSkill.examples.map((example) => (
                example.id.startsWith('strategy') ? (
                  <div
                    key={example.id}
                    className={cn(
                      "bg-background/80 backdrop-blur-sm rounded-lg border border-border/50 p-4",
                      "transition-all duration-300"
                    )}
                  >
                    <AccordionItem value={example.id} className="border-none">
                      <AccordionTrigger className="hover:no-underline p-4">
                        <div className="w-full flex flex-col items-start gap-3">
                          <h5 className="font-bold bg-white/90 dark:bg-white/90 text-black px-3 py-2 rounded-md text-lg shadow-sm block">
                            {example.title}
                          </h5>
                          <p className="text-base text-foreground/90 leading-relaxed">{example.description}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-2 px-4 pb-4">
                          <p className="text-base text-foreground/80 leading-relaxed">{example.longDescription}</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
