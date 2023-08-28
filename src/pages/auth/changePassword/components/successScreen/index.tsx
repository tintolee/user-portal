import Box from '@sendsprint/ui-react/dist/components/Box';
import { ButtonLink } from '@sendsprint/ui-react/dist/components/Button';
import Text from '@sendsprint/ui-react/dist/components/Text';
import { Path } from '@src/navigations/routes';
import React from 'react';

const SuccessScreen = () => {
  return (
    <Box>
      <Text variant="h3" className="ss-mb-6">
        Success
      </Text>
      <Text variant="paragraphLarge" className="ss-text-neutral-400 ss-mb-6">
        Your password has been changed.
      </Text>
      <Box>
        <ButtonLink isBlock label="Back to Login" to={Path.Login} />
      </Box>
    </Box>
  );
};

export default SuccessScreen;
