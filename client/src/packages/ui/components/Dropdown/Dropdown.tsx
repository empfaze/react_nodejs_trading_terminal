import React, { useRef, useState } from 'react';
import { Button, ButtonProps } from '../Button';
import { Menu, MenuProps } from '../Menu';
import './Dropdown.css';

interface DropdownProps
  extends ButtonProps,
    Omit<MenuProps, 'toggleVisibility'> {}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  onChange,
  options,
  position,
  ...restProps
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const parentRef = useRef<HTMLDivElement>(null);

  const toggleVisibility = () => setIsOpened(!isOpened);

  return (
    <div ref={parentRef} className="Dropdown" data-testid="Dropdown">
      <Button {...restProps} label={label} onClick={toggleVisibility} />

      {isOpened && (
        <Menu
          ref={parentRef}
          options={options}
          onChange={onChange}
          toggleVisibility={toggleVisibility}
          position={position}
        />
      )}
    </div>
  );
};
