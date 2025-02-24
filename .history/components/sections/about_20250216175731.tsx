"use client";

import { motion } from 'framer-motion';
import { Code2, Palette, Lightbulb } from 'lucide-react';

const skills = [
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "Technical Direction",
    description: "開発チームのリーダーシップとスケーラブルなソリューションの設計を担当"
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Creative Direction",
    description: "独自のビジュアルアイデンティティとユーザー体験の創造"
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Strategy",
    description: "ビジネスの成長を促進するデジタル戦略の立案"
  }
];

export function About() {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg text-muted-foreground">
              8年以上の経験を持つWebディレクター。インパクトのあるデジタル体験の創造に情熱を注ぎ、
              クリエイティブディレクション、技術リーダーシップ、戦略的プランニングを得意としています。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                className="p-6 bg-background rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="mb-4 text-primary">{skill.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                <p className="text-muted-foreground">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}