import { useMixpanel } from '@src/contexts';
import { lazy, useEffect } from 'react';
import { mixpanelEvents } from '@src/types/mixpanel';
import { GeneralLayout } from '@src/layouts';
import Loader from '@src/components/loader';
import SuspenseWrapper from '@src/components/suspenseWrapper';

const VerifyEmailInner = lazy(
  () => import(/*webpackChunkName:'VerifyEmailInner'*/ './VerifyEmailInner')
);

const VerifyEmail = () => {
  const { mixpanelInstance } = useMixpanel();

  useEffect(() => {
    mixpanelInstance.track(mixpanelEvents.EmailVerified);
  }, [mixpanelInstance]);

  return (
    <GeneralLayout pageTitle="Verify Email Success">
      <SuspenseWrapper
        suspenseFallback={
          <Loader
            ballSize="small"
            height="content"
            className="ss-bg-white ss-min-h-250 md:ss-min-h-300 ss-rounded-lg"
          />
        }>
        <VerifyEmailInner />
      </SuspenseWrapper>
    </GeneralLayout>
  );
};

export default VerifyEmail;
