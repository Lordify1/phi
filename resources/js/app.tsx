import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { OffCanvasProvider } from './context/OffCanvasContext';
import { AuthProvider } from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';

export const appName = import.meta.env.VITE_APP_NAME || 'PhiFinance';
export const advisorName = import.meta.env.VITE_ADVISOR_NAME || 'Phi Advisor';

export const appUrl =
  import.meta.env.VITE_URL || 'https://phifinance.tech';
export const advisorUrl =
  import.meta.env.VITE_ADVISOR_URL || 'https://phifinance.tech/advisor';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx')
    ),
  setup({ el, App, props }) {
    if (!el.dataset.initialized) {
      const root = createRoot(el);
      root.render(
        <AuthProvider auth={props.initialPage.props.auth}>
          <FetchProvider>
            <OffCanvasProvider>
              <App {...props} />
              <ToastContainer />
            </OffCanvasProvider>
          </FetchProvider>
        </AuthProvider>
      );
      el.dataset.initialized = 'true';
    }
  },
  progress: {
    color: '#006F57',
  },
});
