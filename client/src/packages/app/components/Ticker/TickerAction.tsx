import React from 'react';
import { Button, ButtonProps, Text, TextProps } from '../../../ui';

export const TickerAction: React.FC<ButtonProps & TextProps> = ({
  intent,
  color,
  label,
  value,
  onClick,
  disabled,
}) => (
  <div className="flex flex-col gap-y-3">
    <Text value={value} color={color} align="center" size="large" bold />

    <Button
      label={label}
      onClick={onClick}
      intent={intent}
      disabled={disabled}
      fullwidth
    />
  </div>
);
