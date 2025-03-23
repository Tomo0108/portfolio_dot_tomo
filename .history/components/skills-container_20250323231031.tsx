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
              <p className="text-sm text-foreground/80">{currentSkill.description}</p>
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
                    <div className="w-full flex flex-col items-start gap-3">
                      <h5 className="font-bold bg-white/90 dark:bg-white/90 text-black px-3 py-2 rounded-md text-lg shadow-sm block">
                        {example.title}
                      </h5>
                            <p className="text-sm text-foreground/90 leading-relaxed">{example.description}</p>
                    </div>
                  </div>
                ) : (
                  <div
                    key={example.id}
                    className={cn(
                      "bg-background/80 backdrop-blur-sm rounded-lg border border-border/50",
                      "transition-all duration-300"
                    )}
                  >
                    <Accordion type="single" collapsible>
                      <AccordionItem value={example.id} className="border-none">
                        <AccordionTrigger className="hover:no-underline p-4">
                          <div className="w-full flex flex-col items-start gap-3">
                            <h5 className="font-bold bg-white/90 dark:bg-white/90 text-black px-3 py-2 rounded-md text-lg shadow-sm block">
                              {example.title}
                            </h5>
                      <p className="text-sm text-foreground/90 leading-relaxed">{example.description}</p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {example.id === 'tech-1' ? (
                            <div className="pt-2 px-4 pb-4 flex flex-col gap-2">
                              <a
                                href="https://github.com/Tomo0108/kintai_tool/releases/tag/v2.0"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-2"
                              >
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                GitHubリリースページ
                              </a>
                              <a
                                href="https://zenn.dev/tomo0108/books/0c77481aae6591"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-2"
                              >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                  <path d="M.264 23.771h4.984c.264 0 .498-.147.645-.352L19.614.874c.176-.293-.029-.645-.381-.645h-4.72c-.235 0-.44.117-.557.323L.03 23.361c-.088.176.029.41.234.41zM17.445 23.419l6.479-10.408c.205-.323-.029-.733-.41-.733h-4.691c-.176 0-.352.088-.44.235l-6.655 10.643c-.176.264.029.616.352.616h4.779c.234-.001.468-.118.586-.353z"/>
                                </svg>
                                Zennで解説記事を読む
                              </a>
                            </div>
                          ) : example.id === 'tech-2' ? (
                            <div className="pt-2 px-4 pb-4">
                              <div className="relative overflow-hidden rounded-lg border border-border/50 bg-black/5">
                                <video
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  className="w-full aspect-video object-cover"
                                >
                                  <source src="/movie/VBAマクロによる全角半角変換ツール.mp4" type="video/mp4" />
                                </video>
                              </div>
                            </div>
                          ) : example.id === 'creative-2' ? (
                            <div className="pt-2 px-4 pb-4">
                              <div className="relative overflow-hidden rounded-lg border border-border/50 bg-background/50">
                                <object
                                  data="/pdf/会社案内_20240514.pdf"
                                  type="application/pdf"
                                  className="w-full h-[600px]"
                                >
                                  <div className="p-8 text-center bg-muted/50">
                                    <p className="text-sm text-foreground/70 mb-3">PDFの表示ができない場合は下記リンクからご確認ください</p>
                                    <a
                                      href="/pdf/会社案内_20240514.pdf"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-500 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
                                    >
                                      PDFを開く ↗
                                    </a>
                                  </div>
                                </object>
                              </div>
                            </div>
                          ) : example.id === 'creative-1' ? (
                            <div className="pt-2 px-4 pb-4">
                              <div className="relative overflow-hidden rounded-lg border border-border/50 bg-background/50 shadow-sm">
                                <div className="aspect-[16/9] w-full relative">
                                  <iframe
                                    src="https://portfolio-dot-tomo.vercel.app/"
                                    className="absolute inset-0 w-full h-full"
                                    style={{ minHeight: "600px" }}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </div>
                                <div className="mt-2 text-center">
                                  <a
                                    href="https://portfolio-dot-tomo.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:text-blue-600 transition-colors text-sm"
                                  >
                                    新規タブで開く ↗
                                  </a>
                                </div>
                              </div>
                            </div>
                          ) : example.id === 'creative-4' ? (
                            <div className="pt-2 px-4 pb-4">
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                  <img
                                    src="/gallery/pokemon-christmas.JPG"
                                    alt="Gallery preview 1"
                                    className="w-full rounded-md aspect-square object-cover hover:opacity-90 transition-opacity"
                                  />
                                  <img
                                    src="/gallery/genshin_nahida2.JPG"
                                  className="w-full rounded-md aspect-square object-cover hover:opacity-90 transition-opacity"
                                />
                                <img
                                  src="/gallery/hunterxhunter_kirua.JPG"
                                  alt="Gallery preview 3"
                                  className="w-full rounded-md aspect-square object-cover hover:opacity-90 transition-opacity"
                                />
                              </div>
                            </div>
                          ) : example.id === 'creative-3' ? (
                            <div className="pt-2 px-4 pb-4">
                              <div className="relative overflow-hidden rounded-lg border border-border/50 bg-black/5">
                                <video
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  className="w-full aspect-video object-cover"
                                >
                                  <source src="/movie/社内勉強会の企画・発表資料.mp4" type="video/mp4" />
                                </video>
                              </div>
                            </div>
                          ) : null}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
