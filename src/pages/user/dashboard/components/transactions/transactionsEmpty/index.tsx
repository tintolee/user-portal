import Box from '@sendsprint/ui-react/dist/components/Box';
import { ButtonLink } from '@sendsprint/ui-react/dist/components/Button';
import Text from '@sendsprint/ui-react/dist/components/Text';
import { useAccount } from '@src/contexts/auth-context';
import { Path } from '@src/navigations/routes';
import React from 'react';

const TransactionsEmpty = () => {
  const { user } = useAccount();
  return (
    <Box className="ss-py-10">
      <Text className="ss-font-semibold ss-mb-3" variant="paragraphLarge">
        Hi {user?.firstName} 👋🏾,
      </Text>
      <Text className="ss-mb-7">
        You have no transaction yet. you can send money or gifts to friends and family by clicking
        on either <strong>“Send money”</strong> or <strong>“Send a gift”</strong> below.
      </Text>
      <Box className="ss-flex ss-items-center ss-gap-3">
        <ButtonLink variant="secondary" label="Send money" to={Path.SendMoney} />
        <ButtonLink variant="secondary" label="Send a gift" to={Path.Connect} />
      </Box>
    </Box>
  );
};

export default TransactionsEmpty;
