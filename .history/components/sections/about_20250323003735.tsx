"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SkillsContainer } from '../skills-container';

export function About() {

  return (
    <section id="about" className="section-about py-24 bg-secondary/10">
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
              <div className="bg-muted/50 rounded-xl shadow-sm p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="aspect-square w-48 md:w-64 flex-shrink-0 relative">
                    <div className="absolute inset-0">
                      <img
                        src="/img/profile.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full border-2 border-primary/70"
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 space-y-2 border border-border/50 transition-all duration-300 hover:bg-background">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                        KOJIMA TOMOMASA
                      </h3>
                      <p className="text-base text-muted-foreground">
                        <span className="block">1998年1月8日生まれ。</span>
                        <span className="block">業務改善ツールの作成、Webディレクションを得意としています。</span>
                        <span className="block">リーダーシップ・協調性・推進力で、チームの生産性を最大化します。</span>
                      </p>
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
