import { create } from 'zustand';
import { LocaleKey } from '../lib/i18n/resources';

type LocaleState = {
  locale: LocaleKey;
  setLocale: (locale: LocaleKey) => void;
};

export const useLocale = create<LocaleState>((set) => ({
  locale: 'ar',
  setLocale: (locale) => set({ locale })
}));
