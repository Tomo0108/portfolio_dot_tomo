"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ModeToggle } from './mode-toggle';
import { Menu, X } from 'lucide-react';

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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            Portfolio
          </Link>

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
                className="text-foreground/80 hover:text-foreground transition-colors"
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
                  className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors w-full text-left"
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
