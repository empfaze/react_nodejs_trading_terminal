import { defineMessages } from 'react-intl';
import { Side } from '../types';

const messages = defineMessages({
  [Side.BUY]: {
    id: 'mapSideToText-buy',
    defaultMessage: 'Покупка',
  },
  [Side.SELL]: {
    id: 'mapSideToText-sell',
    defaultMessage: 'Продажа',
  },
});

export const mapSideToText = (side: Side) => messages[side];
