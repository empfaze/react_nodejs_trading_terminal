import React, { forwardRef, useLayoutEffect, useRef } from 'react';
import classNames from 'classnames';
import { Option } from '../../types';
import { Text } from '../Text';
import './Menu.css';

type MenuPosition = 'bottom' | 'top';
export interface MenuProps {
  options: Option[];
  position: MenuPosition;
  onChange: (value: any) => void;
  toggleVisibility: () => void;
}

const invertPositionProp = (position: MenuPosition) => {
  switch (position) {
    case 'bottom':
      return 'top';
    case 'top':
      return 'bottom';
  }
};

// eslint-disable-next-line react/display-name
export const Menu = forwardRef<HTMLElement, MenuProps>(
  ({ options, onChange, position, toggleVisibility }, ref) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      if (ref && 'current' in ref) {
        menuRef.current!.style[
          invertPositionProp(position)
        ] = `${ref.current?.offsetHeight}px`;
      }
    }, []);

    const handleChange = (value: any) => {
      onChange(value);

      toggleVisibility();
    };

    return (
      <>
        <div
          className="MenuOverlay"
          onClick={toggleVisibility}
          data-testid="MenuOverlay"
        />

        <div ref={menuRef} className="Menu" data-testid="Menu">
          {options.map(({ text, value, align, size }) => (
            <button
              key={value}
              onClick={() => handleChange(value)}
              className={classNames('MenuItem', {
                [`MenuItem--${align}`]: align,
                [`MenuItem--${size}`]: size,
              })}
              data-testid="MenuItem"
            >
              <Text value={text} size={size} />
            </button>
          ))}
        </div>
      </>
    );
  },
);
