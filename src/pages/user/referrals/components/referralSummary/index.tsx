import { Box, Text } from '@sendsprint/ui-react';
import { useAccount } from '@src/contexts';
import { useLoadReferralCount } from '@src/hooks';
import React from 'react';

const ReferralSummary = () => {
  const { user } = useAccount();

  const { data } = useLoadReferralCount({
    email: user?.email || ''
  });

  return (
    <Box className="ss-bg-white ss-py-5 ss-px-5 ss-rounded-lg">
      <Text className="ss-font-semibold ss-text-neutral-400 ss-mb-3">Referral summary</Text>
      <Box className="ss-bg-neutral-100 ss-px-5 ss-py-1 ss-rounded-lg">
        <Text variant="paragraphVerySmall" className="ss-text-neutral-400 ss-mb-1">
          Total signups
        </Text>
        <Text className="ss-text-neutral-500">{data ? data[0].ReferralCount : 0}</Text>
      </Box>
    </Box>
  );
};

export default ReferralSummary;
