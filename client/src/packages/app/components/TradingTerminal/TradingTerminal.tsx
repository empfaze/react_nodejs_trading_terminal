import React, { PropsWithChildren } from 'react';
import { defineMessages } from 'react-intl';
import { Ticker } from '../Ticker';
import { Message, Spinner, Text } from '../../../ui';
import { LanguageSection } from '../LanguageSection';
import { TradingTerminalTable } from './TradingTerminalTable';
import { useOrdersContext, useUserAgent } from '../../hooks';

export const messages = defineMessages({
  titleTicker: {
    id: 'TradingTerminal-titleTicker',
    defaultMessage: 'Торговый терминал',
  },
  titleOrders: {
    id: 'TradingTerminal-titleOrders',
    defaultMessage: 'История заявок',
  },
});

interface ContentWrapperInterface {
  title: Message;
}

const ContentWrapper: React.FC<PropsWithChildren<ContentWrapperInterface>> = ({
  children,
  title,
}) => (
  <div className="flex flex-col items-center gap-y-4">
    <Text value={title} tag="h2" className="text-2xl" />

    {children}
  </div>
);

export const TradingTerminal = () => {
  const { loading, orders } = useOrdersContext();

  useUserAgent();

  return (
    <div className="flex justify-center h-auto w-screen	p-5">
      <div className="flex flex-col items-center gap-y-9">
        <LanguageSection />

        <ContentWrapper title={messages.titleTicker}>
          <Ticker />
        </ContentWrapper>

        <ContentWrapper title={messages.titleOrders}>
          {loading ? <Spinner /> : <TradingTerminalTable orders={orders} />}
        </ContentWrapper>
      </div>
    </div>
  );
};
