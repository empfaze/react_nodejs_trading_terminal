import { useContext } from 'react';
import { NotificationActionsContext } from '../contexts';

export const useNotificationContext = () =>
  useContext(NotificationActionsContext);
