import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import appRoutes from '@/app.route';
import { Storage } from '@/shared/contexts/storage.context';
import { RouterOutlet } from '@/core/modules/custom-router-dom/RouterOutlet';

import { type AppDispatch, type RootState } from './redux/store';
import { fetchCategories } from './redux/actions/categoryActions';

import './app/stylesheet/style.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import usePusher from '@/shared/hooks/usePusher';

const queryClient = new QueryClient();

function App() {
  const categories = useSelector((state: RootState) => state.category.data);
  const dispatch = useDispatch<AppDispatch>();

  usePusher();

  useEffect(() => {
    if (!categories || !categories.length) {
      dispatch(fetchCategories());
    }
  }, []);

  return (
    <>
      <Storage>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <RouterOutlet routes={appRoutes} />
          </BrowserRouter>
        </QueryClientProvider>
      </Storage>
    </>
  );
}
export default App;
