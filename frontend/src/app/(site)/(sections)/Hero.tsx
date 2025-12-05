'use client';

import Image from 'next/image';
import { Button } from '../../../components/ui/button';
import { useTranslation } from '../../../lib/i18n';

const mockStats = [
  { label: 'إرجاع خلال 30 يومًا', value: '30' },
  { label: 'توصيل خلال 48 ساعة', value: '48' },
  { label: 'آلاف العملاء', value: '15k+' }
];

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="bg-gradient-to-br from-rose-50 via-white to-white py-16">
      <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6 text-right lg:text-right">
          <p className="text-sm font-semibold uppercase tracking-widest text-rose-500">تجربة عربية مستوحاة من Target</p>
          <h1 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl">{t('heroTitle')}</h1>
          <p className="text-lg text-slate-600">{t('heroSubtitle')}</p>
          <div className="flex flex-col items-end gap-4 sm:flex-row sm:justify-end">
            <Button className="w-full sm:w-auto" size="lg">
              {t('ctaShop')}
            </Button>
            <Button className="w-full sm:w-auto" size="lg" variant="outline">
              {t('ctaApp')}
            </Button>
          </div>
          <dl className="grid grid-cols-3 gap-4 text-right">
            {mockStats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-rose-100 bg-white p-4 shadow-sm">
                <dt className="text-sm text-slate-500">{stat.label}</dt>
                <dd className="text-2xl font-bold text-rose-600">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-rose-100" aria-hidden />
          <div className="absolute bottom-0 right-4 h-24 w-24 rounded-full bg-slate-900/5" aria-hidden />
          <Image
            src="/hero.svg"
            alt="Arabic fashion hero"
            width={520}
            height={420}
            className="relative z-10 drop-shadow-xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
