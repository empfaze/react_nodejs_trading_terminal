import React, { memo, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Card, Dropdown, Icon, NumberInput } from '../../../ui';
import { Option } from '../../../ui';
import { Instrument, Side } from '../../types';
import { mapInstrumentToText } from '../../utils';
import { useNotificationContext, useWebSocketContext } from '../../hooks';
import { TickerAction } from './TickerAction';

const messages = defineMessages({
  sellAction: {
    id: 'Ticker-sellAction',
    defaultMessage: 'Продажа',
  },
  buyAction: {
    id: 'Ticker-buyAction',
    defaultMessage: 'Покупка',
  },
  chooseActive: {
    id: 'Ticker-chooseActive',
    defaultMessage: 'Выберите актив',
  },
  enterAmount: {
    id: 'Ticker-enterAmount',
    defaultMessage: 'Введите объем',
  },
});

const notificationMessages = defineMessages({
  [Side.SELL]: {
    id: 'Ticker-notificationSellText',
    defaultMessage: 'Запрос на продажу актива принят',
  },
  [Side.BUY]: {
    id: 'Ticker-notificationBuyText',
    defaultMessage: 'Запрос на покупку актива принят',
  },
});

const TickerDivider = () => <div className="h-auto w-px mx-6 bg-zinc-400" />;

const INSTRUMENT_OPTIONS: Option[] = [
  {
    value: Instrument.EUR_USD,
    text: mapInstrumentToText(Instrument.EUR_USD),
    align: 'center',
    size: 'medium',
  },
  {
    value: Instrument.EUR_RUB,
    text: mapInstrumentToText(Instrument.EUR_RUB),
    align: 'center',
    size: 'medium',
  },
  {
    value: Instrument.USD_RUB,
    text: mapInstrumentToText(Instrument.USD_RUB),
    align: 'center',
    size: 'medium',
  },
];

// eslint-disable-next-line react/display-name
export const Ticker = memo(() => {
  const { formatMessage } = useIntl();
  const { showNotification } = useNotificationContext();

  const [instrument, setInstrument] = useState<Instrument | string>('');
  const [amount, setAmount] = useState('');

  const [sellValue, setSellValue] = useState('0');
  const [buyValue, setBuyValue] = useState('0');

  const { placeOrder, subscribeMarketData, unsubscribeMarketData } =
    useWebSocketContext();

  const changeInstrument = (value: Instrument) => {
    if (value === instrument) {
      return;
    }

    subscribeMarketData(value);

    setInstrument(value);
  };

  const submitOrder = (side: Side) => {
    const price = side === Side.BUY ? buyValue : sellValue;

    placeOrder(instrument as Instrument, side, amount, price);

    showNotification({
      title: notificationMessages[side],
    });
  };

  const isSubmitButtonDisabled = !amount || !instrument;

  return (
    <Card>
      <div className="flex flex-col gap-6">
        <Dropdown
          label={
            mapInstrumentToText(Number(instrument)) || messages.chooseActive
          }
          color={!instrument ? 'gray' : undefined}
          position="bottom"
          rightIcon={<Icon icon="ChevronDown" size={16} />}
          options={INSTRUMENT_OPTIONS}
          onChange={changeInstrument}
          minimal
          fullwidth
        />

        <NumberInput
          value={amount}
          onChange={setAmount}
          placeholder={formatMessage(messages.enterAmount)}
        />

        <div className="flex">
          <TickerAction
            intent="danger"
            color="red"
            label={messages.sellAction}
            value={sellValue}
            onClick={() => submitOrder(Side.SELL)}
            disabled={isSubmitButtonDisabled}
          />

          <TickerDivider />

          <TickerAction
            intent="success"
            color="green"
            label={messages.buyAction}
            value={buyValue}
            onClick={() => submitOrder(Side.BUY)}
            disabled={isSubmitButtonDisabled}
          />
        </div>
      </div>
    </Card>
  );
});
