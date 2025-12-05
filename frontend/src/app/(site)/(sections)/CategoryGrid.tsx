'use client';

import { useTranslation } from '../../../lib/i18n';

const categories = [
  { title: 'عبايات وشيلات', slug: 'abayas-shayla', color: 'from-rose-500/10 to-rose-500/30' },
  { title: 'مخاويير وفساتين', slug: 'dresses', color: 'from-indigo-500/10 to-indigo-500/30' },
  { title: 'اقمشة', slug: 'fabrics', color: 'from-emerald-500/10 to-emerald-500/30' },
  { title: 'ساعات واكسسوارات', slug: 'accessories', color: 'from-amber-500/10 to-amber-500/30' },
  { title: 'شنط وشوزات', slug: 'bags-shoes', color: 'from-sky-500/10 to-sky-500/30' },
  { title: 'عطور ومايكاب وكريمات', slug: 'beauty', color: 'from-violet-500/10 to-violet-500/30' },
  { title: 'آخرى', slug: 'others', color: 'from-slate-500/10 to-slate-500/30' }
];

export default function CategoryGrid() {
  const { t } = useTranslation();
  return (
    <section className="container-wide space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">{t('categories')}</h2>
        <p className="text-sm text-slate-500">7 أقسام رئيسية بتصميم RTL</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <article
            key={category.slug}
            className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${category.color} p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
          >
            <h3 className="text-xl font-semibold text-slate-900">{category.title}</h3>
            <p className="mt-2 text-sm text-slate-600">تسوّق المنتجات الحديثة والعروض الحصرية</p>
            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-rose-500 to-fuchsia-500" aria-hidden />
          </article>
        ))}
      </div>
    </section>
  );
}
