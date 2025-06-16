import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import appRoutes from '@/app.route';
import { Storage } from '@/shared/contexts/storage.context';
import { RouterOutlet } from '@/core/modules/custom-router-dom/RouterOutlet';

import { type AppDispatch, type RootState } from './redux/store';
import { fetchCategories } from './redux/actions/categoryActions';

import './app/stylesheet/style.scss';

function App() {
  const categories = useSelector((state: RootState) => state.category.data);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!categories || !categories.length) {
      dispatch(fetchCategories());
    }
  }, []);

  return (
    <>
      <Storage>
        <BrowserRouter>
          <RouterOutlet routes={appRoutes} />
        </BrowserRouter>
      </Storage>
    </>
  );
}
export default App;
