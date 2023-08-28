import { Box, Text } from '@sendsprint/ui-react';
import { VeriffBanner } from '@src/components';
import { DashboardLayout } from '@src/layouts';
import React from 'react';
import { Address, PersonalInfo, Security } from './components';

const Profile = () => {
  return (
    <DashboardLayout pageTitle="Profile">
      <Text variant="h5" className="ss-font-bold ss-mb-8">
        My Details
      </Text>
      <Box className="ss-space-y-6">
        <VeriffBanner />
        <PersonalInfo />
        <Address />
        <Security />
      </Box>
    </DashboardLayout>
  );
};

export default Profile;
