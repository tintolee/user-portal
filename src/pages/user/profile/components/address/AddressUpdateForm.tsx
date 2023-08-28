import { Box, Button, Icon, Text } from '@sendsprint/ui-react';
import { CloseOutline } from '@sendsprint/ui-react/dist/icons';
import { Dialog2 } from '@src/components';
import { convertToTime } from '@src/utils';
import React from 'react';
import AddressUpdateFormInner from './AddressUpdateFormInner';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  countDown: number;
  handleStartTimer: () => void;
  isStarted: boolean;
}

const AddressUpdateForm = ({
  handleClose,
  isOpen,
  countDown,
  handleStartTimer,
  isStarted
}: Props) => {
  return (
    <>
      <Dialog2 isOpen={isOpen} handleClose={handleClose}>
        <Box className="ss-flex ss-justify-between ss-mb-6 ss-items-center">
          <Text className="ss-text-neutral-500" variant="h5">
            Address Update
            {isStarted && countDown > 0 && (
              <Text variant="paragraphSmall" className="ss-mt-2">
                Remaining {convertToTime(countDown)}
              </Text>
            )}
          </Text>
          <Button
            onClick={handleClose}
            label={<Icon svg={CloseOutline} size={24} />}
            variant="tertiary"
            className="ss-p-0"
          />
        </Box>
        <AddressUpdateFormInner
          countDown={countDown}
          handleStartTimer={handleStartTimer}
          isStarted={isStarted}
          handleClose={handleClose}
        />
      </Dialog2>
    </>
  );
};

export default AddressUpdateForm;
