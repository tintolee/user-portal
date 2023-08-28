import React, { useEffect } from 'react';
import RouterConfig from '@src/navigations/RouterConfig';
import { useAccount, useEnv, useToasts } from '@src/contexts';
import { Helmet } from 'react-helmet-async';
import { AutoLogout } from '@src/components/autoLogout';
import { BrowserSupportNotice } from '@src/components/browserSupportNotice';
import { configureInterceptors } from '@src/services/api-service';

const App = () => {
  const { USER_AUTO_LOGOUT_DURATION_MS } = useEnv();
  const { logout } = useAccount();
  const { addToast } = useToasts();

  useEffect(() => {
    return configureInterceptors({ addToast, logout });
  }, [addToast, logout]);

  return (
    <>
      <Helmet>
        <html className="ss-bg-page-background" />
        <title>Sprint</title>
        <body className="ss-antialiased" />
      </Helmet>
      <BrowserSupportNotice />
      <RouterConfig />
      <AutoLogout inactivityDuration={USER_AUTO_LOGOUT_DURATION_MS} />
    </>
  );
};

export default App;
