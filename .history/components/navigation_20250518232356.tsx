"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ModeToggle } from './mode-toggle';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#works', label: 'Works' },
  { href: '#articles', label: 'Articles' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-[rgba(245,245,220,0.7)] ${
        scrolled ? 'backdrop-blur-lg shadow-md border-b border-primary/20' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => {
              const currentPath = window.location.pathname;
              if (currentPath === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                window.location.href = '/';
              }
            }}
            className="flex items-center text-xl font-bold group"
          >
            <Image 
              src="/logo/icon_tm_192.png" 
              alt="Portfolio Logo"
              width={28}
              height={28}
              className="mr-2 transition-transform duration-300 ease-in-out group-hover:rotate-[360deg]"
            />
            Portfolio.ToMo
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => {
                  const currentPath = window.location.pathname;
                  if (currentPath === '/') {
                    const element = document.getElementById(item.href.substring(1));
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else {
                    window.location.href = `/${item.href}`;
                  }
                }}
                className="text-foreground/80 hover:text-foreground relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                {item.label}
              </button>
            ))}
            <ModeToggle />
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    setIsOpen(false);
                    const currentPath = window.location.pathname;
                    if (currentPath === '/') {
                      const element = document.getElementById(item.href.substring(1));
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      window.location.href = `/${item.href}`;
                    }
                  }}
                  className="block px-3 py-2 text-foreground/80 hover:text-foreground relative after:absolute after:left-3 after:bottom-1.5 after:w-[calc(100%-24px)] after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left w-full text-left"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-3 py-2">
                <ModeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
