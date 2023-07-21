import React from 'react';
import classNames from 'classnames';
import './Spinner.css';

export interface SpinnerProps {
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ className = '' }) => (
  <div className={classNames('Spinner', className)}>
    <div className="Spinner-dot" />
    <div className="Spinner-dot" />
    <div className="Spinner-dot" />
  </div>
);
