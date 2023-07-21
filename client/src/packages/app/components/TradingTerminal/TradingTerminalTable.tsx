import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card, Message, Table, Text, TextColor } from '../../../ui';
import { defineMessages } from 'react-intl';
import { Order, Side } from '../../types';
import {
  mapInstrumentToText,
  mapStatusToText,
  mapSideToText,
} from '../../utils';

export interface TradingTerminalTableProps {
  orders: Order[];
}

export const messages = defineMessages({
  placeholder: {
    id: 'TradingTerminalTable-placeholder',
    defaultMessage: 'Вы еще не совершали никаких операций...',
  },
  id: {
    id: 'TradingTerminalTable-id',
    defaultMessage: 'Идентификатор',
  },
  createdAt: {
    id: 'TradingTerminalTable-createdAt',
    defaultMessage: 'Время создания',
  },
  updatedAt: {
    id: 'TradingTerminalTable-updatedAt',
    defaultMessage: 'Время изменения',
  },
  status: {
    id: 'TradingTerminalTable-status',
    defaultMessage: 'Статус',
  },
  type: {
    id: 'TradingTerminalTable-type',
    defaultMessage: 'Тип',
  },
  price: {
    id: 'TradingTerminalTable-price',
    defaultMessage: 'Стоимость',
  },
  amount: {
    id: 'TradingTerminalTable-amount',
    defaultMessage: 'Объем',
  },
  instrument: {
    id: 'TradingTerminalTable-instrument',
    defaultMessage: 'Торговый инструмент',
  },
});

const TextHeaderWrapper = ({ value }: { value: Message }) => (
  <Text value={value} size="medium" bold />
);

const TABLE_HEADER_DATA = [
  <TextHeaderWrapper key={messages.id.defaultMessage} value={messages.id} />,
  <TextHeaderWrapper
    key={messages.createdAt.defaultMessage}
    value={messages.createdAt}
  />,
  <TextHeaderWrapper
    key={messages.updatedAt.defaultMessage}
    value={messages.updatedAt}
  />,
  <TextHeaderWrapper
    key={messages.status.defaultMessage}
    value={messages.status}
  />,
  <TextHeaderWrapper
    key={messages.type.defaultMessage}
    value={messages.type}
  />,
  <TextHeaderWrapper
    key={messages.price.defaultMessage}
    value={messages.price}
  />,
  <TextHeaderWrapper
    key={messages.amount.defaultMessage}
    value={messages.amount}
  />,
  <TextHeaderWrapper
    key={messages.instrument.defaultMessage}
    value={messages.instrument}
  />,
];

const TextValueWrapper = ({
  value,
  color,
}: {
  value: Message;
  color?: TextColor;
}) => <Text value={value} size="medium" color={color} />;

const getTransformedTableData = (data: Order[]) => {
  const result: React.ReactElement[][] = [];

  data.forEach(
    ({ id, createdAt, updatedAt, status, side, price, amount, instrument }) => {
      const mainTextColor = side === Side.BUY ? 'green' : 'red';

      result.push([
        <TextValueWrapper key={uuidv4()} value={id} />,
        <TextValueWrapper key={uuidv4()} value={createdAt} />,
        <TextValueWrapper key={uuidv4()} value={updatedAt} />,
        <TextValueWrapper key={uuidv4()} value={mapStatusToText(status)} />,
        <TextValueWrapper
          key={uuidv4()}
          value={mapSideToText(side)}
          color={mainTextColor}
        />,
        <TextValueWrapper key={uuidv4()} value={price} color={mainTextColor} />,
        <TextValueWrapper
          key={uuidv4()}
          value={amount}
          color={mainTextColor}
        />,
        <TextValueWrapper
          key={uuidv4()}
          value={mapInstrumentToText(instrument)}
        />,
      ]);
    },
  );

  return result;
};

export const TradingTerminalTable: React.FC<TradingTerminalTableProps> = ({
  orders,
}) =>
  orders.length > 0 ? (
    <Card>
      <Table
        data={getTransformedTableData(orders)}
        header={TABLE_HEADER_DATA}
        align="center"
      />
    </Card>
  ) : (
    <Text value={messages.placeholder} size="large" />
  );
