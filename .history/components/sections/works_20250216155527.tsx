"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

const works = [
  {
    title: "E-commerce Platform Redesign",
    description: "Led the complete redesign of a major e-commerce platform, improving conversion rates by 40%",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80",
    link: "#"
  },
  {
    title: "Corporate Website Development",
    description: "Directed the development of a responsive corporate website with a focus on user experience",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    link: "#"
  },
  {
    title: "Mobile App UI/UX Design",
    description: "Created the user interface and experience design for a successful mobile application",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    link: "#"
  }
];

export function Works() {
  return (
    <section id="works" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Featured Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work, index) => (
              <motion.div
                key={work.title}
                className="group relative overflow-hidden rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="relative aspect-video">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                  <h3 className="text-white text-xl font-semibold mb-2">{work.title}</h3>
                  <p className="text-white/80 text-sm mb-4">{work.description}</p>
                  <a
                    href={work.link}
                    className="inline-flex items-center text-white hover:text-white/80"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}