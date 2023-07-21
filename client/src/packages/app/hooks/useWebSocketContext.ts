import { useContext } from 'react';
import { WebSocketContext } from '../contexts';

export const useWebSocketContext = () => useContext(WebSocketContext);
