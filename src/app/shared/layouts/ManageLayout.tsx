import { SidebarAdmin } from '../components/SidebarAdmin';

const ManageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-[100dvh] bg-[var(--background-primary)]'>
      <main className='h-screen overflow-y-auto scrollbar-hidden px-0 pt-0 overflow-hidden'>
        <div className='flex w-full h-full'>
          <SidebarAdmin />
          <div className='sm:p-6 w-full h-full sm:h-screen overflow-y-auto'>{children}</div>
        </div>
      </main>
    </div>
  );
};

export default ManageLayout;
