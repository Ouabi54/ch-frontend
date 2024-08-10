import { Suspense } from 'react';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react';

import { PollingProvider } from 'src/redux/context/polling-context';

import App from './app';
import { store, persistor } from "./redux/store";
import { SocketProvider } from './redux/context/socket-context';


// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PollingProvider>
        <SocketProvider>
            <HelmetProvider>
              <BrowserRouter>
                <Suspense>
                  <App />
                </Suspense>
              </BrowserRouter>
            </HelmetProvider>
          </SocketProvider>
        </PollingProvider>
      <ToastContainer />
    </PersistGate>
  </Provider>
);
