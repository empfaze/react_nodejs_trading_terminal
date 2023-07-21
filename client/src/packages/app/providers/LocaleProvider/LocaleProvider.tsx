import React from 'react';
import { PropsWithChildren, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Locale } from '../../types';
import { messages } from '../../i18n';
import { LocaleContext } from '../../contexts';

export const LocaleProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(Locale.RU_LOCALE);

  return (
    <IntlProvider
      locale={locale}
      messages={messages[locale]}
      defaultLocale={Locale.RU_LOCALE}
    >
      <LocaleContext.Provider value={{ locale, setLocale }}>
        {children}
      </LocaleContext.Provider>
    </IntlProvider>
  );
};
