'use client';

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function BackgroundWrapper({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <body className={cn(
      className,
      'min-h-screen font-sans antialiased',
      isHomePage ? 'bg-background' : 'bg-sub-background grid-background'
    )}>
      {children}
    </body>
  );
}
