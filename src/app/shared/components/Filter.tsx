import { Popover, PopoverPanel } from '@headlessui/react';

import { MenuWrapper } from './Menu/MenuWrapper';
import { MenuItem } from './Menu/MenuItem';
import { Select } from 'antd';

interface FilterProps<T> {
  value: T;
  onChange: (value: T) => void;
  options?: T[];
  getLabel: (item: T) => string;
}

export const Filter = <T,>({ value, onChange, options = [], getLabel }: FilterProps<T>) => {
  return (
    <Popover>
      {({ close }) => (
        <>
          <PopoverPanel transition anchor='bottom end'>
            <MenuWrapper>
              {options.map((item) => (
                <MenuItem
                  onClick={() => {
                    onChange(item);
                    close();
                  }}
                  key={getLabel(item)}
                >
                  {getLabel(item)}
                </MenuItem>
              ))}
            </MenuWrapper>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
};
