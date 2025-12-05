import type { Metadata } from 'next';
import './globals.css';
import '../styles/globals.css';
import { QueryProvider } from '../lib/api/queryClient';
import { ensureI18nReady } from '../lib/i18n';
import { LocaleKey } from '../lib/i18n/resources';

export const metadata: Metadata = {
  title: 'Arabic E-commerce Platform',
  description: 'Target-inspired bilingual marketplace with Arabic-first experience.',
  openGraph: {
    title: 'Arabic E-commerce Platform',
    description: 'Bilingual shopping with secure checkout and fast delivery.',
    url: 'https://example.com',
    siteName: 'Arabic Commerce'
  }
};

export default async function RootLayout({ children, params }: { children: React.ReactNode; params?: { locale?: LocaleKey } }) {
  await ensureI18nReady();
  const dir = params?.locale === 'en' ? 'ltr' : 'rtl';
  const lang = params?.locale ?? 'ar';

  return (
    <html lang={lang} dir={dir}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
