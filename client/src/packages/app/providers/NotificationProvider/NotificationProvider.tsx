import React, { PropsWithChildren, useMemo, useRef, useState } from 'react';
import { Notification, NotificationProps } from '../../../ui';
import {
  NotificationActionsContext,
  NotificationStateContext,
} from '../../contexts';

type PartialNotificationProps = Partial<NotificationProps>;

export const NotificationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, setState] = useState<Array<PartialNotificationProps>>([]);
  const [isHovered, setIsHovered] = useState(false);

  const notificationCount = useRef(0);

  const actions = useMemo(
    () => ({
      showNotification: ({ title, text }: PartialNotificationProps) => {
        notificationCount.current += 1;

        const notification = {
          title,
          text,
          id: String(notificationCount.current),
        };

        setState((prevState) => {
          if (prevState.length < 5) {
            return [...prevState, notification];
          }

          return [...prevState.slice(-4), notification];
        });
      },
      removeNotification: (id: string) => {
        setState((prevState) =>
          prevState.filter((notification) => notification.id !== id),
        );
      },
    }),
    [],
  );

  return (
    <NotificationStateContext.Provider value={state}>
      <NotificationActionsContext.Provider value={actions}>
        {children}

        <ul
          className="flex flex-col p-5 fixed top-0 right-0 z-50"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {state.map((item: PartialNotificationProps, index: number) => (
            <Notification
              {...item}
              id={item.id!}
              title={item.title!}
              index={index}
              key={item.id}
              isHovered={isHovered}
              onRemove={actions.removeNotification}
            />
          ))}
        </ul>
      </NotificationActionsContext.Provider>
    </NotificationStateContext.Provider>
  );
};
