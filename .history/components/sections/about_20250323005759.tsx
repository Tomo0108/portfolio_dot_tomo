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
                        <span className="bg-white dark:bg-white px-2 py-1 rounded inline-block text-black">
                          <span className="block text-sm mb-1 japanese-heading">小島 トモマサ</span>
                          <span className="block">KOJIMA TOMOMASA</span>
                        </span>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        <span className="block">1998年1月8日生まれ。</span>
                        <span className="block">業務改善ツールの作成、Webディレクションを得意としています。</span>
                        <span className="block">リーダーシップ・協調性・推進力で、チームの生産性を最大化します。</span>
                      </p>
                      <div className="flex gap-3 mt-4">
                        <a
                          href="https://github.com/tomomo"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                        </a>
                        <a
                          href="https://zenn.dev/tomomo"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M.264 23.771h4.984c.264 0 .498-.147.645-.352L19.614.874c.176-.293-.029-.645-.381-.645h-4.72c-.235 0-.44.117-.557.323L.03 23.361c-.088.176.029.41.234.41zM17.445 23.419l6.479-10.408c.205-.323-.029-.733-.41-.733h-4.691c-.176 0-.352.088-.44.235l-6.655 10.643c-.176.264.029.616.352.616h4.779c.234-.001.468-.118.586-.353z"/>
                          </svg>
                        </a>
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
