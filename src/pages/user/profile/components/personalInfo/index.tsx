import { Box, Text } from '@sendsprint/ui-react';
import { useAccount } from '@src/contexts';
import React from 'react';
import InfoRow from '../infoRow';

const PersonalInfo = () => {
  const { user } = useAccount();
  return (
    <Box>
      <Text variant="paragraphLarge" className="ss-text-primary1-300 ss-font-bold ss-mb-4">
        Personal Information
      </Text>
      <Box className="ss-bg-white ss-p-4 ss-rounded-lg">
        <Box className="ss-flex ss-flex-col md:ss-flex-row ss-justify-between ss-mb-4 ss-items-center ss-gap-4">
          <InfoRow label="First name" value={user?.firstName || ''} />
          <InfoRow label="Last name" value={user?.lastName || ''} />
        </Box>
        <InfoRow label="Email address" value={user?.email || ''} />
      </Box>
    </Box>
  );
};

export default PersonalInfo;
