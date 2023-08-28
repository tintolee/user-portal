import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import QueryProvider from '@src/providers/query-provider';
import {
  AuthProvider,
  ConnectProvider,
  DashboardProvider,
  EnvProvider,
  MixpanelProvider,
  ToastProvider
} from '@src/contexts';
import { HelmetProvider } from 'react-helmet-async';

// eslint-disable-next-line @typescript-eslint/ban-types
export const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <EnvProvider>
          <MixpanelProvider>
            <ToastProvider autoDismiss={true} placement="bottom-right">
              <QueryProvider>
                <AuthProvider>
                  <ConnectProvider>
                    <DashboardProvider>{children}</DashboardProvider>
                  </ConnectProvider>
                </AuthProvider>
              </QueryProvider>
            </ToastProvider>
          </MixpanelProvider>
        </EnvProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
};

export const renderWrapper = (ui: React.ReactElement, renderOptions?: RenderOptions) => {
  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
