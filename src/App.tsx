import { BrowserRouter } from 'react-router-dom';

import { Storage } from '@/shared/contexts/storage.context';
import { RouterOutlet } from '@/core/modules/custom-router-dom/RouterOutlet';
import appRoutes from '@/app.route';
import './app/stylesheet/style.scss';

function App() {
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
