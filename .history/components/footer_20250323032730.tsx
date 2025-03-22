import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} KOJIMA TOMOMASA. All rights reserved.
          </p>
          <div className="flex gap-2 mt-4 md:mt-0">
            <a
              href="https://github.com/Tomo0108"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://zenn.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              Zenn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}