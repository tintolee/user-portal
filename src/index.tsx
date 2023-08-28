import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import StyleProvider from '@sendsprint/ui-react/dist/providers/StyleProvider/StyleProvider';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  EnvProvider,
  AuthProvider,
  MixpanelProvider,
  ToastProvider,
  DashboardProvider,
  ConnectProvider,
  NethoneProvider
} from '@src/contexts';
import QueryProvider from '@src/providers/query-provider';
import { VolumeProvider } from '@getvolume/react';
import { createBrowserHistory } from 'history';
import { ErrorBoundary } from '@sentry/react';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import Error from './pages/error';
import setupSentry from './setupSentry';

// To disable react devtools in production
if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const history = createBrowserHistory();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
setupSentry(history as any);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <StyleProvider>
          <EnvProvider>
            <ErrorBoundary fallback={({ resetError }) => <Error resetError={resetError} />}>
              <MixpanelProvider>
                <ToastProvider autoDismiss={true} placement="bottom-right">
                  <QueryProvider>
                    <AuthProvider>
                      <ConnectProvider>
                        <DashboardProvider>
                          <NethoneProvider>
                            <VolumeProvider
                              applicationId={process.env.REACT_APP_VOLUME_APP_ID || ''}
                              volumeEnvironment={process.env.REACT_APP_VOLUME_ENVIRONMENT || ''}>
                              <App />
                            </VolumeProvider>
                          </NethoneProvider>
                        </DashboardProvider>
                      </ConnectProvider>
                    </AuthProvider>
                  </QueryProvider>
                </ToastProvider>
              </MixpanelProvider>
            </ErrorBoundary>
          </EnvProvider>
        </StyleProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
