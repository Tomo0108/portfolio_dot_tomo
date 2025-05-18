"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SkillsContainer } from '../skills-container';
import { Code2, Palette, Lightbulb, ExternalLink } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export function About() {
  return (
    <section id="about" className="section-about py-16 section-grid">
      <div className="container mx-auto px-4">
        <div className="bg-background rounded-xl shadow-sm py-16 px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold font-heading text-center mb-12">
              <span className="inline-block border-b-2 border-primary pb-2">About Me</span>
            </h2>
            <div className="max-w-4xl mx-auto mb-16">
              <div className="relative bg-muted/80 rounded-xl p-6 md:p-8 overflow-hidden backdrop-blur-sm border">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="aspect-square w-48 md:w-64 flex-shrink-0 relative">
                    <Image
                      src="/img/profile.jpg"
                      alt="Profile"
                      fill
                      className="object-cover rounded-full border-2 border-primary/70"
                      priority
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 space-y-2 border border-border/50 transition-all duration-300 hover:bg-background">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                        <span className="bg-white dark:bg-white px-2 py-1 rounded inline-block text-black">
                          <span className="block text-sm mb-1 japanese-heading">小島 トモマサ</span>
                          <span className="block">KOJIMA TOMOMASA</span>
                        </span>
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-3 bg-primary text-white border border-primary/80 rounded-t-xl px-4 py-2 font-medium shadow-sm">
                            <Code2 className="h-5 w-5" />
                            Technical Direction
                          </div>
                          <div className="bg-background/90 rounded-b-xl px-4 py-3 text-base font-semibold text-foreground shadow-sm border-x border-b border-primary/40 -mt-1">
                            AIを活用したWebアプリケーションの開発で、業務効率を飛躍的に向上させます
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-3 bg-primary text-white border border-primary/80 rounded-t-xl px-4 py-2 font-medium shadow-sm">
                            <Palette className="h-5 w-5" />
                            Creative Direction
                          </div>
                          <div className="bg-background/90 rounded-b-xl px-4 py-3 text-base font-semibold text-foreground shadow-sm border-x border-b border-primary/40 -mt-1">
                            デザイン性とユーザー体験を両立したWebアプリケーションを提案・実現します
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-3 bg-primary text-white border border-primary/80 rounded-t-xl px-4 py-2 font-medium shadow-sm">
                            <Lightbulb className="h-5 w-5" />
                            Strategy
                          </div>
                          <div className="bg-background/90 rounded-b-xl px-4 py-3 text-base font-semibold text-foreground shadow-sm border-x border-b border-primary/40 -mt-1">
                            戦略的な視点で課題を分析し、最適なソリューションを導きます
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              <SkillsContainer />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
