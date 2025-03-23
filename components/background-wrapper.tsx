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
    <>
      <div className={cn(
        'fixed inset-0 -z-10',
        isHomePage ? 'bg-background' : 'bg-sub-background grid-background'
      )} />
      <div className={cn(
        className,
        'min-h-screen font-sans antialiased relative',
      )}>
        {children}
      </div>
    </>
  );
}
