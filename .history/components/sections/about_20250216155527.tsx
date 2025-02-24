"use client";

import { motion } from 'framer-motion';
import { Code2, Palette, Lightbulb } from 'lucide-react';

const skills = [
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "Technical Direction",
    description: "Leading development teams and architecting scalable solutions"
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Creative Direction",
    description: "Crafting unique visual identities and user experiences"
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Strategy",
    description: "Developing digital strategies that drive business growth"
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
              A passionate Web Director with over 8 years of experience in creating
              impactful digital experiences. Specializing in creative direction,
              technical leadership, and strategic planning.
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