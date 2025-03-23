"use client";

import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('メッセージを送信しました！');
  };

  return (
    <section id="contact" className="section-contact py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="heading-contact text-3xl font-bold font-heading text-center mb-12">Contact</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                メールアドレス
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                メッセージ
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Textarea
                  id="message"
                  placeholder="メッセージを入力してください..."
                  className="pl-10 min-h-[150px]"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              メッセージを送信
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}