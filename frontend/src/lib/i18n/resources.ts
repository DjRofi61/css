export const resources = {
  ar: {
    common: {
      heroTitle: 'تسوّق أحدث المجموعات',
      heroSubtitle: 'منصة موثوقة مستوحاة من Target.com لأزياء عربية مع شحن سريع ودفع آمن.',
      ctaShop: 'تسوّق الآن',
      ctaApp: 'حمل التطبيق قريبًا',
      categories: 'التصنيفات',
      featured: 'عروض مميزة'
    }
  },
  en: {
    common: {
      heroTitle: 'Shop the latest collections',
      heroSubtitle: 'Target-inspired Arabic marketplace with fast shipping and secure checkout.',
      ctaShop: 'Shop now',
      ctaApp: 'Mobile app coming soon',
      categories: 'Categories',
      featured: 'Featured Picks'
    }
  }
};

export type LocaleKey = keyof typeof resources;
