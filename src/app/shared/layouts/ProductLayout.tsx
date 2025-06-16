import { Footer } from '@components/Footer';
import { Sidebar } from '@components/Sidebar';
import { Search } from '../components/Search';
import { Navigation } from '../components/Navigation';

import type { Category } from '@/core/constants/types';

export const CATEGORIES: Category[] = [
  {
    name: 'Hot Dishes',
    id: 1,
  },
  {
    name: 'Cold Dishes',
    id: 2,
  },
  {
    name: 'Soup',
    id: 3,
  },
  {
    name: 'Grill',
    id: 4,
  },
  {
    name: 'Appetizer',
    id: 5,
  },
  {
    name: 'Dessert',
    id: 6,
  },
];
const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-[100dvh] bg-[var(--background-primary)]'>
      <main className='h-[calc(100dvh-80px)] sm:h-auto overflow-y-auto scrollbar-hidden px-4 sm:px-0 pt-6 sm:pt-0 overflow-hidden'>
        <div className='flex w-full h-full'>
          <Sidebar />
          <div className='sm:p-6 w-full h-full sm:h-screen overflow-y-auto scrollbar-hidden'>
            <div className='flex sm:flex-row flex-col w-full justify-between items-center'>
              <div className='flex flex-col text-[var(--text-lighter)] sm:w-auto w-full mb-3 sm:mb-0'>
                <h2 className='text-white font-semibold text-3xl'>Jaegar Resto</h2>
                <p className='text-lg'>Tuesday, 2 Feb 2021</p>
              </div>
              <div className='py-2 w-full sm:w-[400px]'>
                <Search />
              </div>
            </div>
            <div className='w-full'>
              <Navigation categories={CATEGORIES} />
            </div>
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductLayout;
