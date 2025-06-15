import classNames from 'classnames';

type AddNewDishCardProps = {
  className?: string;
};

export const AddNewDishCard = ({ className }: AddNewDishCardProps) => {
  const classes = classNames(
    `min-h-[220px] min-w-[160px] flex flex-col items-center justify-center 
                 rounded-lg border border-dashed border-[var(--primary)] 
                 bg-[var(--background-secondary)] cursor-pointer hover:bg-[#2A2A30] transition`,
    className,
  );
  return (
    <div className={classes}>
      <span className='text-[var(--primary)] text-2xl mb-2'>+</span>
      <span className='text-[var(--primary)] text-sm font-medium'>Add new dish</span>
    </div>
  );
};
