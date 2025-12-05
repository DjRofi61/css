'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslation } from '../../../lib/i18n';
import Image from 'next/image';

const fallbackProducts = [
  { id: 1, name: 'عباية مطرزة', price: '4900 DZD', badge: 'جديد', image: '/abaya-product.svg' },
  { id: 2, name: 'فستان سهرة', price: '7500 DZD', badge: 'مميز', image: '/dress-product.svg' },
  { id: 3, name: 'حقيبة جلد', price: '3200 DZD', badge: 'عرض', image: '/bag-product.svg' }
];

const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

async function fetchFeatured() {
  const res = await fetch(`${apiBase}/api/catalog/products`);
  if (!res.ok) throw new Error('Failed to load products');
  const data = await res.json();
  return data.products as Array<{ id: number; nameAr: string; price: string; images?: { imageUrl: string }[] }>;
}

export default function FeaturedProducts() {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useQuery({ queryKey: ['featured'], queryFn: fetchFeatured });
  const items = data?.length ? data : fallbackProducts;

  return (
    <section className="container-wide space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">{t('featured')}</h2>
        {isError && <p className="text-sm text-amber-600">تعذر جلب المنتجات الحية، نعرض بيانات تجريبية.</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <article key={product.id} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="space-y-2 text-right">
                <p className="text-xs text-rose-500">{('badge' in product && product.badge) || 'متوفر'}</p>
                <h3 className="text-lg font-semibold text-slate-900">{'nameAr' in product ? product.nameAr : product.name}</h3>
                <p className="text-brand text-xl font-bold">{('price' in product && product.price) || '—'}</p>
              </div>
              <div className="relative h-28 w-28">
                <Image
                  src={'images' in product && product.images?.[0]?.imageUrl ? product.images[0].imageUrl : (product as any).image}
                  alt={(product as any).name || (product as any).nameAr}
                  fill
                  className="object-contain drop-shadow"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
              <span>شحن سريع</span>
              <span>دفع آمن</span>
              <span>إرجاع سهل</span>
            </div>
          </article>
        ))}
        {isLoading && <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-right">جارٍ التحميل...</div>}
      </div>
    </section>
  );
}
