import { Box, Button, Dialog, DialogBody, Icon, Text } from '@sendsprint/ui-react';
import { CheckmarkCircle2Outline } from '@sendsprint/ui-react/dist/icons';
import React, { useEffect, useId } from 'react';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  handleSuccessNavigate: () => void;
}

const SuccessModal = ({ handleClose, isOpen, handleSuccessNavigate }: Props) => {
  const titleId = useId();

  useEffect(() => {
    handleSuccessNavigate();
  }, []);
  return (
    <Dialog isOpen={isOpen} aria-labelledby={titleId} onDismiss={handleClose}>
      <DialogBody>
        <Box className="ss-mb-8 ss-flex ss-justify-center">
          <Icon svg={CheckmarkCircle2Outline} size={144} className="ss-text-success-500" />
        </Box>
        <Text variant="h4" className="ss-text-center ss-text-neutral-500 ss-mb-6">
          Your transaction has been submitted
        </Text>
        <Text className="ss-text-neutral-400 ss-text-center ss-mb-5" variant="paragraphLarge">
          Your transaction of USD1,000 to{' '}
          <span className="ss-text-neutral-500 ss-font-bold">Annette Black</span> has been initiated
          and you’ll be notified when approved
        </Text>
        <Box className="ss-space-y-3">
          <Button label="Transaction details" isBlock variant="secondary" />
          <Button label="Okay" variant="tertiary" isBlock />
        </Box>
      </DialogBody>
    </Dialog>
  );
};

export default SuccessModal;
