import { defineMessages } from 'react-intl';
import { Instrument } from '../types';

const messages = defineMessages({
  [Instrument.EUR_USD]: {
    id: 'mapInstrumentToText-eur_usd',
    defaultMessage: 'EUR/USD',
  },
  [Instrument.EUR_RUB]: {
    id: 'mapInstrumentToText-eur_rub',
    defaultMessage: 'EUR/RUB',
  },
  [Instrument.USD_RUB]: {
    id: 'mapInstrumentToText-usd_rub',
    defaultMessage: 'USD/RUB',
  },
});

export const mapInstrumentToText = (instrument: Instrument) =>
  messages[instrument];
