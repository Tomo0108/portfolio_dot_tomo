import './globals.css';
import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans, Sawarabi_Gothic } from 'next/font/google';
import { BackgroundWrapper } from '@/components/background-wrapper';
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
  manifest: '/manifest.json',
  themeColor: '#000000',
  icons: {
    icon: '/logo/icon_tm.png', // 通常のファビコン
    apple: '/logo/icon_tm.png', // Apple Touch Icon
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <BackgroundWrapper className={cn(
          outfit.variable,
          plusJakartaSans.variable,
          sawarabiGothic.variable
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
        </BackgroundWrapper>
      </body>
    </html>
  );
}
