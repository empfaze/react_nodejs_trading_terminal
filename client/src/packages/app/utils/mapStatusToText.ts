import { defineMessages } from 'react-intl';
import { Status } from '../types';

const messages = defineMessages({
  [Status.ACTIVE]: {
    id: 'mapStatusToText-active',
    defaultMessage: 'Активный',
  },
  [Status.CANCELLED]: {
    id: 'mapStatusToText-cancelled',
    defaultMessage: 'Отмененный',
  },
  [Status.FILLED]: {
    id: 'mapStatusToText-filled',
    defaultMessage: 'Успешный',
  },
  [Status.REJECTED]: {
    id: 'mapStatusToText-rejected',
    defaultMessage: 'Отклоненный',
  },
});

export const mapStatusToText = (status: Status) => messages[status];
