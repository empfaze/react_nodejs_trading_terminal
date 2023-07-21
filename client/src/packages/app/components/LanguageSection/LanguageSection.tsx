import React, { memo } from 'react';
import { defineMessages } from 'react-intl';
import { Card, Dropdown, Icon, Option, Text } from '../../../ui';
import { Locale } from '../../types';
import { useLocaleContext } from '../../hooks';

const messages = defineMessages({
  chooseLanguage: {
    id: 'LanguageSection-chooseLanguage',
    defaultMessage: 'Выберите язык',
  },
});

const LANGUAGE_OPTIONS: Option[] = [
  {
    value: Locale.RU_LOCALE,
    text: Locale.RU_LOCALE.toUpperCase(),
    align: 'center',
    size: 'medium',
  },
  {
    value: Locale.EN_LOCALE,
    text: Locale.EN_LOCALE.toUpperCase(),
    align: 'center',
    size: 'medium',
  },
];

// eslint-disable-next-line react/display-name
export const LanguageSection = memo(() => {
  const { locale, setLocale } = useLocaleContext();

  const handleChange = (value: Locale) => {
    setLocale(value);
  };

  return (
    <Card>
      <div className="flex items-center gap-x-3">
        <Text value={messages.chooseLanguage} size="large" color="black" />

        <Dropdown
          options={LANGUAGE_OPTIONS}
          label={locale.toUpperCase()}
          position="bottom"
          onChange={handleChange}
          rightIcon={<Icon icon="ChevronDown" size={16} />}
          minimal
        />
      </div>
    </Card>
  );
});
