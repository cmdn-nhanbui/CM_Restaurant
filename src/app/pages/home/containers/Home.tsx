import { NavLink } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

import { SectionMenu } from '@/shared/components/SectionMenu';
import { TextField } from '@/shared/components/TextField';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className='flex sm:flex-row flex-col w-full justify-between items-center'>
        <div className='flex flex-col text-[var(--text-lighter)] sm:w-auto w-full mb-3 sm:mb-0'>
          <h2 className='text-white font-semibold text-3xl'>Jaegar Resto</h2>
          <p className='text-lg'>Tuesday, 2 Feb 2021</p>
        </div>
        <div className='py-2 w-full sm:w-[400px]'>
          <div className='relative'>
            <TextField placeholder='Search for food, coffe, etc..' className='pr-6' />
            <div className='absolute top-1/2 right-2 -translate-y-1/2 flex'>
              <SearchOutlined style={{ fontSize: 20, color: 'white' }} />
            </div>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <nav className='flex gap-8 sm:mt-6 mt-4 border-b border-[var(--dark-line)] overflow-x-auto scrollbar-hidden whitespace-nowrap pb-4 sm:pb-6'>
          <NavLink to={'/category'} className='text-[var(--primary)] font-semibold'>
            Hot Dishes
          </NavLink>
          <NavLink to={'/category'} className='text-white font-semibold'>
            Cold Dishes
          </NavLink>
          <NavLink to={'/category'} className='text-white font-semibold'>
            Soup
          </NavLink>
          <NavLink to={'/category'} className='text-white font-semibold'>
            Grill
          </NavLink>
          <NavLink to={'/category'} className='text-white font-semibold'>
            Appetizer
          </NavLink>
          <NavLink to={'/category'} className='text-white font-semibold'>
            Dessert
          </NavLink>
        </nav>
      </div>

      <SectionMenu />
    </div>
  );
};

export default Home;
