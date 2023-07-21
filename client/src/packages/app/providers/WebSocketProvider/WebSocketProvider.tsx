import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { ClientMessage, Instrument, ServerMessage, Side } from '../../types';
import { WebSocketContext } from '../../contexts';

export const WebSocketProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const webSocket = useRef<WebSocket | null>(null);

  useEffect(() => {
    webSocket.current = new WebSocket('ws://127.0.0.1:8000/ws');

    webSocket.current.onopen = () => {
      console.log('Connection opened');
    };

    webSocket.current.onerror = () => {
      console.log('An error occured, while connecting websocket');
    };

    webSocket.current.onmessage = (event) => {
      const message: any = JSON.parse(event.data);

      switch (message.messageType) {
        case ServerMessage.SUCCESS:
          break;
        case ServerMessage.ERROR:
          break;
        case ServerMessage.EXECUTION_REPORT:
          break;
        case ServerMessage.MARKET_DATA_UPDATE:
          break;
      }
    };
  }, []);

  const send = (message: any) => {
    webSocket.current?.send(JSON.stringify(message));
  };

  const subscribeMarketData = async (instrument: Instrument) => {
    send({
      messageType: ClientMessage.SUBSCRIBE_MARKET_DATA,
      message: {
        instrument,
      },
    });
  };

  const unsubscribeMarketData = (subscriptionId: string) => {
    send({
      messageType: ClientMessage.UNSUBSCRIBE_MARKET_DATA,
      message: {
        subscriptionId,
      },
    });
  };

  const placeOrder = (
    instrument: Instrument,
    side: Side,
    amount: string,
    price: string,
  ) => {
    send({
      messageType: ClientMessage.PLACE_ORDER,
      message: {
        instrument,
        side,
        amount,
        price,
      },
    });
  };

  const context = {
    subscribeMarketData,
    unsubscribeMarketData,
    placeOrder,
  };

  return (
    <WebSocketContext.Provider value={context}>
      {children}
    </WebSocketContext.Provider>
  );
};
