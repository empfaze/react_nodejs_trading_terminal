import { useContext } from 'react';
import { OrdersContext } from '../contexts';

export const useOrdersContext = () => useContext(OrdersContext);
