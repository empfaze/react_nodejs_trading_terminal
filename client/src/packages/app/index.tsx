import React from 'react';
import { LocaleProvider } from './providers/LocaleProvider';
import { NotificationProvider } from './providers/NotificationProvider';
import { WebSocketProvider } from './providers/WebSocketProvider';
import { OrdersProvider } from './providers/OrdersProvider';
import { TradingTerminal } from './components/TradingTerminal';

export const App = () => (
  <LocaleProvider>
    <NotificationProvider>
      <WebSocketProvider>
        <OrdersProvider>
          <TradingTerminal />
        </OrdersProvider>
      </WebSocketProvider>
    </NotificationProvider>
  </LocaleProvider>
);
