import { useMixpanel } from '@src/contexts';
import { mixpanelEvents } from '@src/types/mixpanel';
import { useEffect } from 'react';

interface UseMixpanelLoadEventOptions {
  event?: mixpanelEvents;
  pageViewName?: string;
}

const useMixpanelLoadEvent = (options?: UseMixpanelLoadEventOptions) => {
  const { mixpanelInstance, handlePageView } = useMixpanel();

  useEffect(() => {
    if (!options?.event) return;

    mixpanelInstance.track(options?.event);
  }, [mixpanelInstance]);

  useEffect(() => {
    if (!options?.pageViewName) return;

    handlePageView(options?.pageViewName);
  }, [handlePageView, options?.pageViewName]);

  return { mixpanelInstance };
};

export default useMixpanelLoadEvent;
