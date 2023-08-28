import React from 'react';
import { Box, Text } from '@sendsprint/ui-react';
import ChangePasswordForm from './ChangePasswordForm';
import { useToggle } from '@src/hooks';

const UpdatePassword = () => {
  const { handleFalse, handleTrue, state } = useToggle();
  return (
    <Box className="ss-bg-white ss-p-4 ss-space-y-4 ss-rounded-lg">
      <Box className="ss-bg-neutral-100 ss-flex ss-justify-between ss-items-center ss-gap-4 ss-w-full ss-rounded-base ss-px-4 ss-py-3">
        <Box>
          <Text className="ss-text-neutral-400" variant="paragraphSmall">
            Update Password
          </Text>
          <Text className="ss-text-neutral-500" variant="paragraphSmall">
            Change your old password to a new one
          </Text>
        </Box>
        <button
          onClick={handleTrue}
          className="ss-font-bold focus:ss-focus-ring ss-rounded ss-text-primary1-500">
          Change password
        </button>
      </Box>
      <ChangePasswordForm state={state} handleFalse={handleFalse} />
    </Box>
  );
};

export default UpdatePassword;
