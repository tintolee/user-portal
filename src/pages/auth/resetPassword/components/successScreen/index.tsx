import Box from '@sendsprint/ui-react/dist/components/Box';
import { ButtonLink } from '@sendsprint/ui-react/dist/components/Button';
import Text from '@sendsprint/ui-react/dist/components/Text';
import { Path } from '@src/navigations/routes';
import React from 'react';

interface Props {
  email: string;
  handleResend: () => void;
  isLoading: boolean;
}

const SuccessScreen = ({ email, handleResend, isLoading }: Props) => {
  return (
    <Box>
      <Text variant="h3" className="ss-mb-6">
        Reset your password
      </Text>
      <Text variant="paragraphLarge" className="ss-text-neutral-400 ss-mb-6">
        If an account exists for <span className="ss-font-bold">{email}</span>, we’ll send
        instructions for resetting your password. Didn’t get them? Check the email address or ask to
        resend the instructions.
      </Text>
      <Box className="ss-mb-6">
        <ButtonLink isBlock label="Back to Login" to={Path.Login} />
      </Box>
      <Box>
        <button
          className="ss-font-bold ss-text-primary1-500 ss-duration-150 ss-underline hover:ss-text-success-500 focus:ss-focus-ring ss-rounded"
          onClick={handleResend}>
          {isLoading ? (
            'Sending...'
          ) : (
            <Text variant="paragraphRegular" className="">
              Resend the instruction again
            </Text>
          )}
        </button>
      </Box>
    </Box>
  );
};

export default SuccessScreen;
