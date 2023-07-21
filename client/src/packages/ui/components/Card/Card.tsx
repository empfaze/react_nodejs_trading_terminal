import React, { PropsWithChildren } from 'react';
import './Card.css';

export const Card: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="Card">{children}</div>
);
