import { Box, Text } from '@sendsprint/ui-react';
import { DashboardLayout } from '@src/layouts';
import React from 'react';
import { HowItWorks, InviteBanner, ReferralCode, ReferralSummary } from './components';

const Referrals = () => {
  return (
    <DashboardLayout pageTitle="Referrals">
      <Box className="ss-mb-6 md:ss-mb-14">
        <Text variant="h5" className="ss-font-bold">
          Referrals
        </Text>
      </Box>
      <Box>
        <InviteBanner />
        <Box className="ss-grid xl:ss-grid-cols-2 ss-gap-8 ss-mt-8">
          <ReferralCode />
          <Box className="ss-space-y-8">
            <HowItWorks />
            <ReferralSummary />
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default Referrals;
