import React, { useEffect } from 'react';
import { Box, Text } from '@sendsprint/ui-react';
import { useAccount, useMixpanel } from '@src/contexts';
import { mixpanelEvents } from '@src/types/mixpanel';

const VeriffPending = () => {
  const { mixpanelInstance } = useMixpanel();
  const { user } = useAccount();

  useEffect(() => {
    mixpanelInstance.track(mixpanelEvents.VeriffPending, {
      user: user?.email || ''
    });
  }, [mixpanelInstance, user]);
  return (
    <div className="ss-w-10/12 md:ss-w-100 ss-pt-12 ss-pb-6">
      <div className="ss-bg-white ss-flex ss-flex-col ss-items-center ss-justify-center ss-py-8 ss-p-5 ss-rounded ss-shadow">
        <Text variant="h6" className="ss-mb-3 ss-font-semibold">
          Verifying your identity...
        </Text>
        <Box className="ss-my-8">
          <Box className="ss-w-28 ss-h-28 ss-rounded-full ss-bg-primary1-500 ss-animate-pulse" />
        </Box>
        <Text className="ss-mb-8 ss-text-left ss-font-semibold">
          This process typically takes a few minutes. However, it can take a little longer.
          <br />
          <br />
          You can close this page, and we will send you an email once your verification is complete.
          <br />
          <br />
          Please send us an email at{' '}
          <a href="mailto:hello@sendsprint.com" className="ss-text-primary-110">
            hello@sendsprint.com
          </a>{' '}
          or leave us a message on the chatbox, if you&apos;re yet to get an email in 24 hours.
        </Text>
      </div>
    </div>
  );
};

export default VeriffPending;
