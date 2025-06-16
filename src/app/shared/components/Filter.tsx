import { CaretDownOutlined } from '@ant-design/icons';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

import { MenuWrapper } from './Menu/MenuWrapper';
import { MenuItem } from './Menu/MenuItem';

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
          <span className='sm:text-base text-sm text-[var(--text-lighter)] mr-2'>Sort by</span>
          <PopoverButton style={{ outline: 'none' }}>
            <div className='flex items-center'>
              <div className='text-white min-w-20 sm:p-3.5 p-2 rounded-lg font-semibold bg-[var(--background-secondary)] cursor-pointer border border-[var(--dark-line)]'>
                <span className='mr-2 sm:text-base text-sm'>{getLabel(value)}</span>
                <CaretDownOutlined />
              </div>
            </div>
          </PopoverButton>

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
