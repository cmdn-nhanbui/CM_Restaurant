import { useEffect, useState } from 'react';
import type { CounterProps } from '../../core/constants/types';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

export const Counter = ({ value: defaultValue, onChange, min = 1, max = 1000 }: CounterProps) => {
  const isControlled = typeof onChange === 'function';
  const [internalValue, setInternalValue] = useState(defaultValue);

  const value = isControlled ? defaultValue : internalValue;

  const updateValue = (newValue: number) => {
    if (newValue < min || newValue > max) return;

    if (isControlled) {
      onChange?.(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const handleIncrease = () => {
    updateValue(value + 1);
  };

  const handleDecrease = () => {
    updateValue(value - 1);
  };

  useEffect(() => {
    if (!isControlled) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue, isControlled]);

  return (
    <div className='flex'>
      <button
        onClick={handleDecrease}
        className='cursor-pointer p-4 bg-[var(--primary)] w-10 h-10 flex text-white items-center justify-center rounded-md'
      >
        <MinusOutlined />
      </button>
      <span className='w-10 h-10 text-center text-white leading-10'>{value}</span>
      <button
        onClick={handleIncrease}
        className='cursor-pointer p-4 bg-[var(--primary)] w-10 h-10 flex text-white items-center justify-center rounded-md'
      >
        <PlusOutlined />
      </button>
    </div>
  );
};
