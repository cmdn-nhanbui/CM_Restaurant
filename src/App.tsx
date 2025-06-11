import { BrowserRouter } from 'react-router-dom';

import { ToastProvider } from '@/shared/contexts/toast.context';
import { Storage } from '@/shared/contexts/storage.context';
import { RouterOutlet } from '@/core/modules/custom-router-dom/RouterOutlet';
import appRoutes from '@/app.route';

function App() {
  return (
    <ToastProvider>
      <Storage>
        <BrowserRouter>
          <RouterOutlet routes={appRoutes} />
        </BrowserRouter>
      </Storage>
    </ToastProvider>
  );
}
export default App;
