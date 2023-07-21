import { Dispatch, SetStateAction, createContext } from 'react';
import { Locale } from '../types';

interface LocaleContext {
  locale: Locale;
  setLocale: Dispatch<SetStateAction<Locale>>;
}

export const LocaleContext = createContext<LocaleContext>({} as LocaleContext);
