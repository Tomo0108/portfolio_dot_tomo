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
                    <div className="absolute inset-0">
                      <img
                        src="/img/profile.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full border-2 border-primary/70"
                      />
                    </div>
                  </div>
                  <div className="text-center md:text-left space-y-6">
                    <div className="bg-background rounded-lg p-4 inline-block">
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                        小島 知将
                      </h3>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-lg text-muted-foreground space-y-2">
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
