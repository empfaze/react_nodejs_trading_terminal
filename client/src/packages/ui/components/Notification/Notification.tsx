import React, { useEffect, useRef } from 'react';
import { Text } from '../Text';
import { Icon } from '../Icon';
import { Message } from '../../types/Message';
import './Notification.css';

export interface NotificationProps {
  id: string;
  index: number;
  onRemove: (id: string) => void;
  isHovered: boolean;
  title?: Message;
  text?: Message;
}

const NOTIFICATION_HIDE_TIME = 4000;

export const Notification: React.FC<NotificationProps> = ({
  isHovered,
  id,
  title,
  text,
  index,
  onRemove,
}) => {
  const notificationRef = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timer>();
  const isClosingDelayed = useRef(false);

  const removeNotification = () => onRemove(id);

  useEffect(() => {
    if (timer.current && isHovered) {
      clearTimeout(timer.current);

      timer.current = undefined;

      isClosingDelayed.current = true;
    } else if (!timer.current && !isHovered) {
      const delay =
        NOTIFICATION_HIDE_TIME + (isClosingDelayed.current ? index * 200 : 0);

      timer.current = setTimeout(removeNotification, delay);
    }
  }, [isHovered]);

  return (
    <div
      ref={notificationRef}
      className="Notification"
      data-testid="Notification"
    >
      <div className="Notification-body">
        {title && (
          <div className="Notification-title">
            <Text value={title} size="medium" color="black" />
          </div>
        )}

        {text && (
          <div className="Notification-text">
            <Text value={text} size="small" color="gray" />
          </div>
        )}
      </div>

      <div className="Notification-removeButton" onClick={removeNotification}>
        <Icon icon="Cross" size={16} />
      </div>
    </div>
  );
};
