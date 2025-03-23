import './globals.css';
import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans, Sawarabi_Gothic } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
});

const sawarabiGothic = Sawarabi_Gothic({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sawarabi-gothic',
});

export const metadata: Metadata = {
  title: 'Portfolio | Tomo',
  description: 'Welcome to my portfolio website.',
};

function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        outfit.variable,
        plusJakartaSans.variable,
        sawarabiGothic.variable,
        'min-h-screen font-sans antialiased',
        isHomePage ? 'bg-background' : 'bg-sub-background'
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
