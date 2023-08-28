import { Box, Button, Icon, Text } from '@sendsprint/ui-react';
import { CloseOutline } from '@sendsprint/ui-react/dist/icons';
import { Dialog2 } from '@src/components';
import React from 'react';
import FirstTimeUser, { FirstTimeUserFormI } from './FirstTimeUser';
import RegularUser, { RegularUserFormI } from './RegularUser';

type VariantI = 'regular' | 'first-time';
export type Scenario = 'profile' | 'payment';

interface Props {
  handleFalse: () => void;
  state: boolean;
  variant?: VariantI;
  // eslint-disable-next-line no-unused-vars
  handleFirstTimeSubmit?: (values: FirstTimeUserFormI) => void;
  // eslint-disable-next-line no-unused-vars
  handleRegularSubmit?: (values: RegularUserFormI) => void;
  scenario?: Scenario;
  isLoading?: boolean;
}

const AuthenticationCode = ({
  handleFalse,
  state,
  variant,
  handleFirstTimeSubmit,
  handleRegularSubmit,
  scenario = 'payment',
  isLoading
}: Props) => {
  return (
    <Dialog2 isOpen={state} disableOverlayClick handleClose={handleFalse}>
      <Box className="ss-flex ss-justify-between ss-mb-6 ss-items-center">
        <Text className="ss-text-neutral-500" variant="h5">
          Authentication Code
        </Text>
        <Button
          onClick={handleFalse}
          label={<Icon svg={CloseOutline} size={24} />}
          variant="tertiary"
          className="ss-p-0"
        />
      </Box>
      {variant === 'regular' && (
        <RegularUser handleRegularSubmit={handleRegularSubmit} isLoading={isLoading} />
      )}
      {variant === 'first-time' && (
        <FirstTimeUser
          isLoading={isLoading}
          scenario={scenario}
          handleFirstTimeSubmit={handleFirstTimeSubmit}
        />
      )}
    </Dialog2>
  );
};

export default AuthenticationCode;
