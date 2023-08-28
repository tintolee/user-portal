import Box from '@sendsprint/ui-react/dist/components/Box';
import Text from '@sendsprint/ui-react/dist/components/Text';
import { ButtonLink } from '@sendsprint/ui-react/dist/components/Button';
import Gift from '@sendsprint/ui-react/dist/icons/Gift';
import Money from '@sendsprint/ui-react/dist/icons/Money';
import { useAccount } from '@src/contexts/auth-context';
import { Path } from '@src/navigations/routes';
import React from 'react';

const WelcomeSection = () => {
  const { user } = useAccount();

  return (
    <Box className="ss-flex ss-flex-col lg:ss-flex-row lg:ss-justify-between lg:ss-items-center ss-gap-5">
      <Box className="ss-flex-1">
        <Text variant="paragraphLarge" className="ss-font-semibold ss-mb-2">
          Hey {user?.firstName},
        </Text>
        <Text variant="paragraphSmall">
          Welcome to your dashboard. What would you like to do today?
        </Text>
      </Box>
      <Box className="ss-gap-4 ss-flex ss-flex-wrap md:ss-flex-nowrap ss-w-max">
        <ButtonLink label="Send money" to={Path.SendMoney} iconRight={Money} />
        <ButtonLink label="Send a gift" variant="secondary" to={Path.Connect} iconRight={Gift} />
      </Box>
    </Box>
  );
};

export default WelcomeSection;
