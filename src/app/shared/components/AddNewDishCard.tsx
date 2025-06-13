import React from 'react';

export const AddNewDishCard: React.FC = () => {
  return (
    <div
      className='w-[160px] h-[220px] flex flex-col items-center justify-center 
                 rounded-lg border border-dashed border-[var(--primary)] 
                 bg-[var(--background-secondary)] cursor-pointer hover:bg-[#2A2A30] transition'
    >
      <span className='text-[var(--primary)] text-2xl mb-2'>+</span>
      <span className='text-[var(--primary)] text-sm font-medium'>Add new dish</span>
    </div>
  );
};
