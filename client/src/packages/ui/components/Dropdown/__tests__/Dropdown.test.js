import React from 'react';
import { IntlProvider } from 'react-intl';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Dropdown } from '../Dropdown';

const onChange = jest.fn();

const TEST_OPTIONS = [
  {
    value: 1,
    text: 'First option',
    align: 'center',
    size: 'medium',
  },
  {
    value: 2,
    text: 'Second option',
    align: 'center',
    size: 'medium',
  },
];

const DEFAULT_OPTIONS = {
  label: 'Choose option',
  position: 'bottom',
  options: TEST_OPTIONS,
  onChange,
};

const DropdownWrapper = () => (
  <IntlProvider locale="ru" defaultLocale="ru" onError={() => null}>
    <Dropdown {...DEFAULT_OPTIONS} />
  </IntlProvider>
);

describe('testing Dropdown', () => {
  it('should render Dropdown', () => {
    render(<DropdownWrapper />);

    expect(screen.getByTestId('Dropdown')).toHaveTextContent('Choose option');
  });

  it('should check open/close logic via click on menu item', async () => {
    render(<DropdownWrapper />);

    await userEvent.click(screen.getByText('Choose option'));

    expect(screen.getByTestId('Menu')).toHaveTextContent('First option');
    expect(screen.getAllByTestId('MenuItem')).toHaveLength(2);

    await userEvent.click(
      within(screen.getByTestId('Menu')).getByText('Second option'),
    );

    expect(screen.queryByTestId('Menu')).not.toBeInTheDocument();
    expect(onChange).toHaveBeenCalled();
  });

  it('should check open/close logic via click on menu overlay', async () => {
    render(<DropdownWrapper />);

    await userEvent.click(screen.getByText('Choose option'));

    expect(screen.getByTestId('Menu')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('MenuOverlay'));

    expect(screen.queryByTestId('Menu')).not.toBeInTheDocument();
  });
});
