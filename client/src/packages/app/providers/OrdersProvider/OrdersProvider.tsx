import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Order } from '../../types';
import { OrdersContext } from '../../contexts';

export const OrdersProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const context = {
    orders,
    loading,
  };

  return (
    <OrdersContext.Provider value={context}>{children}</OrdersContext.Provider>
  );
};
