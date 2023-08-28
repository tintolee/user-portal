import { mixpanelEvents } from '@src/types/mixpanel';
import { useDashboardContext } from '@src/contexts/dashboard-context';
import { useMixpanel } from '@src/contexts/mixpanel-context';
import React, { lazy, useEffect, useState } from 'react';
import SuspenseWrapper from '@src/components/suspenseWrapper';

const LittleVeriffModalInner = lazy(
  () => import(/*webpackChunkName:'LittleVeriffModalInner'*/ './LittleVeriffModalInner')
);

interface Props {
  isUserVerified: boolean;
}

const CLOSED_VERIFF_STATUS = 'closed-veriff';

const LittleVeriffModal = ({ isUserVerified }: Props) => {
  const [loading, setLoading] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const { handleVeriffOpenTab } = useDashboardContext();
  const { mixpanelInstance } = useMixpanel();

  useEffect(() => {
    const closedVeriffStatus = sessionStorage.getItem(CLOSED_VERIFF_STATUS);
    if (!isUserVerified && !closedVeriffStatus) {
      setIsShown(true);
    } else {
      setIsShown(false);
    }
  }, [isUserVerified]);

  useEffect(() => {
    if (isUserVerified && isShown) {
      setIsShown(false);
      handleClose();
    }
  }, [isUserVerified, isShown]);

  const handleClose = () => {
    sessionStorage.setItem(CLOSED_VERIFF_STATUS, 'true');
    setIsShown(false);
  };

  const handleClickVeriff = async () => {
    setLoading(true);
    mixpanelInstance.track(mixpanelEvents.VeriffStarted, {
      from: 'Veriff modal'
    });

    await handleVeriffOpenTab();

    setLoading(false);
  };

  return (
    <>
      {isShown && (
        <SuspenseWrapper returnNullErrorFallback>
          <LittleVeriffModalInner
            handleClickVeriff={handleClickVeriff}
            handleClose={handleClose}
            isShown={isShown}
            loading={loading}
          />
        </SuspenseWrapper>
      )}
    </>
  );
};

export default LittleVeriffModal;
