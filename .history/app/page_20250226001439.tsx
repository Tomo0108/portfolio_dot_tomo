import { Suspense } from 'react';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Works } from '@/components/sections/works';
import { ZennArticlesLoader } from '@/components/sections/zenn-articles-loader';
import { Gallery } from '@/components/sections/gallery';
import { Contact } from '@/components/sections/contact';
import { LoadingSpinner } from '@/components/loading-spinner';

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <About />
      <Suspense fallback={<LoadingSpinner />}>
        <Works />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <ZennArticlesLoader />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Gallery />
      </Suspense>
      <Contact />
    </div>
  );
}
