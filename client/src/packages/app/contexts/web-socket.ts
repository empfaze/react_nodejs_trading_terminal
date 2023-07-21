import { createContext } from 'react';
import { Instrument, Side } from '../types';

interface WebSocketContext {
  subscribeMarketData: (value: Instrument) => void;
  unsubscribeMarketData: (value: string) => void;
  placeOrder: (
    instrument: Instrument,
    side: Side,
    amount: string,
    price: string,
  ) => void;
}

export const WebSocketContext = createContext({} as WebSocketContext);
