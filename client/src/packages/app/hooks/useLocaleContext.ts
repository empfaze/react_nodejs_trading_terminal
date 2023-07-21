import { useContext } from 'react';
import { LocaleContext } from '../contexts';

export const useLocaleContext = () => useContext(LocaleContext);
