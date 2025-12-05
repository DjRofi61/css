'use client';

import i18n from 'i18next';
import { initReactI18next, useTranslation as useTranslationBase } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from './resources';

const detectors = typeof window !== 'undefined' ? [LanguageDetector] : [];

const initPromise = detectors
  .reduce((acc, detector) => acc.use(detector), i18n)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    interpolation: { escapeValue: false },
    supportedLngs: ['ar', 'en'],
    ns: ['common'],
    defaultNS: 'common'
  });

export async function ensureI18nReady() {
  if (!i18n.isInitialized) {
    await initPromise;
  }
}

export function useTranslation() {
  return useTranslationBase();
}
