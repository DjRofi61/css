import { Suspense } from 'react';
import Hero from './(sections)/Hero';
import CategoryGrid from './(sections)/CategoryGrid';
import FeaturedProducts from './(sections)/FeaturedProducts';
import Newsletter from './(sections)/Newsletter';

export default function HomePage() {
  return (
    <main className="space-y-16 pb-16">
      <Hero />
      <CategoryGrid />
      <Suspense fallback={<div className="container-wide text-center">جارٍ تحميل المنتجات...</div>}>
        <FeaturedProducts />
      </Suspense>
      <Newsletter />
    </main>
  );
}
