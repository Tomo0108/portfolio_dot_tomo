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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="aspect-square w-48 md:w-64 mx-auto md:mx-0 relative">
                    <div className="absolute inset-0 bg-primary/10 rounded-full">
                      <img
                        src="/profile/icon_ToMo.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-lg text-muted-foreground">
                      8年以上の経験を持つWebディレクター。インパクトのあるデジタル体験の創造に情熱を注ぎ、
                      クリエイティブディレクション、技術リーダーシップ、戦略的プランニングを得意としています。
                    </p>
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
