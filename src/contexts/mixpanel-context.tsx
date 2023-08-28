import React, { createContext, useCallback, useMemo } from 'react';
import mixpanel, { Mixpanel } from 'mixpanel-browser';
import { isUndefined } from '@src/utils/type';
import { useEnv } from './env-context';
import { mixpanelEvents } from '@src/types/mixpanel';

// type MixpanelContext = Mixpanel;

interface MixpanelContext {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  handlePageView: (page: string, options?: any) => void;
  mixpanelInstance: Mixpanel;
}

const Context = createContext<MixpanelContext | undefined>(undefined);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MixpanelProvider = (props: React.PropsWithChildren<any>) => {
  const { IS_DEV, MIXPANEL_PROJECT_TOKEN: token } = useEnv();
  const mixpanelInstance = useMemo<Mixpanel>(
    () => mixpanel.init(token, { debug: IS_DEV }, 'sprint'),
    [token, IS_DEV]
  );

  const handlePageView = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (page: string, options?: any) => {
      mixpanelInstance.track(`${mixpanelEvents.PageView} (${page})`, {
        page,
        ...options
      });
    },
    [mixpanelInstance]
  );

  const value: MixpanelContext = {
    handlePageView,
    mixpanelInstance
  };

  return <Context.Provider value={value} {...props} />;
};

const useMixpanel = () => {
  const context = React.useContext(Context);
  if (isUndefined(context)) {
    throw new Error(`useMixpanel must be used within a MixpanelProvider`);
  }

  return { ...context };
};

export type { MixpanelContext };
export { useMixpanel, MixpanelProvider };
