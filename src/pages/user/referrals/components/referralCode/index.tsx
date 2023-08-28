import { Box, Icon, Text } from '@sendsprint/ui-react';
import { CopyOutline } from '@sendsprint/ui-react/dist/icons';
import { useAccount } from '@src/contexts';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import SocialShare from './SocialShare';

const ReferralCode = () => {
  const { user } = useAccount();
  return (
    <Box className="ss-bg-white ss-py-5 ss-flex ss-flex-col ss-px-5 ss-rounded-lg">
      <Text className="ss-font-semibold ss-text-neutral-400 ss-mb-3">Your referral code</Text>
      <Box className="ss-bg-neutral-100 ss-min-h-200 ss-flex-1 ss-gap-2 ss-flex ss-justify-center ss-items-center ss-rounded-lg">
        <Text variant="h5">{user?.referralCode}</Text>
        <CopyToClipboard text={user?.referralCode || ''}>
          <button className="focus:ss-focus-ring ss-rounded">
            <Icon svg={CopyOutline} size={24} />
          </button>
        </CopyToClipboard>
      </Box>
      <SocialShare />
    </Box>
  );
};

export default ReferralCode;
