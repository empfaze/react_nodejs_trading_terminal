import React from 'react';
import classNames from 'classnames';
import { Text, TextColor } from '../Text';
import { Align, Message, Size } from '../../types';
import './Button.css';

export type ButtonIntent = 'default' | 'success' | 'danger';

export interface ButtonProps {
  label: Message;
  intent?: ButtonIntent;
  size?: Size;
  align?: Align;
  rightIcon?: React.ReactNode;
  minimal?: boolean;
  fullwidth?: boolean;
  onClick?: (() => void) | (() => Promise<void>);
  color?: TextColor;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  intent = 'default',
  size = 'medium',
  align = 'center',
  minimal,
  fullwidth,
  rightIcon,
  onClick,
  color,
  disabled,
  ...restProps
}) => (
  <button
    {...restProps}
    disabled={disabled}
    onClick={onClick}
    className={classNames('Button', {
      [`Button--${intent}`]: intent,
      [`Button--${size}`]: size,
      [`Button--${align}`]: align,
      'Button--minimal': minimal,
      'Button--fullwidth': fullwidth,
      'Button--disabled': disabled,
    })}
  >
    <Text value={label} color={color} size={size} inherit />

    {rightIcon && <div className="Button-rightIcon">{rightIcon}</div>}
  </button>
);
