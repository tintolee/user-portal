import { Box, Text, Button } from '@sendsprint/ui-react';
import { mixpanelEvents } from '@src/types/mixpanel';
import { useAccount, useMixpanel } from '@src/contexts';
import React, { useEffect, useState } from 'react';
// import { useAccount, useMixpanel } from "@src/context";
import { caution, identification2 } from '../icons';

interface Props {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleVeriff: () => Promise<any>;
  handleRemoveData: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const VeriffFailure: React.FC<Props> = ({ handleVeriff, url, handleRemoveData }) => {
  const [loading, setLoading] = useState(false);

  const { mixpanelInstance } = useMixpanel();
  const { user } = useAccount();

  useEffect(() => {
    mixpanelInstance.track(mixpanelEvents.VeriffFailed, {
      user: user?.email || ''
    });
  }, [mixpanelInstance, user]);

  const handleTryAgain = async () => {
    setLoading(true);

    mixpanelInstance.track(mixpanelEvents.VeriffRetry, {
      user: user?.email || ''
    });
    await handleVeriff();
    setLoading(false);
  };
  return (
    <div className="ss-w-11/12 md:ss-w-100 ss-pt-0 ss-pb-6">
      <div
        className="ss-flex ss-items-center ss-justify-center ss-h-50"
        style={{
          backgroundColor: '#F9F9FA'
        }}>
        <img className="ss-w-34" src={identification2} alt="" />
      </div>
      <div className="ss-bg-white ss-flex ss-flex-col ss-items-center ss-justify-center ss-py-8">
        <Text
          variant="h6"
          className="ss-mb-4 ss-font-semibold ss-text-center ss-w-11/12 md:ss-w-10/12">
          We were unable to verify your identity
        </Text>
        <Text className="ss-mb-8 ss-text-center ss-w-11/12 md:ss-w-10/12">
          We are facing some challenges verifying your identity. Please try again.
        </Text>
        <Box className="ss-flex ss-bg-primary3-500 ss-bg-opacity-10 ss-p-3 ss-rounded ss-mb-8 ss-w-11/12 md:ss-w-10/12">
          <img className="ss-w-6 ss-h-6 ss-mr-4" src={caution} alt="" />
          <Text variant="paragraphSmall">
            This might be because your verification ID is invalid, or your picture is unclear.
          </Text>
        </Box>
        <div className="ss-flex ss-justify-center ss-gap-2 ss-flex-col ss-w-11/12 md:ss-w-10/12">
          <Button
            onClick={handleTryAgain}
            variant="primary"
            isBlock
            label="Try Again"
            showSpinner={loading}
          />
          <Button
            onClick={handleRemoveData}
            variant="tertiary"
            isBlock
            label="I'll do this later"
            showSpinner={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default VeriffFailure;
