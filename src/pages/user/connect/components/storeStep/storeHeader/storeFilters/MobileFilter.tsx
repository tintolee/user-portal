import { Box, Button, Icon, Text } from '@sendsprint/ui-react';
import { CloseOutline } from '@sendsprint/ui-react/dist/icons';
import { Dialog2 } from '@src/components';
import { ConnectState } from '@src/contexts/connect-context/types';
import { useToggle } from '@src/hooks';
import ClientApi from '@src/types/client';
import React from 'react';
import CategoryDropdown from './CategoryDropdown';

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleSetSelectedCategories: (payload: ClientApi.GiftCategories | undefined) => void;
  state: ConnectState;
}

const MobileFilter = ({ handleSetSelectedCategories, state }: Props) => {
  const { handleFalse, handleTrue, state: isOpen } = useToggle();
  return (
    <>
      <Box className="ss-block md:ss-hidden ss-w-2/4">
        <Button label="Filter" isBlock variant="secondary" onClick={handleTrue} />
      </Box>
      <Dialog2 handleClose={handleFalse} isOpen={isOpen}>
        <Box className="ss-flex ss-justify-between ss-mb-6 ss-items-center">
          <Text className="ss-text-neutral-500" variant="h5">
            Filter
          </Text>
          <Button
            onClick={handleFalse}
            label={<Icon svg={CloseOutline} size={24} />}
            variant="tertiary"
            className="ss-p-0"
          />
        </Box>
        <CategoryDropdown handleSetSelectedCategories={handleSetSelectedCategories} state={state} />
      </Dialog2>
    </>
  );
};

export default MobileFilter;
