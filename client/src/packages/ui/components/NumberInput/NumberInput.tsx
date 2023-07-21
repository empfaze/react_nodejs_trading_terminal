import React, { ChangeEvent } from 'react';
import './NumberInput.css';

interface NumberInputProps {
  value: string;
  onChange: (val: string) => void;
  defaultValue?: string;
  placeholder?: string;
}

const INT_ALLOWED_KEYS_REGEXP = /^[1-9][0-9]*$|^$/;

const isCharAllowed = (char: string) => INT_ALLOWED_KEYS_REGEXP.test(char);

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  placeholder,
  defaultValue,
  onChange,
  ...restProps
}) => {
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: enteredValue },
    } = event;

    if (!isCharAllowed(enteredValue)) {
      return;
    }

    onChange(enteredValue);
  };

  return (
    <input
      {...restProps}
      className="NumberInput"
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onInputChange}
      data-testid="NumberInput"
    />
  );
};
