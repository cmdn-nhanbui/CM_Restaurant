import { Footer } from '@components/Footer';
import { Sidebar } from '@components/Sidebar';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen bg-[var(--background-primary)]'>
      <main className='h-[calc(100vh-80px)] sm:h-auto overflow-y-auto scrollbar-hidden px-4 sm:px-0 pt-6 sm:pt-0 overflow-hidden'>
        <div className='flex w-full'>
          <Sidebar />
          <div className='sm:p-6 w-full'>{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
