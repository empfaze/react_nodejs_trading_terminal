import { createContext } from 'react';
import { Order } from '../types';

interface OrdersContext {
  orders: Order[];
  loading: boolean;
}

export const OrdersContext = createContext<OrdersContext>({} as OrdersContext);
