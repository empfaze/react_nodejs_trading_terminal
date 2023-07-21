import React from 'react';
import { IntlProvider } from 'react-intl';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Notification } from '../Notification';

const NOTIFICATION_HIDE_TIME = 5000;

const onRemove = jest.fn();

const DEFAULT_PROPS = {
  id: '1',
  index: 0,
  onRemove,
  isHovered: false,
  title: 'Notification title',
};

const NotificationWrapper = () => (
  <IntlProvider locale="ru" defaultLocale="ru" onError={() => null}>
    <Notification {...DEFAULT_PROPS} />
  </IntlProvider>
);

describe('testing Notification', () => {
  it('should render notification and remove it after clicking on cross icon', async () => {
    render(<NotificationWrapper />);

    expect(screen.getByTestId('Notification')).toHaveTextContent(
      'Notification title',
    );

    await userEvent.click(screen.getByTestId('Cross'));

    expect(onRemove).toHaveBeenCalledWith('1');
  });

  it('should render notification and automatically remove it after 4 seconds', async () => {
    render(<NotificationWrapper />);

    expect(screen.getByTestId('Notification')).toHaveTextContent(
      'Notification title',
    );

    await new Promise((resolve) => setTimeout(resolve, NOTIFICATION_HIDE_TIME));

    expect(onRemove).toHaveBeenCalledWith('1');
  });
});
