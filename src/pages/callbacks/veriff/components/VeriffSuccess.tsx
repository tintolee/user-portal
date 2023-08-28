import { Button, Text } from '@sendsprint/ui-react';
import { mixpanelEvents } from '@src/types/mixpanel';
import { useAccount, useMixpanel } from '@src/contexts';
import React, { useEffect } from 'react';
import { identification3 } from '../icons';

interface Props {
  handleRemoveData: () => void;
}

const VeriffSuccess: React.FC<Props> = ({ handleRemoveData }) => {
  const { mixpanelInstance } = useMixpanel();
  const { user } = useAccount();

  useEffect(() => {
    mixpanelInstance.track(mixpanelEvents.VeriffSuccess, {
      user: user?.email || ''
    });
  }, [mixpanelInstance, user]);
  return (
    <div className="ss-w-10/12 md:ss-w-100 ss-pt-12 ss-pb-6">
      <div
        className="ss-flex ss-items-center ss-justify-center ss-h-60"
        style={{
          backgroundColor: '#F9F9FA'
        }}>
        <img src={identification3} alt="" />
        {/* <MailVerified className="ss-w-6/12" /> */}
      </div>
      <div className="ss-bg-white ss-flex ss-flex-col ss-items-center ss-justify-center ss-py-8">
        <Text variant="h6" className="ss-mb-6 ss-font-semibold">
          You are all set!
        </Text>
        <Text className="ss-mb-8">Your identity was verified successfully.</Text>
        <div className="ss-flex ss-justify-center ss-w-10/12 md:ss-w-8/12">
          <Button isBlock onClick={handleRemoveData} label="Got it" />
        </div>
      </div>
    </div>
  );
};

export default VeriffSuccess;
