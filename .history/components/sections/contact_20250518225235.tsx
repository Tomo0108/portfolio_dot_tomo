"use client";

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Contact() {
  return (
    <section id="contact" className="section-contact py-16 section-grid">
      <div className="container mx-auto px-6">
        <div className="bg-background rounded-xl shadow-sm py-16 px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold font-heading text-center mb-12">
              <span className="inline-block border-b-2 border-primary pb-2">Contact</span>
            </h2>
          </motion.div>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-foreground/80 mb-6">
              お問い合わせは、以下のメールアドレスまでお気軽にご連絡ください。
            </p>
            <Button asChild variant="default" size="lg">
              <a href="mailto:tomomasa0108@gmail.com" className="inline-flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                tomomasa0108@gmail.com
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
