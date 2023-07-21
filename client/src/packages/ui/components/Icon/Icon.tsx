import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import * as icons from '../icons';
import './Icon.css';

interface IconProps {
  icon?: React.ReactNode;
  size?: number | string;
  inline?: boolean;
  className?: string;
  align?: 'center' | 'baseline' | 'top' | 'bottom';
}

export const Icon: React.FC<IconProps> = ({
  icon,
  size,
  inline,
  align,
  className,
}) => {
  const iconName = typeof icon === 'string' ? `${icon}Icon` : null;
  const CustomIcon = iconName && icons[iconName as keyof typeof icons];

  const style: CSSProperties = size
    ? {
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        maxWidth: `${size}px`,
        maxHeight: `${size}px`,
      }
    : {};

  return (
    <span
      className={classNames('Icon', className, {
        'Icon--inline': inline,
        [`Icon--${align}`]: align,
      })}
      style={style}
      data-testid={icon}
    >
      {CustomIcon ? <CustomIcon /> : icon}
    </span>
  );
};
