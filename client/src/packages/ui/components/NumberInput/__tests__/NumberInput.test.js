import React from 'react';
import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { NumberInput } from '../NumberInput';

const NumberInputWrapper = () => {
  const [value, setValue] = useState('');

  return (
    <NumberInput
      value={value}
      onChange={setValue}
      placeholder="Введите число"
    />
  );
};

describe('testing NumberInput', () => {
  it('should render placeholder', () => {
    render(<NumberInputWrapper />);

    expect(screen.getByTestId('NumberInput')).toHaveAttribute(
      'placeholder',
      'Введите число',
    );
  });

  it('should have ability to enter numbers', async () => {
    render(<NumberInputWrapper />);

    const numberInput = screen.getByTestId('NumberInput');

    await userEvent.type(numberInput, '123');

    expect(numberInput).toHaveValue('123');
  });

  it('should not allow to enter any symbols except numbers', async () => {
    render(<NumberInputWrapper />);

    const numberInput = screen.getByTestId('NumberInput');

    await userEvent.type(numberInput, 'asd');

    expect(numberInput).toHaveValue('');
  });

  it('should not allow to enter "0" as a first sybmbol, but allow to enter further', async () => {
    render(<NumberInputWrapper />);

    const numberInput = screen.getByTestId('NumberInput');

    await userEvent.type(numberInput, '00100');

    expect(numberInput).toHaveValue('100');
  });
});
