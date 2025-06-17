const Notification = () => {
  return (
    <div className='flex gap-6 sm:flex-row flex-col sm:h-full'>
      <div className='w-full overflow-y-hidden flex flex-col'>
        <div className='flex flex-col text-[var(--text-lighter)] pb-6 border-b border-[var(--dark-line)]'>
          <h2 className='text-white font-semibold text-3xl'>Notifications</h2>
          <p className='text-lg'>Tuesday, 2 Feb 2021</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
