import { createContext } from 'react';
import { NotificationProps } from '../../ui';

type NotificationStateContext = Array<Partial<NotificationProps>>;

interface NotificationActionsContext {
  showNotification: (arg: Partial<NotificationProps>) => void;
  removeNotification: (arg: string) => void;
}

export const NotificationStateContext = createContext<NotificationStateContext>(
  [] as NotificationStateContext,
);

export const NotificationActionsContext =
  createContext<NotificationActionsContext>({} as NotificationActionsContext);
