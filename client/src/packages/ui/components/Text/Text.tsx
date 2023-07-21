import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { Align, Message, Size } from '../../types';
import './Text.css';

export type TextColor = 'black' | 'gray' | 'white' | 'red' | 'green';

export interface TextProps {
  value: Message;
  bold?: boolean;
  tag?: keyof JSX.IntrinsicElements;
  size?: Size;
  align?: Align;
  inherit?: boolean;
  color?: TextColor;
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  value,
  color,
  size,
  tag: Tag = 'span',
  align = 'left',
  bold = false,
  inherit = false,
  className,
}) => {
  const { formatMessage } = useIntl();

  const finalValue = typeof value === 'string' ? value : formatMessage(value);

  return (
    <Tag
      className={classNames('Text', className, {
        [`Text--${size}`]: size,
        [`Text--${align}`]: align,
        [`Text--${color}`]: color,
        'Text--bold': bold,
        'Text--inherit': inherit,
      })}
    >
      {finalValue}
    </Tag>
  );
};
