import Box from '@sendsprint/ui-react/dist/components/Box';
import Button from '@sendsprint/ui-react/dist/components/Button';
import Text from '@sendsprint/ui-react/dist/components/Text';
import { mixpanelEvents } from '@src/types/mixpanel';
import { useDashboardContext } from '@src/contexts/dashboard-context';
import { useMixpanel } from '@src/contexts/mixpanel-context';
import React, { useState } from 'react';
import verify from './assets/verify.png';
import { useMedia } from '@src/hooks/utils/useMedia';

const VeriffBannerInner = () => {
  const { handleVeriffOpenTab } = useDashboardContext();
  const [loading, setLoading] = useState(false);
  const { mixpanelInstance } = useMixpanel();

  const { isMobile } = useMedia();

  const handleClick = async () => {
    setLoading(true);
    mixpanelInstance.track(mixpanelEvents.VeriffStarted, {
      from: 'Veriff banner'
    });

    await handleVeriffOpenTab();
    setLoading(false);
  };

  return (
    <Box className="ss-py-4 ss-px-4 ss-flex ss-gap-3 ss-flex-col md:ss-flex-row ss-justify-between ss-items-center ss-bg-primary3-500 ss-rounded-base">
      <Box className="ss-flex ss-w-full md:ss-w-auto ss-gap-4 ss-items-center ss-flex-row">
        <Box className="ss-w-16 ss-h-16 md:ss-w-12 md:ss-h-12 ss-bg-primary-70 ss-rounded-full">
          <img src={verify} alt="" />
        </Box>
        <Box className="">
          <Text variant="paragraphLarge" className="ss-font-bold ss--mb-2">
            Identity Verification
          </Text>
          <Text variant="paragraphSmall" className="ss-font-light ss-text-left">
            Verify your identity to continue using Sendsprint.
          </Text>
        </Box>
      </Box>
      <Button
        onClick={handleClick}
        showSpinner={loading}
        label="Verify"
        isBlock={isMobile}
        variant="primary"
        className="ss-px-20"
      />
    </Box>
  );
};

export default VeriffBannerInner;
